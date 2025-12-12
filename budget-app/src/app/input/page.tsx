'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateSalesBudget, validateSalesBudgetInputs, formatSalesBudgetForDisplay } from '@/lib/calculations/01-salesBudget';
import { calculateProductionBudget, validateProductionBudgetInputs, formatProductionBudgetForDisplay } from '@/lib/calculations/02-productionBudget';
import type { SalesBudgetInputs, ProductionBudgetInputs } from '@/lib/types/budgets';

export default function InputPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    setDarkMode(savedDarkMode);
    setHighContrast(savedHighContrast);
  }, []);

  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [currency, setCurrency] = useState('');
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString());
  const [assumptions, setAssumptions] = useState('');

  // Prior year sales (optional)
  const [priorQ1Sales, setPriorQ1Sales] = useState('');
  const [priorQ2Sales, setPriorQ2Sales] = useState('');
  const [priorQ3Sales, setPriorQ3Sales] = useState('');
  const [priorQ4Sales, setPriorQ4Sales] = useState('');

  // Current year forecast
  const [q1Sales, setQ1Sales] = useState('');
  const [q2Sales, setQ2Sales] = useState('');
  const [q3Sales, setQ3Sales] = useState('');
  const [q4Sales, setQ4Sales] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [inflationRate, setInflationRate] = useState('0');
  const [priceAdjustment, setPriceAdjustment] = useState<'constant' | 'inflation'>('inflation');

  // Cash vs Credit Sales
  const [cashSalesPercentage, setCashSalesPercentage] = useState('');
  const [creditSalesPercentage, setCreditSalesPercentage] = useState('');

  // Growth rate calculator
  const [growthRate, setGrowthRate] = useState('');

  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Schedule 2: Production Budget state
  const [beginningInventory, setBeginningInventory] = useState('');
  const [endingInventoryRatio, setEndingInventoryRatio] = useState('');
  const [nextYearQ1Sales, setNextYearQ1Sales] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [minBatchSize, setMinBatchSize] = useState('');
  const [optimalBatchSize, setOptimalBatchSize] = useState('');
  const [carryingCost, setCarryingCost] = useState('');
  const [useJIT, setUseJIT] = useState(false);
  const [obsolescenceRisk, setObsolescenceRisk] = useState('');

  const [productionResult, setProductionResult] = useState<any>(null);
  const [productionErrors, setProductionErrors] = useState<string[]>([]);

  // Save preferences to localStorage when they change
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', String(newValue));
  };

  const applyGrowthRate = () => {
    const growth = parseFloat(growthRate) / 100 || 0;
    const priorQ1 = parseFloat(priorQ1Sales) || 0;
    const priorQ2 = parseFloat(priorQ2Sales) || 0;
    const priorQ3 = parseFloat(priorQ3Sales) || 0;
    const priorQ4 = parseFloat(priorQ4Sales) || 0;

    if (priorQ1 === 0 && priorQ2 === 0 && priorQ3 === 0 && priorQ4 === 0) {
      alert('Please enter prior year sales data first');
      return;
    }

    setQ1Sales(String(Math.round(priorQ1 * (1 + growth))));
    setQ2Sales(String(Math.round(priorQ2 * (1 + growth))));
    setQ3Sales(String(Math.round(priorQ3 * (1 + growth))));
    setQ4Sales(String(Math.round(priorQ4 * (1 + growth))));
  };

  const handleCalculate = () => {
    const priorYearTotal = (parseFloat(priorQ1Sales) || 0) + (parseFloat(priorQ2Sales) || 0) + (parseFloat(priorQ3Sales) || 0) + (parseFloat(priorQ4Sales) || 0);
    const hasPriorYearData = priorYearTotal > 0;

    const hasCashCreditData = cashSalesPercentage !== '' || creditSalesPercentage !== '';

    const inputs: SalesBudgetInputs = {
      historicalSalesUnits: hasPriorYearData ? {
        q1: parseFloat(priorQ1Sales) || 0,
        q2: parseFloat(priorQ2Sales) || 0,
        q3: parseFloat(priorQ3Sales) || 0,
        q4: parseFloat(priorQ4Sales) || 0,
        yearly: priorYearTotal,
      } : undefined,
      forecastedSalesUnits: {
        q1: parseFloat(q1Sales) || 0,
        q2: parseFloat(q2Sales) || 0,
        q3: parseFloat(q3Sales) || 0,
        q4: parseFloat(q4Sales) || 0,
        yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
      },
      sellingPricePerUnit: parseFloat(sellingPrice) || 0,
      priceInflationRate: priceAdjustment === 'inflation' ? (parseFloat(inflationRate) || 0) : 0,
      cashSalesPercentage: hasCashCreditData ? (parseFloat(cashSalesPercentage) || 0) : undefined,
      creditSalesPercentage: hasCashCreditData ? (parseFloat(creditSalesPercentage) || 0) : undefined,
    };

    const validationErrors = validateSalesBudgetInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    const output = calculateSalesBudget(inputs);
    const formatted = formatSalesBudgetForDisplay(output, inputs);
    setResult(formatted);
    setErrors(validationErrors); // Keep warnings visible even after successful calculation
  };

  const handleCalculateProduction = () => {
    if (!result) {
      alert('Please calculate Sales Budget first (Schedule 1)');
      return;
    }

    const inputs: ProductionBudgetInputs = {
      forecastedSalesUnits: {
        q1: parseFloat(q1Sales) || 0,
        q2: parseFloat(q2Sales) || 0,
        q3: parseFloat(q3Sales) || 0,
        q4: parseFloat(q4Sales) || 0,
        yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
      },
      beginningInventory: parseFloat(beginningInventory) || 0,
      desiredEndingInventoryRatio: parseFloat(endingInventoryRatio) || 0,
      nextYearQ1ForecastedSales: nextYearQ1Sales ? parseFloat(nextYearQ1Sales) : undefined,
      maxProductionCapacityPerQuarter: maxCapacity ? parseFloat(maxCapacity) : undefined,
      minimumBatchSize: minBatchSize ? parseFloat(minBatchSize) : undefined,
      optimalBatchSize: optimalBatchSize ? parseFloat(optimalBatchSize) : undefined,
      inventoryCarryingCostPerUnit: carryingCost ? parseFloat(carryingCost) : undefined,
      useJIT,
      obsolescenceRiskPercentage: obsolescenceRisk ? parseFloat(obsolescenceRisk) : undefined,
    };

    const validationErrors = validateProductionBudgetInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setProductionErrors(validationErrors);
      setProductionResult(null);
      return;
    }

    const output = calculateProductionBudget(inputs);
    const formatted = formatProductionBudgetForDisplay(output, inputs);
    setProductionResult(formatted);
    setProductionErrors(validationErrors);
  };

  const downloadCSV = () => {
    if (!result) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 1: Sales Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n`;
    csvContent += `Currency: ${currency}\n`;
    if (assumptions) {
      csvContent += `Assumptions: ${assumptions}\n`;
    }
    csvContent += `\n`;

    // Headers
    csvContent += result.headers.join(',') + '\n';

    // Rows - remove commas from numbers to prevent CSV corruption
    result.rows.forEach((row: any) => {
      const cleanQ1 = String(row.q1).replace(/,/g, '');
      const cleanQ2 = String(row.q2).replace(/,/g, '');
      const cleanQ3 = String(row.q3).replace(/,/g, '');
      const cleanQ4 = String(row.q4).replace(/,/g, '');
      const cleanYearly = String(row.yearly).replace(/,/g, '');
      csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadProductionCSV = () => {
    if (!productionResult) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 2: Production Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n`;
    csvContent += `\n`;

    // Headers
    csvContent += productionResult.headers.join(',') + '\n';

    // Rows
    productionResult.rows.forEach((row: any) => {
      const cleanQ1 = String(row.q1).replace(/,/g, '');
      const cleanQ2 = String(row.q2).replace(/,/g, '');
      const cleanQ3 = String(row.q3).replace(/,/g, '');
      const cleanQ4 = String(row.q4).replace(/,/g, '');
      const cleanYearly = String(row.yearly).replace(/,/g, '');
      csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `production-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bgColor = darkMode ? 'bg-[#111]' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-[#454545]';
  const headingColor = darkMode ? 'text-white' : 'text-black';
  const inputBg = darkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-white border-gray-300 text-black';
  const buttonBg = darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800';
  const hrColor = darkMode ? 'border-gray-800' : 'border-gray-200';
  const contrastText = highContrast ? (darkMode ? 'text-white' : 'text-black') : textColor;

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className={`text-sm hover:underline ${textColor}`}>
          ← Back
        </Link>
        <h1 className={`text-xl font-semibold ${headingColor}`}>
          Budget Input
        </h1>
        <div className="flex gap-4 text-sm">
          <button
            onClick={toggleHighContrast}
            className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
          >
            {highContrast ? 'Less contrast' : 'More contrast'}
          </button>
          <button
            onClick={toggleDarkMode}
            className={`hover:underline ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <main className={`max-w-5xl mx-auto px-6 py-12 ${contrastText}`}>
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 1: Sales Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Enter your forecasted sales data
        </p>

        {/* Form */}
        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Company Information</h3>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Type company name"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Type product name"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="Type currency"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Fiscal Year
              </label>
              <input
                type="text"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                placeholder="Type fiscal year"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Prior Year Sales (Optional)</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Enter last year's sales to see growth comparison. Leave blank if not applicable.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q1 (Oct-Dec)
              </label>
              <input
                type="number"
                value={priorQ1Sales}
                onChange={(e) => setPriorQ1Sales(e.target.value)}
                placeholder="800"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q2 (Jan-Mar)
              </label>
              <input
                type="number"
                value={priorQ2Sales}
                onChange={(e) => setPriorQ2Sales(e.target.value)}
                placeholder="1200"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q3 (Apr-Jun)
              </label>
              <input
                type="number"
                value={priorQ3Sales}
                onChange={(e) => setPriorQ3Sales(e.target.value)}
                placeholder="1000"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q4 (Jul-Sep)
              </label>
              <input
                type="number"
                value={priorQ4Sales}
                onChange={(e) => setPriorQ4Sales(e.target.value)}
                placeholder="1100"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} mb-8`}>
            <h4 className={`text-sm font-semibold mb-3 ${headingColor}`}>
              Quick Forecast Calculator
            </h4>
            <p className={`text-xs mb-3 ${textColor}`}>
              Apply a growth rate to prior year sales to auto-calculate current year forecast
            </p>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className={`block text-xs font-medium mb-2 ${headingColor}`}>
                  Growth Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  placeholder="e.g., 15 for 15% growth"
                  className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                />
              </div>
              <button
                onClick={applyGrowthRate}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Apply to Forecast
              </button>
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Forecasted Sales (Current Year)</h3>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q1 (Oct-Dec)
              </label>
              <input
                type="number"
                value={q1Sales}
                onChange={(e) => setQ1Sales(e.target.value)}
                placeholder="1000"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q2 (Jan-Mar)
              </label>
              <input
                type="number"
                value={q2Sales}
                onChange={(e) => setQ2Sales(e.target.value)}
                placeholder="1500"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q3 (Apr-Jun)
              </label>
              <input
                type="number"
                value={q3Sales}
                onChange={(e) => setQ3Sales(e.target.value)}
                placeholder="1200"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q4 (Jul-Sep)
              </label>
              <input
                type="number"
                value={q4Sales}
                onChange={(e) => setQ4Sales(e.target.value)}
                placeholder="1300"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${headingColor}`}>
              Price Adjustment Method
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceAdjustment"
                  value="constant"
                  checked={priceAdjustment === 'constant'}
                  onChange={(e) => setPriceAdjustment(e.target.value as 'constant' | 'inflation')}
                  className="mr-2"
                />
                <span className={`text-sm ${textColor}`}>Constant Price (same across all quarters)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceAdjustment"
                  value="inflation"
                  checked={priceAdjustment === 'inflation'}
                  onChange={(e) => setPriceAdjustment(e.target.value as 'constant' | 'inflation')}
                  className="mr-2"
                />
                <span className={`text-sm ${textColor}`}>Inflation-Adjusted Price</span>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Selling Price per Unit ({currency})
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="85000"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Inflation Rate (Annual %)
              </label>
              <input
                type="number"
                step="0.01"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                placeholder="0.15"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
                disabled={priceAdjustment === 'constant'}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                {priceAdjustment === 'constant'
                  ? 'Disabled when using constant price'
                  : 'Enter as decimal (e.g., 0.15 for 15%)'}
              </p>
            </div>
          </div>

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Cash vs Credit Sales (Optional)</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Split sales revenue into cash (collected immediately) and credit (collected later). Required for Schedule 8 (Cash Receipts Budget).
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Cash Sales Percentage
              </label>
              <input
                type="number"
                step="0.01"
                value={cashSalesPercentage}
                onChange={(e) => setCashSalesPercentage(e.target.value)}
                placeholder="0.40"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.40 for 40% cash sales)
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Credit Sales Percentage
              </label>
              <input
                type="number"
                step="0.01"
                value={creditSalesPercentage}
                onChange={(e) => setCreditSalesPercentage(e.target.value)}
                placeholder="0.60"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.60 for 60% credit sales)
              </p>
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <div className="mb-8">
            <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
              Budget Assumptions & Notes (Optional)
            </label>
            <textarea
              value={assumptions}
              onChange={(e) => setAssumptions(e.target.value)}
              placeholder="e.g., Conservative forecast due to market uncertainty; New market entry in Q3; Based on historical growth trends..."
              rows={3}
              className={`w-full px-4 py-3 border ${inputBg} text-base`}
            />
            <p className={`text-xs mt-2 ${textColor}`}>
              Document key assumptions for reference
            </p>
          </div>

          <button
            onClick={handleCalculate}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate
          </button>

          {errors.length > 0 && (
            <div className="mt-6 space-y-3">
              {errors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {errors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {errors.filter(e => e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Warnings:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {errors.filter(e => e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error.replace('WARNING: ', '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Results</h3>
            {result && (
              <button
                onClick={downloadCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!result && (
            <p className="text-lg leading-relaxed">
              Enter data and click Calculate to see your sales budget
            </p>
          )}

          {result && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-2 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear} | Currency: {currency}
              </p>
              {assumptions && (
                <div className={`mb-6 p-3 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <p className={`text-xs font-semibold mb-1 ${headingColor}`}>Assumptions & Notes:</p>
                  <p className={`text-sm ${textColor}`}>{assumptions}</p>
                </div>
              )}

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      {result.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} ${
                          idx === result.rows.length - 1 ? 'font-semibold' : ''
                        }`}
                      >
                        <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                        <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`text-xs mb-8 ${textColor}`}>
                Note: The "Yearly Total" price is the weighted average selling price across all quarters.
              </p>

              <div className="mb-8">
                <h4 className={`text-lg font-semibold mb-3 ${headingColor}`}>
                  Seasonal Distribution
                </h4>
                <p className={`text-sm mb-4 ${textColor}`}>
                  Percentage of annual sales expected in each quarter:
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {result.seasonalDistribution && (
                    <>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q1 (Oct-Dec)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q1.toFixed(1)}%
                        </div>
                      </div>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q2 (Jan-Mar)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q2.toFixed(1)}%
                        </div>
                      </div>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q3 (Apr-Jun)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q3.toFixed(1)}%
                        </div>
                      </div>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q4 (Jul-Sep)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q4.toFixed(1)}%
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-lg leading-relaxed">
                ✓ Sales Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Sales Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Sales Budget is the starting point for the master budget. It shows expected sales
          in both units and revenue for each quarter and the entire year.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Sales Revenue = Expected Sales Units × Selling Price per Unit
        </p>

        <hr className={`my-16 ${hrColor}`} />

        {/* SCHEDULE 2: PRODUCTION BUDGET */}
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 2: Production Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Determine production volume needed to meet sales demand and maintain inventory levels
        </p>

        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Inventory Policy</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Beginning Inventory (Units)
              </label>
              <input
                type="number"
                value={beginningInventory}
                onChange={(e) => setBeginningInventory(e.target.value)}
                placeholder="100"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Opening inventory at start of year
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Desired Ending Inventory Ratio
              </label>
              <input
                type="number"
                step="0.01"
                value={endingInventoryRatio}
                onChange={(e) => setEndingInventoryRatio(e.target.value)}
                placeholder="0.10"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.10 for 10% of next quarter's sales)
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="useJIT"
                checked={useJIT}
                onChange={(e) => setUseJIT(e.target.checked)}
                className="mr-3 w-4 h-4"
              />
              <label htmlFor="useJIT" className={`text-sm font-medium ${headingColor}`}>
                Use Just-in-Time (JIT) Manufacturing
              </label>
            </div>
            <p className={`text-xs ${textColor} ml-7`}>
              Enable JIT to set ending inventory to zero (production = sales)
            </p>
          </div>

          <hr className={`my-8 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Optional Enhancements</h3>
          <p className={`text-sm mb-6 ${textColor}`}>
            Add production constraints and cost analysis (all optional)
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Next Year Q1 Sales Forecast
              </label>
              <input
                type="number"
                value={nextYearQ1Sales}
                onChange={(e) => setNextYearQ1Sales(e.target.value)}
                placeholder="Leave blank to use current Q1"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Max Production Capacity/Quarter
              </label>
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Inventory Carrying Cost/Unit
              </label>
              <input
                type="number"
                step="0.01"
                value={carryingCost}
                onChange={(e) => setCarryingCost(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Minimum Batch Size
              </label>
              <input
                type="number"
                value={minBatchSize}
                onChange={(e) => setMinBatchSize(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Optimal Batch Size
              </label>
              <input
                type="number"
                value={optimalBatchSize}
                onChange={(e) => setOptimalBatchSize(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Obsolescence Risk (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={obsolescenceRisk}
                onChange={(e) => setObsolescenceRisk(e.target.value)}
                placeholder="0.05"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.05 for 5% risk)
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculateProduction}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate Production Budget
          </button>

          {productionErrors.length > 0 && (
            <div className="mt-6 space-y-3">
              {productionErrors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {productionErrors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {productionErrors.filter(e => e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Warnings:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {productionErrors.filter(e => e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error.replace('WARNING: ', '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Production Budget Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Production Budget Results</h3>
            {productionResult && (
              <button
                onClick={downloadProductionCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!productionResult && (
            <p className="text-lg leading-relaxed">
              Calculate Sales Budget first, then enter production data and click Calculate Production Budget
            </p>
          )}

          {productionResult && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-6 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear}
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      {productionResult.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {productionResult.rows.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} ${
                          idx === productionResult.rows.length - 1 ? 'font-semibold' : ''
                        }`}
                      >
                        <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                        <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {productionResult.notes && (
                <p className={`text-xs mb-6 ${textColor} italic`}>
                  * {productionResult.notes}
                </p>
              )}

              {productionResult.inventoryCarryingCost && (
                <div className={`mb-6 p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${headingColor}`}>Inventory Carrying Cost</h4>
                  <p className={`text-xs ${textColor}`}>
                    Q1: {productionResult.inventoryCarryingCost.q1.toFixed(2)} |
                    Q2: {productionResult.inventoryCarryingCost.q2.toFixed(2)} |
                    Q3: {productionResult.inventoryCarryingCost.q3.toFixed(2)} |
                    Q4: {productionResult.inventoryCarryingCost.q4.toFixed(2)} |
                    Yearly: {productionResult.inventoryCarryingCost.yearly.toFixed(2)}
                  </p>
                </div>
              )}

              {productionResult.obsolescenceCost && (
                <div className={`mb-6 p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${headingColor}`}>Obsolescence Cost</h4>
                  <p className={`text-xs ${textColor}`}>
                    Q1: {productionResult.obsolescenceCost.q1.toFixed(2)} |
                    Q2: {productionResult.obsolescenceCost.q2.toFixed(2)} |
                    Q3: {productionResult.obsolescenceCost.q3.toFixed(2)} |
                    Q4: {productionResult.obsolescenceCost.q4.toFixed(2)} |
                    Yearly: {productionResult.obsolescenceCost.yearly.toFixed(2)}
                  </p>
                </div>
              )}

              <p className="text-lg leading-relaxed">
                ✓ Production Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Production Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Production Budget determines how many units must be produced to meet sales demand
          while maintaining desired inventory levels.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Units to Produce = Sales + Desired Ending Inventory - Beginning Inventory
        </p>
      </main>

      <footer className={`max-w-5xl mx-auto px-6 py-12 border-t ${hrColor} text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© 2025 Budget Automation System</p>
      </footer>
    </div>
  );
}
