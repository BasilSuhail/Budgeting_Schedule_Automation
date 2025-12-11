import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">Budget Automation</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
            Master Budget<br/>Generator
          </h2>
          <p className="text-2xl text-gray-600 mb-4 font-normal max-w-2xl mx-auto">
            Create comprehensive financial budgets for manufacturing companies in minutes.
          </p>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Based on Ronald W. Hilton's proven 13-schedule framework
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <Link
            href="/input"
            className="inline-block bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium px-8 py-3.5 rounded-xl text-lg shadow-sm"
          >
            Start New Budget
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No signup required
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Automated Calculations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All 13 budget schedules generated automatically from your inputs with industry-standard formulas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Industry Standard
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Follows textbook methodology used by Fortune 500 companies and taught in business schools.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fast & Flexible
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Enter historical data, rates, and assumptions at your own pace. Save hours of manual work.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Export Ready
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Download results in professional formats ready for presentation and decision-making.
            </p>
          </div>
        </div>

        {/* Schedules List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-10">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            The 13 Budget Schedules
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto">
            {[
              "Sales Budget",
              "Production Budget",
              "Direct-Material Budget",
              "Direct-Labour Budget",
              "Manufacturing Overhead Budget",
              "Selling & Administrative Budget",
              "Admin Expense Budget",
              "Cash Receipts Budget",
              "Cash Disbursement Budget",
              "Cash Budget",
              "Cost of Goods Manufactured & Sold",
              "Budgeted Income Statement",
              "Budgeted Balance Sheet",
              "Budgeted Cash Flow Statement"
            ].map((schedule, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-gray-700">
                <span className="text-[#0071e3] text-sm font-medium w-6">{idx + 1}.</span>
                <span className="text-base">{schedule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2025 Budget Automation System
          </p>
        </div>
      </footer>
    </div>
  );
}
