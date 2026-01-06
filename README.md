<div align="center">

# Budget Automation System

### Enterprise-Grade Master Budget Generator for Manufacturing Companies

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://basilsuhail.github.io/Budgeting_Schedule_Automation/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

*Automates all 13 interconnected budget schedules based on Hilton's Managerial Accounting framework*

[**Try It Live**](https://basilsuhail.github.io/Budgeting_Schedule_Automation/) · [**Report Bug**](https://github.com/basilsuhail/Budgeting_Schedule_Automation/issues) · [**Request Feature**](https://github.com/basilsuhail/Budgeting_Schedule_Automation/issues)

</div>

---

## Overview

Creating master budgets manually in Excel is tedious and error-prone. You spend hours linking formulas across 13+ worksheets. One mistake breaks everything downstream.

**This tool automates the boring parts** so you can focus on strategy and analysis. Enter your assumptions once. Get all 13 schedules instantly. Change an assumption. See the impact across all schedules immediately.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MASTER BUDGET SYSTEM                                │
│                                                                             │
│   No signup required · Browser-based · CSV Export · Dark Mode Support       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## System Architecture

### Data Flow Diagram

```
                              ┌──────────────────┐
                              │   USER INPUTS    │
                              │                  │
                              │  • Sales Data    │
                              │  • Cost Drivers  │
                              │  • Policies      │
                              └────────┬─────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          OPERATING BUDGETS                                   │
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌────────────┐ │
│  │ Schedule 1  │────▶│ Schedule 2  │────▶│ Schedule 3  │────▶│ Schedule 4 │ │
│  │   SALES     │     │ PRODUCTION  │     │  MATERIAL   │     │   LABOR    │ │
│  │   BUDGET    │     │   BUDGET    │     │   BUDGET    │     │   BUDGET   │ │
│  └─────────────┘     └─────────────┘     └─────────────┘     └────────────┘ │
│         │                                       │                    │       │
│         │            ┌─────────────┐            │                    │       │
│         │            │ Schedule 5  │◀───────────┴────────────────────┘       │
│         │            │  OVERHEAD   │                                         │
│         │            │   BUDGET    │                                         │
│         │            └──────┬──────┘                                         │
│         │                   │                                                │
│         ▼                   ▼                                                │
│  ┌─────────────────────────────────────────┐                                │
│  │           Schedule 6: SG&A BUDGET        │                                │
│  │  (Selling & Administrative Expenses)     │                                │
│  └─────────────────────────────────────────┘                                │
└──────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            CASH BUDGETS                                      │
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│  │ Schedule 7  │     │ Schedule 8  │     │ Schedule 9  │                    │
│  │    CASH     │────▶│    CASH     │────▶│    CASH     │                    │
│  │  RECEIPTS   │     │DISBURSEMENTS│     │   BUDGET    │                    │
│  └─────────────┘     └─────────────┘     └─────────────┘                    │
└──────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                        FINANCIAL STATEMENTS                                  │
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌────────────┐ │
│  │ Schedule 10 │────▶│ Schedule 11 │────▶│ Schedule 12 │────▶│Schedule 13 │ │
│  │    COGS     │     │   INCOME    │     │  CASH FLOW  │     │  BALANCE   │ │
│  │  SCHEDULE   │     │  STATEMENT  │     │  STATEMENT  │     │   SHEET    │ │
│  └─────────────┘     └─────────────┘     └─────────────┘     └────────────┘ │
│                                                                              │
│                              ┌─────────────────────────────────┐            │
│                              │         FINAL OUTPUTS           │            │
│                              │                                 │            │
│                              │  • Profitability Ratios         │            │
│                              │  • Liquidity Metrics            │            │
│                              │  • Financial Health Scores      │            │
│                              └─────────────────────────────────┘            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Schedule Integration Matrix

```
              Feeds Into →
            ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
            │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │13 │
        ┌───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
        │ 1 │   │ ● │   │   │   │ ● │ ● │   │   │   │ ● │   │   │
        │ 2 │   │   │ ● │ ● │ ● │   │   │   │   │ ● │   │   │   │
        │ 3 │   │   │   │   │   │   │   │ ● │   │ ● │   │   │ ● │
  From  │ 4 │   │   │   │   │   │   │   │ ● │   │ ● │   │   │ ● │
   ↓    │ 5 │   │   │   │   │   │   │   │ ● │   │ ● │   │ ● │ ● │
        │ 6 │   │   │   │   │   │   │   │ ● │   │   │ ● │   │   │
        │ 7 │   │   │   │   │   │   │   │   │ ● │   │   │ ● │ ● │
        │ 8 │   │   │   │   │   │   │   │   │ ● │   │   │ ● │ ● │
        │ 9 │   │   │   │   │   │   │   │   │   │   │   │ ● │ ● │
        │10 │   │   │   │   │   │   │   │   │   │   │ ● │ ● │ ● │
        │11 │   │   │   │   │   │   │   │   │   │   │   │ ● │ ● │
        │12 │   │   │   │   │   │   │   │   │   │   │   │   │ ● │
        └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

        ● = Data flows from row schedule to column schedule
```

---

## The 13 Schedules

<table>
<tr>
<td width="50%">

### Operating Budgets

| # | Schedule | Purpose |
|---|----------|---------|
| 1 | **Sales Budget** | Revenue forecasting by quarter |
| 2 | **Production Budget** | Units to manufacture |
| 3 | **Direct Material Budget** | Raw material requirements |
| 4 | **Direct Labor Budget** | Workforce hours & costs |
| 5 | **Manufacturing Overhead** | Factory indirect costs |
| 6 | **SG&A Budget** | Operating expenses |

</td>
<td width="50%">

### Cash & Financial Budgets

| # | Schedule | Purpose |
|---|----------|---------|
| 7 | **Cash Receipts** | When cash is collected |
| 8 | **Cash Disbursements** | When cash is paid out |
| 9 | **Cash Budget** | Liquidity planning |
| 10 | **COGS Schedule** | Cost of goods sold |
| 11 | **Income Statement** | Profitability projection |
| 12 | **Cash Flow Statement** | Cash movement analysis |
| 13 | **Balance Sheet** | Financial position |

</td>
</tr>
</table>

---

## Features

### Core Capabilities

```
┌────────────────────────────────────────────────────────────────────────────┐
│  INPUTS                    │  CALCULATIONS              │  OUTPUTS         │
├────────────────────────────┼────────────────────────────┼──────────────────┤
│                            │                            │                  │
│  ▸ Sales Forecast          │  ▸ Automatic Integration   │  ▸ 13 Schedules  │
│  ▸ Cost Drivers            │  ▸ Real-time Updates       │  ▸ CSV Export    │
│  ▸ Inventory Policies      │  ▸ Validation Checks       │  ▸ Ratio Analysis│
│  ▸ Collection Patterns     │  ▸ Error Detection         │  ▸ Trend Charts  │
│  ▸ Payment Terms           │  ▸ Cross-Schedule Links    │  ▸ KPI Dashboard │
│                            │                            │                  │
└────────────────────────────┴────────────────────────────┴──────────────────┘
```

### Schedule Details

<details>
<summary><b>Schedule 1: Sales Budget</b></summary>

- Prior year comparison with growth analysis
- Quarterly inflation-adjusted pricing
- Cash vs credit sales split
- Seasonal distribution analysis
- Growth rate calculator
- CSV export
</details>

<details>
<summary><b>Schedule 2: Production Budget</b></summary>

- Core production calculations (Sales + Ending Inventory - Beginning Inventory)
- Production capacity constraints tracking
- Batch size optimization (minimum and optimal)
- Just-in-Time (JIT) manufacturing mode
- Inventory carrying cost analysis
- Obsolescence risk calculations
- Production efficiency metrics
</details>

<details>
<summary><b>Schedule 3: Direct Material Budget</b></summary>

- Multi-material support (e.g., fabric, poles, multiple raw materials)
- Scrap/waste allowance (accounts for normal production losses)
- Bulk purchase discounts (threshold-based pricing)
- Quarterly price inflation
- Just-in-Time (JIT) delivery per material
- Inventory turnover ratio and days outstanding
- Critical materials identification (low turnover warnings)
</details>

<details>
<summary><b>Schedule 4: Direct Labor Budget</b></summary>

- Simple single-category or multi-category labor tracking
- Wage inflation (quarterly compounding)
- Overtime calculations (threshold-based with premium pay)
- Fringe benefits tracking (health, FICA, workers comp)
- Productivity efficiency adjustments
- Workforce planning (FTE calculations, turnover costs)
</details>

<details>
<summary><b>Schedule 5: Manufacturing Overhead Budget</b></summary>

- Traditional costing (variable/fixed overhead allocation)
- Activity-Based Costing (ABC) with four-level cost hierarchy
- Unit-level, batch-level, product-level, and facility-level costs
- Predetermined overhead rate calculations
- Cash disbursements (excludes depreciation)
- Flexible allocation base (units/labor hours/machine hours)
</details>

<details>
<summary><b>Schedule 6: Selling & Administrative Expense Budget</b></summary>

- Simple percentage-based or detailed line-by-line tracking
- Sales expenses (commissions, distribution, customer service)
- Marketing expenses (advertising, campaigns, brand development)
- Administrative expenses (salaries by department, occupancy, technology)
- Bad debt allowance calculations
- Performance metrics (SG&A as % of sales, expense ratios)
</details>

<details>
<summary><b>Schedule 7: Cash Receipts Budget</b></summary>

- Collection timing tracking (same quarter vs next quarter)
- Cash sales vs credit sales analysis
- Beginning and ending accounts receivable
- Bad debt allowance (uncollectible percentage)
- Automatic calculation from Schedule 1 (Sales Budget)
</details>

<details>
<summary><b>Schedule 8: Cash Disbursements Budget</b></summary>

- Material payment timing (same quarter vs next quarter)
- Accounts payable tracking
- Automatic integration with Schedules 3-6
- Income tax payments scheduling
- Dividend payments tracking
- Capital expenditures planning
- Loan payment scheduling
</details>

<details>
<summary><b>Schedule 9: Cash Budget</b></summary>

- Master cash planning schedule
- Beginning and ending cash balance tracking
- Minimum cash balance policy enforcement
- Financing needs calculation (borrowing requirements)
- Operating cash flow metrics
- Free cash flow calculation
</details>

<details>
<summary><b>Schedule 10: Cost of Goods Manufactured & Sold</b></summary>

- Cost of Goods Manufactured calculation
- Cost of Goods Sold calculation
- Work-in-Process (WIP) inventory tracking
- Finished Goods (FG) inventory tracking
- Per-unit manufacturing cost analysis
- Per-unit sold cost analysis
</details>

<details>
<summary><b>Schedule 11: Budgeted Income Statement</b></summary>

- Complete income statement projection
- Gross margin calculation and percentage analysis
- Operating income calculation
- Interest expense tracking
- Income tax calculation (configurable tax rate)
- Net income projection
- Profitability ratios (gross margin %, operating margin %, net profit margin %)
</details>

<details>
<summary><b>Schedule 12: Budgeted Statement of Cash Flows</b></summary>

- Direct method presentation (cash receipts and payments)
- Indirect method reconciliation (net income to operating cash)
- Operating activities (customer receipts, material/labor/overhead/SGA payments)
- Investing activities (capital expenditures, asset sales)
- Financing activities (loan proceeds, repayments, stock issued, dividends)
- Cash flow quality metrics:
  - Free cash flow
  - Operating cash to net income ratio
  - Capital intensity ratio
  - Dividend coverage ratio
  - Debt service coverage ratio
  - Cash flow adequacy ratio
</details>

<details>
<summary><b>Schedule 13: Budgeted Balance Sheet</b></summary>

- Complete projected balance sheet
- **Assets:** Cash, accounts receivable, inventories (raw material, WIP, finished goods), fixed assets with accumulated depreciation
- **Liabilities:** Accounts payable, wages payable, taxes payable, short-term debt, long-term debt
- **Stockholders' Equity:** Common stock, retained earnings
- Balance check validation (Assets = Liabilities + Equity)
- Financial ratios:
  - Current ratio and quick ratio (liquidity)
  - Debt-to-equity and debt-to-assets (leverage)
  - Return on assets (ROA) and return on equity (ROE)
  - Working capital analysis
</details>

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ARCHITECTURE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌────────────┐  │
│   │   Next.js   │    │ TypeScript  │    │  Tailwind   │    │   GitHub   │  │
│   │     15      │    │      5      │    │     CSS     │    │   Pages    │  │
│   │             │    │             │    │             │    │            │  │
│   │  Framework  │    │ Type-Safe   │    │  Styling    │    │  Hosting   │  │
│   │  & Routing  │    │ Calculations│    │  & Theming  │    │  & CI/CD   │  │
│   └─────────────┘    └─────────────┘    └─────────────┘    └────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   KEY FEATURES:                                                             │
│   • Static site generation (no server required)                             │
│   • Client-side calculations (privacy-first)                                │
│   • Zero external dependencies for core logic                               │
│   • Automatic deployments on push                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
budget-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   └── input/
│   │       └── page.tsx          # Main budget input interface
│   │
│   └── lib/
│       ├── calculations/
│       │   ├── 01-salesBudget.ts
│       │   ├── 02-productionBudget.ts
│       │   ├── 03-directMaterialBudget.ts
│       │   ├── 04-directLaborBudget.ts
│       │   ├── 05-manufacturingOverheadBudget.ts
│       │   ├── 06-sellingAdminExpenseBudget.ts
│       │   ├── 07-cashReceiptsBudget.ts
│       │   ├── 08-cashDisbursementsBudget.ts
│       │   ├── 09-cashBudget.ts
│       │   ├── 10-cogsSchedule.ts
│       │   ├── 11-incomeStatement.ts
│       │   ├── 12-cashFlowStatement.ts
│       │   └── 13-balanceSheet.ts
│       │
│       └── types/
│           └── budgets.ts        # TypeScript interfaces
│
├── package.json
├── next.config.ts                # Static export configuration
└── tailwind.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/basilsuhail/Budgeting_Schedule_Automation.git

# Navigate to the app directory
cd Budgeting_Schedule_Automation/budget-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/Budgeting_Schedule_Automation](http://localhost:3000/Budgeting_Schedule_Automation) in your browser.

### Deployment

The project uses GitHub Actions for automatic deployment. Every push to `main` triggers a build and deploy to GitHub Pages.

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Changes go live within 1-2 minutes.

---

## Inputs & Outputs

### Master Inputs Required

| Category | Inputs |
|----------|--------|
| **Sales** | Units forecast, pricing, inflation rates, cash/credit split |
| **Production** | Inventory policies, capacity constraints, batch sizes |
| **Materials** | Quantities per unit, costs, supplier terms, waste allowance |
| **Labor** | Hours per unit, wage rates, overtime policies, benefits |
| **Overhead** | Variable rates, fixed costs, depreciation, allocation bases |
| **Operating Expenses** | SG&A by category, commission rates, bad debt allowance |
| **Cash Management** | Collection patterns, payment terms, minimum cash policy |
| **Financing** | Interest rates, loan terms, dividend policies |
| **Taxes** | Income tax rate, payment schedules |
| **Prior Balances** | Beginning inventory, A/R, A/P, fixed assets |

### Master Outputs Delivered

| Output | Description |
|--------|-------------|
| **13 Budget Schedules** | Complete interconnected budget system |
| **Profitability Analysis** | Gross margin, operating margin, net profit margin |
| **Liquidity Metrics** | Current ratio, quick ratio, working capital |
| **Cash Flow Analysis** | Free cash flow, operating cash, financing needs |
| **Financial Ratios** | ROA, ROE, debt-to-equity, asset turnover |
| **CSV Exports** | Download any schedule for external use |

---

## Theoretical Foundation

This system implements the **Master Budget** framework as described in:

> **Ronald W. Hilton's Managerial Accounting: Creating Value in a Dynamic Business Environment**

The master budget is the primary planning document used by manufacturing companies worldwide. It integrates operational plans with financial projections to create a comprehensive roadmap for the fiscal period.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BUDGET HIERARCHY                                    │
│                                                                             │
│                        ┌───────────────────┐                                │
│                        │  STRATEGIC PLAN   │                                │
│                        │   (Long-term)     │                                │
│                        └─────────┬─────────┘                                │
│                                  │                                          │
│                        ┌─────────▼─────────┐                                │
│                        │   MASTER BUDGET   │  ◀── This System               │
│                        │   (Annual Plan)   │                                │
│                        └─────────┬─────────┘                                │
│                                  │                                          │
│              ┌───────────────────┼───────────────────┐                      │
│              │                   │                   │                      │
│    ┌─────────▼─────────┐ ┌───────▼───────┐ ┌────────▼────────┐             │
│    │    OPERATING      │ │    CASH       │ │   FINANCIAL     │             │
│    │     BUDGETS       │ │   BUDGETS     │ │   STATEMENTS    │             │
│    │  (Schedules 1-6)  │ │(Schedules 7-9)│ │ (Schedules 10-13)│            │
│    └───────────────────┘ └───────────────┘ └─────────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Roadmap

### Completed
- [x] All 13 budget schedules
- [x] Automatic schedule integration
- [x] CSV export functionality
- [x] Dark mode support
- [x] Input validation
- [x] Financial ratio analysis

### Future Enhancements
- [ ] Scenario modeling (best/base/worst cases)
- [ ] Sensitivity analysis
- [ ] Budget vs actual variance tracking
- [ ] Dashboard visualization
- [ ] What-if analysis tool
- [ ] PDF export
- [ ] Multi-product support
- [ ] Multi-year forecasting

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

© 2025 Budget Automation System. All rights reserved.

---

<div align="center">

**Built with Next.js, TypeScript, and Tailwind CSS**

[**Live Demo**](https://basilsuhail.github.io/Budgeting_Schedule_Automation/) · [**Report Issue**](https://github.com/basilsuhail/Budgeting_Schedule_Automation/issues)

</div>
