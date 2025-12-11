'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateSalesBudget, validateSalesBudgetInputs, formatSalesBudgetForDisplay } from '@/lib/calculations/01-salesBudget';
import type { SalesBudgetInputs } from '@/lib/types/budgets';

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
  const [currency, setCurrency] = useState('PKR');
  const [q1Sales, setQ1Sales] = useState('');
  const [q2Sales, setQ2Sales] = useState('');
  const [q3Sales, setQ3Sales] = useState('');
  const [q4Sales, setQ4Sales] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [inflationRate, setInflationRate] = useState('0');

  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

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

  const handleCalculate = () => {
    const inputs: SalesBudgetInputs = {
      forecastedSalesUnits: {
        q1: parseFloat(q1Sales) || 0,
        q2: parseFloat(q2Sales) || 0,
        q3: parseFloat(q3Sales) || 0,
        q4: parseFloat(q4Sales) || 0,
        yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
      },
      sellingPricePerUnit: parseFloat(sellingPrice) || 0,
      priceInflationRate: parseFloat(inflationRate) || 0,
    };

    const validationErrors = validateSalesBudgetInputs(inputs);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    const output = calculateSalesBudget(inputs);
    const formatted = formatSalesBudgetForDisplay(output);
    setResult(formatted);
    setErrors([]);
  };

  const downloadCSV = () => {
    if (!result) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 1: Sales Budget\n`;
    csvContent += `Currency: ${currency}\n\n`;

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

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Shahtaj Sugar Mills"
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
                placeholder="Sugar"
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
                placeholder="PKR"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Quarterly Sales Data</h3>

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
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.15 for 15%)
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate
          </button>

          {errors.length > 0 && (
            <div className={`mt-6 p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
              <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                Errors:
              </p>
              <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
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
              <p className={`text-lg mb-6 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'} ({currency})
              </p>

              <div className="overflow-x-auto mb-8">
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
      </main>

      <footer className={`max-w-5xl mx-auto px-6 py-12 border-t ${hrColor} text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© 2025 Budget Automation System</p>
      </footer>
    </div>
  );
}
