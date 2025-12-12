'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Save preferences to localStorage when they change
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
  };

  const textColor = darkMode ? 'text-gray-100' : 'text-[#454545]';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#111] text-gray-100' : 'bg-white text-[#454545]'}`}>
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className={`text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-[#454545] hover:text-black'} hover:underline`}
        >
          ← Back
        </Link>
        <div className="flex items-center gap-4">
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Inverted Mode
          </span>
          <button
            onClick={toggleDarkMode}
            className={`text-sm hover:underline ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className={`max-w-3xl mx-auto px-6 py-12 ${textColor}`}>
        <h1 className={`text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
          Sample Project 1
        </h1>

        <p className="text-lg mb-12 leading-relaxed">
          Add your detailed project description here. Explain what the project does,
          the technologies used, challenges faced, and solutions implemented.
        </p>

        {/* Project Images Section */}
        <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Screenshots
        </h2>

        <div className="space-y-6 mb-12">
          {/* Placeholder for images */}
          <div className={`w-full h-64 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} flex items-center justify-center`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Add project screenshot 1 here
            </p>
          </div>

          <div className={`w-full h-64 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} flex items-center justify-center`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Add project screenshot 2 here
            </p>
          </div>
        </div>

        {/* Features Section */}
        <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Key Features
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-12 text-lg leading-relaxed">
          <li>Feature 1: Description of feature</li>
          <li>Feature 2: Description of feature</li>
          <li>Feature 3: Description of feature</li>
        </ul>

        {/* Technologies Section */}
        <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Technologies Used
        </h2>

        <div className="flex flex-wrap gap-3 mb-12">
          <span className={`px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} text-sm`}>
            React
          </span>
          <span className={`px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} text-sm`}>
            TypeScript
          </span>
          <span className={`px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} text-sm`}>
            Next.js
          </span>
        </div>

        {/* View Live Button */}
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium px-8 py-4 text-lg mb-8`}
        >
          View Live →
        </a>

        <div className="mt-12">
          <Link
            href="/"
            className={`text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-[#454545] hover:text-black'} hover:underline`}
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className={`max-w-3xl mx-auto px-6 py-12 border-t ${darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'} text-sm`}>
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© 2025 Budget Automation System</p>
      </footer>
    </div>
  );
}
