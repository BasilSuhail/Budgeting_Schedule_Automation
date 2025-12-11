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
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link href="/" className="text-[#0071e3] hover:text-[#0077ed] text-sm font-medium">
            ← Back
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Budget Input</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Schedule 1: Sales Budget
          </h2>
          <p className="text-lg text-gray-600">
            Enter your forecasted sales data to begin
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Input Form - Narrower */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 h-fit sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Company Info</h3>

            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Shahtaj Sugar Mills"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base"
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
                  placeholder="Sugar"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales Data</h3>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Q1 (Oct-Dec)
                    </label>
                    <input
                      type="number"
                      value={q1Sales}
                      onChange={(e) => setQ1Sales(e.target.value)}
                      placeholder="1000"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Q2 (Jan-Mar)
                    </label>
                    <input
                      type="number"
                      value={q2Sales}
                      onChange={(e) => setQ2Sales(e.target.value)}
                      placeholder="1500"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Q3 (Apr-Jun)
                    </label>
                    <input
                      type="number"
                      value={q3Sales}
                      onChange={(e) => setQ3Sales(e.target.value)}
                      placeholder="1200"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Q4 (Jul-Sep)
                    </label>
                    <input
                      type="number"
                      value={q4Sales}
                      onChange={(e) => setQ4Sales(e.target.value)}
                      placeholder="1300"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price per Unit
                  </label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="85000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inflation Rate (Annual %)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    placeholder="0.15"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter as decimal (e.g., 0.15 for 15%)
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium py-3 px-6 rounded-lg text-base"
            >
              Calculate
            </button>

            {errors.length > 0 && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-red-800 font-semibold text-sm mb-2">Errors:</h4>
                <ul className="list-disc list-inside text-red-700 text-xs space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Results Display - Wider */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Results</h3>

            {!result && (
              <div className="text-center py-20 text-gray-400">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-lg mb-2">No results yet</p>
                <p className="text-sm">Enter data and click Calculate to see your sales budget</p>
              </div>
            )}

            {result && (
              <div>
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">
                    {companyName || 'Your Company'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Product: {productName || 'Product'} • Schedule 1: Sales Budget
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        {result.headers.map((header: string, idx: number) => (
                          <th
                            key={idx}
                            className={`py-4 px-4 text-left font-semibold text-gray-700 text-sm ${
                              idx === 0 ? 'w-48' : 'text-right'
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
                            idx === result.rows.length - 1 ? 'font-semibold bg-blue-50' : ''
                          }`}
                        >
                          <td className="py-4 px-4 text-gray-800 text-sm">{row.label}</td>
                          <td className="py-4 px-4 text-right text-sm font-mono">{row.q1}</td>
                          <td className="py-4 px-4 text-right text-sm font-mono">{row.q2}</td>
                          <td className="py-4 px-4 text-right text-sm font-mono">{row.q3}</td>
                          <td className="py-4 px-4 text-right text-sm font-mono">{row.q4}</td>
                          <td className="py-4 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ Sales Budget calculated successfully
                  </p>
                  <p className="text-xs text-green-700 mt-2">
                    Next: Use this data to create Production Budget (Schedule 2)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-8 max-w-4xl">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            About the Sales Budget
          </h4>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            The Sales Budget is the starting point for the master budget. It shows expected sales
            in both units and revenue for each quarter and the entire year.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>Formula:</strong> Sales Revenue = Expected Sales Units × Selling Price per Unit
          </p>
        </div>
      </div>
    </div>
  );
}
