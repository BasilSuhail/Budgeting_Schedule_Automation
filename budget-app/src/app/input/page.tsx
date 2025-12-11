'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateSalesBudget, validateSalesBudgetInputs, formatSalesBudgetForDisplay } from '@/lib/calculations/01-salesBudget';
import type { SalesBudgetInputs } from '@/lib/types/budgets';

export default function InputPage() {
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');

  // Sales Budget Inputs
  const [q1Sales, setQ1Sales] = useState('');
  const [q2Sales, setQ2Sales] = useState('');
  const [q3Sales, setQ3Sales] = useState('');
  const [q4Sales, setQ4Sales] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [inflationRate, setInflationRate] = useState('0');

  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleCalculate = () => {
    // Parse inputs
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

    // Validate
    const validationErrors = validateSalesBudgetInputs(inputs);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    // Calculate
    const output = calculateSalesBudget(inputs);
    const formatted = formatSalesBudgetForDisplay(output);

    setResult(formatted);
    setErrors([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Budget Input Form
          </h1>
          <p className="text-gray-600">
            Step 1: Sales Budget - Enter your forecasted sales data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Information</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Shahtaj Sugar Mills Limited"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Sugar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 pt-6 border-t">
              Schedule 1: Sales Budget
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q1 Sales (Units/M.Tons)
                  </label>
                  <input
                    type="number"
                    value={q1Sales}
                    onChange={(e) => setQ1Sales(e.target.value)}
                    placeholder="e.g., 1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q2 Sales (Units/M.Tons)
                  </label>
                  <input
                    type="number"
                    value={q2Sales}
                    onChange={(e) => setQ2Sales(e.target.value)}
                    placeholder="e.g., 1500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q3 Sales (Units/M.Tons)
                  </label>
                  <input
                    type="number"
                    value={q3Sales}
                    onChange={(e) => setQ3Sales(e.target.value)}
                    placeholder="e.g., 1200"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q4 Sales (Units/M.Tons)
                  </label>
                  <input
                    type="number"
                    value={q4Sales}
                    onChange={(e) => setQ4Sales(e.target.value)}
                    placeholder="e.g., 1300"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price per Unit (PKR)
                </label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="e.g., 85000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Inflation Rate (Annual %) - Optional
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  placeholder="e.g., 0.15 for 15%"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter as decimal (e.g., 0.15 for 15% inflation)
                </p>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Calculate Sales Budget
            </button>

            {errors.length > 0 && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">Validation Errors:</h3>
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Results: Sales Budget</h2>

            {!result && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg mb-2">No results yet</p>
                <p className="text-sm">Enter data and click "Calculate" to see your sales budget</p>
              </div>
            )}

            {result && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-1">
                    {companyName || 'Your Company'}
                  </h3>
                  <p className="text-sm text-blue-700">
                    Product: {productName || 'Product'} | Schedule 1: Sales Budget
                  </p>
                </div>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      {result.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-2 text-left font-semibold text-gray-700 ${
                            idx === 0 ? 'w-1/4' : ''
                          }`}
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
                        className={`border-b border-gray-200 ${
                          idx === result.rows.length - 1 ? 'font-semibold bg-indigo-50' : ''
                        }`}
                      >
                        <td className="py-3 px-2 text-gray-800">{row.label}</td>
                        <td className="py-3 px-2 text-right">{row.q1}</td>
                        <td className="py-3 px-2 text-right">{row.q2}</td>
                        <td className="py-3 px-2 text-right">{row.q3}</td>
                        <td className="py-3 px-2 text-right">{row.q4}</td>
                        <td className="py-3 px-2 text-right font-semibold">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Sales Budget calculated successfully!
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Next step: Use this data to create the Production Budget (Schedule 2)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            About the Sales Budget
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            The Sales Budget is the starting point for the master budget. It shows expected sales
            in both units and revenue for each quarter and the entire year.
          </p>
          <p className="text-sm text-blue-800">
            <strong>Formula:</strong> Sales Revenue = Expected Sales Units × Selling Price per Unit
          </p>
          <p className="text-sm text-blue-700 mt-2">
            If you include an inflation rate, the selling price will increase each quarter,
            reflecting expected price adjustments.
          </p>
        </div>
      </div>
    </div>
  );
}
