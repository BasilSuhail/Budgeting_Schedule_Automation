'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    setDarkMode(savedDarkMode);
    setHighContrast(savedHighContrast);
  }, []);

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

  const textColor = highContrast
    ? (darkMode ? 'text-white' : 'text-black')
    : (darkMode ? 'text-gray-100' : 'text-[#454545]');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#111] text-gray-100' : 'bg-white text-[#454545]'}`}>
      {/* Simple Header */}
      <header className="max-w-3xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
          Budget Automation
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

      {/* Content */}
      <main className={`max-w-3xl mx-auto px-6 py-12 ${textColor}`}>
        <h2 className={`text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
          Budget Generator
        </h2>

        <p className="text-xl mb-6 leading-relaxed">
          Create comprehensive financial budgets for manufacturing companies.
        </p>

        <p className="text-lg mb-12 leading-relaxed">
          No signup required. All calculations happen in your browser.
        </p>

        <Link
          href="/input"
          className={`inline-block ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium px-8 py-4 text-lg mb-16`}
        >
          Start New Budget
        </Link>

        <hr className={`my-16 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />

        <h3 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          How it works
        </h3>

        <p className="text-lg mb-6 leading-relaxed">
          You enter your company's financial data—sales forecasts, costs, inventory policies,
          and economic assumptions. The system automatically calculates all 13 interconnected
          budget schedules that companies use for financial planning.
        </p>

        <p className="text-lg mb-12 leading-relaxed">
          The formulas follow the standard methodology taught in business schools and used by
          Fortune 500 companies. No spreadsheet formulas to debug. No manual calculations.
          Just clean, accurate budgets in minutes.
        </p>

        <h3 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          The 13 Schedules
        </h3>

        <ol className="space-y-2 mb-12 text-lg leading-relaxed list-decimal list-inside">
          <li>Sales Budget</li>
          <li>Production Budget</li>
          <li>Direct-Material Budget</li>
          <li>Direct-Labour Budget</li>
          <li>Manufacturing Overhead Budget</li>
          <li>Selling & Administrative Budget</li>
          <li>Admin Expense Budget</li>
          <li>Cash Receipts Budget</li>
          <li>Cash Disbursement Budget</li>
          <li>Cash Budget</li>
          <li>Cost of Goods Manufactured & Sold</li>
          <li>Budgeted Income Statement</li>
          <li>Budgeted Balance Sheet</li>
        </ol>

        <p className="text-lg mb-6 leading-relaxed">
          Plus the Budgeted Cash Flow Statement.
        </p>

        <hr className={`my-16 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />

        <h3 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          What's built
        </h3>

        <p className="text-lg mb-6 leading-relaxed">
          <strong>Schedule 1: Sales Budget</strong> — Fully functional. Input quarterly sales data,
          set pricing and inflation rates, get automatic calculations.
        </p>

        <p className="text-lg mb-12 leading-relaxed">
          Schedules 2-14 are coming soon.
        </p>

        <hr className={`my-16 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />

        <h3 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Why this exists
        </h3>

        <p className="text-lg mb-6 leading-relaxed">
          Making master budgets manually in Excel is tedious and error-prone. You spend hours
          linking formulas across 13 worksheets. One mistake breaks everything downstream.
        </p>

        <p className="text-lg mb-12 leading-relaxed">
          This tool automates the boring parts so you can focus on strategy and analysis.
          Enter your assumptions once. Get all 13 schedules instantly. Change an assumption.
          See the impact across all schedules immediately.
        </p>

        <Link
          href="/input"
          className={`inline-block ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium px-8 py-4 text-lg mb-16`}
        >
          Try it now
        </Link>
      </main>

      {/* Footer */}
      <footer className={`max-w-3xl mx-auto px-6 py-12 border-t ${darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'} text-sm`}>
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© 2025 Budget Automation System</p>
      </footer>
    </div>
  );
}
