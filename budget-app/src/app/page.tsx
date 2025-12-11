import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Budget Automation System
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Master Budget Generator for Manufacturing Companies
          </p>
          <p className="text-sm text-gray-500">
            Based on Ronald W. Hilton's 13-Schedule Framework
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              ✓ Automated Calculations
            </h3>
            <p className="text-sm text-blue-700">
              All 13 budget schedules generated automatically from your inputs
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              ✓ Industry Standard
            </h3>
            <p className="text-sm text-green-700">
              Follows textbook methodology used by Fortune 500 companies
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              ✓ Flexible Inputs
            </h3>
            <p className="text-sm text-purple-700">
              Enter historical data, rates, and assumptions at your own pace
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              ✓ Export Ready
            </h3>
            <p className="text-sm text-orange-700">
              Download results in Excel, PDF, or CSV formats
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/input"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start New Budget →
          </Link>

          <p className="text-sm text-gray-500">
            No signup required • All data stays in your browser
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            The 13 Budget Schedules
          </h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {[
              "1. Sales Budget",
              "2. Production Budget",
              "3. Direct-Material Budget",
              "4. Direct-Labour Budget",
              "5. Manufacturing Overhead Budget",
              "6. Selling & Administrative Budget",
              "7. Admin Expense Budget",
              "8. Cash Receipts Budget",
              "9. Cash Disbursement Budget",
              "10. Cash Budget",
              "11. Cost of Goods Manufactured & Sold",
              "12. Budgeted Income Statement",
              "13. Budgeted Balance Sheet"
            ].map((schedule, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-gray-700">
                <span className="text-indigo-600">✓</span>
                <span>{schedule}</span>
              </div>
            ))}
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="text-indigo-600">✓</span>
              <span>14. Budgeted Cash Flow Statement</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-1">© 2025 Budget Automation System</p>
      </footer>
    </div>
  );
}
