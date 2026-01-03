# Budget Automation System

Budget Generator for manufacturing companies. Automates the creation of all 13 interconnected budget schedules based on Hilton's Managerial Accounting framework.

## Live Demo

🔗 **[https://basilsuhail.github.io/Budgeting_Schedule_Automation/](https://basilsuhail.github.io/Budgeting_Schedule_Automation/)**

## Current Status

✅ **Schedule 1: Sales Budget** - Fully functional with all features
- Prior year comparison with growth analysis
- Quarterly inflation-adjusted pricing
- Cash vs credit sales split
- Seasonal distribution analysis
- Growth rate calculator
- CSV export

✅ **Schedule 2: Production Budget** - Fully functional with all enhancements
- Core production calculations (Sales + Ending Inventory - Beginning Inventory)
- Production capacity constraints tracking
- Batch size optimization (minimum and optimal)
- Just-in-Time (JIT) manufacturing mode
- Inventory carrying cost analysis
- Obsolescence risk calculations
- Production efficiency metrics
- CSV export

✅ **Schedule 3: Direct Material Budget** - Fully functional with all enhancements
- Core material calculations (Production Needs + Ending Inventory - Beginning Inventory)
- Multi-material support (e.g., fabric, poles, multiple raw materials)
- Scrap/waste allowance (accounts for normal production losses)
- Bulk purchase discounts (threshold-based pricing)
- Quarterly price inflation
- Just-in-Time (JIT) delivery per material
- Inventory turnover ratio and days outstanding
- Cash disbursement scheduling (payment terms)
- Critical materials identification (low turnover warnings)
- CSV export

✅ **Schedule 4: Direct Labor Budget** - Fully functional with all enhancements
- Core labor calculations (Hours per Unit × Units to Produce)
- Simple single-category or multi-category labor tracking
- Wage inflation (quarterly compounding)
- Overtime calculations (threshold-based with premium pay)
- Fringe benefits tracking (health, FICA, workers comp)
- Productivity efficiency adjustments
- Workforce planning (FTE calculations, turnover costs)
- CSV export

✅ **Schedule 5: Manufacturing Overhead Budget** - Fully functional with all enhancements
- Traditional costing (variable/fixed overhead allocation)
- Activity-Based Costing (ABC) with four-level cost hierarchy
- Unit-level, batch-level, product-level, and facility-level costs
- Predetermined overhead rate calculations
- Cash disbursements (excludes depreciation)
- Flexible allocation base (units/labor hours/machine hours)
- CSV export

✅ **Schedule 6: Selling & Administrative Expense Budget** - Fully functional with all enhancements
- Simple percentage-based or detailed line-by-line tracking
- Sales expenses (commissions, distribution, customer service)
- Marketing expenses (advertising, campaigns, brand development)
- Administrative expenses (salaries by department, occupancy, technology)
- Bad debt allowance calculations
- Performance metrics (SG&A as % of sales, expense ratios)
- CSV export

✅ **Schedule 8: Cash Receipts Budget** - Fully functional with all enhancements
- Collection timing tracking (same quarter vs next quarter)
- Cash sales vs credit sales analysis
- Beginning and ending accounts receivable
- Bad debt allowance (uncollectible percentage)
- Automatic calculation from Schedule 1 (Sales Budget)
- CSV export

🚧 **Schedules 7, 9-13** - Coming soon

## Development

### Local Setup

```bash
cd budget-app
npm install
npm run dev
```

Open http://localhost:3000/Budgeting_Schedule_Automation

### Deploy Updates

**Automatic deployment is configured!** Every time you push to the main branch, GitHub Actions automatically builds and deploys to GitHub Pages.

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Changes go live within 1-2 minutes. You can watch the deployment progress in the Actions tab of your repository.

## Tech Stack

- **Next.js 15** - React framework with static export
- **TypeScript 5** - Type-safe calculations
- **Tailwind CSS** - Styling
- **GitHub Pages** - Free hosting with automatic deployment

## Features

- No signup required
- All calculations happen in browser
- Dark mode & high contrast support
- CSV export for all schedules
- Persistent settings via localStorage

## Project Structure

```
budget-app/
├── src/
│   ├── app/              # Pages (home, input)
│   ├── lib/
│   │   ├── calculations/ # Schedule calculation logic
│   │   └── types/        # TypeScript interfaces
│   └── ...
├── package.json
└── next.config.ts        # Static export config
```

## License

© 2025 Budget Automation System
