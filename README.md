# Budget Automation System

Master Budget Generator for manufacturing companies. Automates the creation of all 13 interconnected budget schedules based on Hilton's Managerial Accounting framework.

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

🚧 **Schedules 2-13** - Coming soon

## Development

### Local Setup

```bash
cd budget-app
npm install
npm run dev
```

Open [http://localhost:3000/Budgeting_Schedule_Automation](http://localhost:3000/Budgeting_Schedule_Automation)

### Deploy Updates

Whenever you make changes:

```bash
cd budget-app
npm run deploy
```

This automatically builds and deploys your app to GitHub Pages. Changes go live within 2-3 minutes.

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
