# Budget Automation System - Project Roadmap

## Project Overview
Transform the Excel-based Management Accounting & Budgeting project into an automated web application that generates all 13 budget schedules based on user inputs.

---

## 🎯 Core Objectives

1. **User-Friendly Input Interface**: Allow users to input company data, inflation rates, growth rates, and initial values
2. **Automated Calculations**: Generate all 13 schedules automatically using formulas from Ronald W. Hilton's methodology
3. **Professional Output**: Display results in clean, exportable formats (PDF, Excel, CSV)
4. **Flexibility**: Support different manufacturing companies and sectors
5. **Accuracy**: Maintain the authenticity and accuracy of financial calculations

---

## 📊 The 13 Budget Schedules to Automate

1. Sales Budget
2. Production Budget
3. Direct-Material Budget
4. Direct-Labour Budget
5. Manufacturing Overhead Budget
6. Selling & Administrative Budget
7. Admin Expense Budget
8. Cash Receipts Budget
9. Cash Disbursement Budget
10. Cash Budget
11. Budgeted Schedule for Cost of Goods Manufactured & Sold
12. Budgeted Income Statement
13. Budgeted Balance Sheet
14. Budgeted Cash Flow Statement

---

## 🗺️ Implementation Roadmap

### **Phase 1: Planning & Setup** (Week 1)

#### 1.1 Requirements Gathering
- [ ] Document all formulas from Excel workbook
- [ ] List all input parameters needed from users
- [ ] Define data relationships between schedules
- [ ] Identify industry-specific parameters (inflation, growth rates, etc.)

#### 1.2 Technology Stack Selection
**Recommended Stack:**
- **Frontend**: React.js with TypeScript (for type safety in calculations)
- **UI Framework**: Tailwind CSS + Shadcn/ui (modern, professional look)
- **Backend**: Node.js + Express (optional, for advanced features)
- **Database**: PostgreSQL or MongoDB (for saving scenarios/companies)
- **Deployment**: Vercel/Netlify (frontend) + Railway/Render (backend)

**Alternative Stack (Simpler):**
- **Frontend-Only**: Next.js (React framework with built-in routing)
- **Styling**: Tailwind CSS
- **State Management**: React Context or Zustand
- **Deployment**: Vercel (one-click deployment)

#### 1.3 Project Setup
```bash
# Initialize project
npx create-next-app@latest budget-automation --typescript --tailwind
cd budget-automation
npm install
```

---

### **Phase 2: Backend Logic Development** (Week 2-3)

#### 2.1 Data Models
Create TypeScript interfaces for:
- Company Information
- Input Parameters (inflation, growth rates, periods)
- Each Budget Schedule
- Historical Financial Data

#### 2.2 Calculation Engine
Build calculation modules for each schedule:

```
src/
  calculations/
    01-salesBudget.ts
    02-productionBudget.ts
    03-directMaterialBudget.ts
    04-directLabourBudget.ts
    05-manufacturingOverhead.ts
    06-sellingAdminBudget.ts
    07-adminExpenseBudget.ts
    08-cashReceiptsBudget.ts
    09-cashDisbursementBudget.ts
    10-cashBudget.ts
    11-cogsSchedule.ts
    12-incomeStatement.ts
    13-balanceSheet.ts
    14-cashFlowStatement.ts
```

#### 2.3 Validation Layer
- Input validation (positive numbers, realistic percentages)
- Cross-schedule validation (ensure consistency)
- Error handling and user feedback

---

### **Phase 3: Frontend Development** (Week 4-5)

#### 3.1 Multi-Step Input Form
Create a wizard-style form with sections:

**Step 1: Company Information**
- Company name
- Industry sector
- Product details
- Financial year/period

**Step 2: Base Period Data**
- Beginning inventory
- Expected sales (units & price)
- Material costs
- Labour rates
- Manufacturing overhead rates

**Step 3: Growth & Economic Indicators**
- Inflation rate
- Sales growth rate
- Industry-specific growth rates
- Wage inflation
- Material cost inflation

**Step 4: Inventory & Cash Policies**
- Desired ending inventory (% of next period)
- Cash collection periods
- Payment terms
- Minimum cash balance

**Step 5: Additional Parameters**
- Tax rates
- Depreciation schedules
- Selling & administrative expenses
- Dividend policies

#### 3.2 Results Dashboard
- Navigation between 13 schedules
- Interactive tables with formulas visible on hover
- Charts and visualizations (sales trends, cash flow, etc.)
- Export functionality (PDF, Excel, CSV)

#### 3.3 UI/UX Features
- Progress indicator in multi-step form
- Save/Load functionality (local storage or database)
- Print-friendly views
- Responsive design (mobile-friendly)

---

### **Phase 4: Advanced Features** (Week 6-7)

#### 4.1 Scenario Analysis
- Save multiple budget scenarios
- Compare scenarios side-by-side
- What-if analysis (adjust one variable, see impact)

#### 4.2 Data Integration
- Import historical data from Excel
- Connect to Pakistan Stock Exchange API for real-time data
- Inflation rate APIs (Pakistan Bureau of Statistics)

#### 4.3 Reporting Features
- Executive summary generation
- Variance analysis (if actual data available)
- Commentary and notes system
- Professional PDF reports with company branding

#### 4.4 User Management (Optional)
- User accounts and authentication
- Save projects to cloud
- Share reports with stakeholders
- Role-based access (viewer vs. editor)

---

### **Phase 5: Testing & Refinement** (Week 8)

#### 5.1 Testing Checklist
- [ ] Unit tests for all calculation functions
- [ ] Integration tests for schedule dependencies
- [ ] Validate against your original Excel results
- [ ] User acceptance testing with sample companies
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

#### 5.2 Documentation
- User guide (how to use the application)
- Technical documentation (for maintenance)
- API documentation (if backend is separate)

---

### **Phase 6: Deployment** (Week 9)

#### 6.1 Production Deployment
- Set up CI/CD pipeline
- Configure production environment
- Set up domain name (optional)
- SSL certificate

#### 6.2 Monitoring
- Error tracking (Sentry)
- Analytics (Google Analytics or Plausible)
- Performance monitoring

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Input Wizard │  │  Dashboard   │  │ Export Tools │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────┬────────────────────────────────┬──────────────┘
             │                                │
             ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ State Mgmt   │  │ Validation   │  │ Export Logic │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                 CALCULATION ENGINE                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│  │Schedule1│ │Schedule2│ │   ...   │ │Schedule13│         │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘         │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA LAYER (Optional)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Database   │  │   APIs       │  │ File Storage │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 File Structure

```
budget-automation/
├── public/
│   ├── logo.png
│   └── templates/
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── CompanyInfoForm.tsx
│   │   │   ├── BasePeriodForm.tsx
│   │   │   ├── GrowthRatesForm.tsx
│   │   │   └── PoliciesForm.tsx
│   │   ├── schedules/
│   │   │   ├── SalesBudget.tsx
│   │   │   ├── ProductionBudget.tsx
│   │   │   └── ... (all 13 schedules)
│   │   ├── common/
│   │   │   ├── Table.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── ExportButton.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── salesBudget.ts
│   │   │   ├── productionBudget.ts
│   │   │   └── ... (calculation logic)
│   │   ├── validation/
│   │   │   └── inputValidation.ts
│   │   ├── export/
│   │   │   ├── pdfExport.ts
│   │   │   └── excelExport.ts
│   │   └── utils/
│   │       └── formatters.ts
│   ├── types/
│   │   ├── company.ts
│   │   ├── budgets.ts
│   │   └── inputs.ts
│   ├── store/
│   │   └── budgetStore.ts (state management)
│   ├── pages/
│   │   ├── index.tsx (landing page)
│   │   ├── input.tsx (input wizard)
│   │   └── dashboard.tsx (results)
│   └── styles/
│       └── globals.css
├── tests/
│   ├── calculations/
│   └── components/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💡 Key Features to Implement

### Must-Have Features (MVP)
1. ✅ Multi-step input form
2. ✅ All 13 budget schedule calculations
3. ✅ Display results in tables
4. ✅ Export to PDF
5. ✅ Basic validation

### Nice-to-Have Features
6. 📊 Interactive charts and graphs
7. 💾 Save/load projects (localStorage)
8. 📱 Mobile-responsive design
9. 🔄 Scenario comparison
10. 📈 Visual trend analysis

### Advanced Features (Future)
11. 👥 User authentication
12. ☁️ Cloud storage
13. 🔗 API integrations (PSX, inflation data)
14. 📊 AI-powered insights
15. 🌍 Multi-currency support

---

## 🎨 UI/UX Mockup Ideas

### Landing Page
```
┌─────────────────────────────────────────────┐
│         Budget Automation System            │
│                                             │
│  Automate your company's 13-schedule       │
│  budgeting process in minutes              │
│                                             │
│          [Start New Budget]                │
│          [Load Saved Budget]               │
│                                             │
└─────────────────────────────────────────────┘
```

### Input Wizard
```
┌─────────────────────────────────────────────┐
│  Step 2 of 5: Base Period Data             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━                │
│                                             │
│  Sales Information                          │
│  ├─ Expected Sales (units): [____]         │
│  ├─ Selling Price per unit: [____]         │
│  └─ Sales Growth Rate (%):  [____]         │
│                                             │
│  [Back]              [Next: Growth Rates]  │
└─────────────────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────────────────┐
│  Budget Dashboard - Shahtaj Sugar Mills    │
├─────────────────────────────────────────────┤
│  Schedules         │  Results               │
│  ├─ Sales Budget  │  Q1    Q2    Q3    Q4  │
│  ├─ Production    │  ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭   │
│  ├─ Direct Mat.   │  Sales: 1000  1100     │
│  ├─ Direct Lab.   │  Cost:  800   850      │
│  └─ ...           │  Profit: 200  250      │
│                    │                        │
│                    │  [Export] [Print]      │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide (For Development)

### Option 1: Simple Frontend-Only (Recommended for Start)

```bash
# Create Next.js app
npx create-next-app@latest budget-automation --typescript --tailwind --app

# Navigate to project
cd budget-automation

# Install additional dependencies
npm install zustand recharts jspdf xlsx date-fns

# Run development server
npm run dev
```

### Option 2: Full-Stack Application

```bash
# Frontend
npx create-next-app@latest budget-automation-frontend --typescript --tailwind

# Backend
mkdir budget-automation-backend
cd budget-automation-backend
npm init -y
npm install express cors dotenv pg typescript ts-node @types/node @types/express

# Set up TypeScript
npx tsc --init
```

---

## 📊 Sample Data Structure

```typescript
interface BudgetInputs {
  company: {
    name: string;
    sector: string;
    product: string;
    fiscalYearStart: Date;
  };

  basePeriod: {
    beginningInventory: number;
    expectedSalesUnits: number;
    sellingPricePerUnit: number;
    materialCostPerUnit: number;
    directLabourHoursPerUnit: number;
    labourRatePerHour: number;
  };

  growthRates: {
    inflationRate: number;
    salesGrowthRate: number;
    materialCostInflation: number;
    wageInflation: number;
  };

  policies: {
    desiredEndingInventoryRatio: number;
    accountsReceivableCollectionPeriod: number;
    accountsPayablePeriod: number;
    minimumCashBalance: number;
  };
}
```

---

## 📈 Success Metrics

- ✅ User can generate all 13 schedules in under 5 minutes
- ✅ Calculations match Excel formulas with 100% accuracy
- ✅ Export feature works for PDF and Excel
- ✅ Responsive on mobile, tablet, and desktop
- ✅ Load time under 3 seconds
- ✅ Zero calculation errors

---

## 🎓 Learning Resources

### For React/Next.js:
- [Next.js Documentation](https://nextjs.org/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### For Financial Calculations:
- Ronald W. Hilton's Managerial Accounting textbook
- Your original Excel workbook (reference for formulas)

### For Deployment:
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)

---

## 🤝 Next Steps

1. **Immediate**: Share your Excel file structure (formulas, inputs, outputs)
2. **This Week**: Choose technology stack
3. **Next Week**: Set up development environment
4. **Ongoing**: Build incrementally, one schedule at a time

---

## 📞 Support & Collaboration

- Create GitHub repository for version control
- Set up project management board (GitHub Projects, Trello)
- Document all formulas and business logic
- Consider open-sourcing for student community

---

**Estimated Timeline**: 8-12 weeks (part-time development)
**Complexity Level**: Intermediate to Advanced
**Primary Skills Needed**: TypeScript/JavaScript, React, Financial Accounting

---

Good luck with your project! 🚀

---

## 📝 Implementation Log

### January 2, 2026 - Schedule 4: Direct Labor Budget Implementation

**Status**: ✅ COMPLETED

**Work Completed**:
1. **Type Definitions** (`budget-app/src/lib/types/budgets.ts`)
   - Created `LaborCategory` interface for multi-category labor inputs
   - Enhanced `DirectLabourBudgetInputs` with comprehensive optional fields:
     - Simple single-category approach (hours per unit + wage rate)
     - Multi-category approach (different labor types with individual rates)
     - Wage inflation tracking (quarterly)
     - Overtime management (threshold + multiplier)
     - Fringe benefits calculation
     - Productivity efficiency rate
     - Workforce planning (turnover rate, training costs, average hours per employee)
   - Created detailed `DirectLabourBudgetOutput` interface:
     - Support for both single and multi-category outputs
     - Regular vs overtime hours breakdown
     - Fringe benefit costs
     - Workforce metrics (FTE needed, turnover costs)
     - Efficiency metrics (cost per unit, productivity rate)

2. **Calculation Engine** (`budget-app/src/lib/calculations/04-directLaborBudget.ts`)
   - Implemented comprehensive validation:
     - Validates production units from Schedule 2
     - Ensures either simple OR multi-category inputs provided
     - Validates all optional parameters with appropriate warnings
   - Created two calculation approaches:
     - **Simple Method**: Single wage rate with optional overtime and efficiency adjustments
     - **Multi-Category Method**: Multiple labor types (e.g., Assembly, Finishing, QC) with individual rates
   - **Advanced Features Implemented**:
     - Wage inflation (compounding quarterly)
     - Overtime calculation (regular hours + premium for excess)
     - Fringe benefits (health insurance, FICA, workers comp)
     - Productivity efficiency adjustments
     - Workforce planning (FTE calculations, turnover costs)
   - Formatting function for display with proper number formatting and support for both approaches

3. **User Interface** (`budget-app/src/app/input/page.tsx`)
   - **Input Method Toggle**: Radio buttons to switch between simple and multi-category modes
   - **Simple Mode Form**:
     - Direct labor hours per unit
     - Hourly wage rate
   - **Multi-Category Mode Form**:
     - Dynamic labor category management (add/remove categories)
     - Category name, hours per unit, wage rate per category
   - **Optional Enhancements Section**:
     - Wage inflation rate (quarterly)
     - Fringe benefit rate
     - Productivity efficiency rate
     - Overtime threshold and multiplier
   - **Workforce Planning** (collapsible):
     - Average hours per employee
     - Annual turnover rate
     - Training cost per employee
   - **Results Display**:
     - Separate tables for each labor category (if multi-category)
     - Summary table with total direct labor
     - Analytics panel showing:
       - Labor cost per unit
       - Average employees needed (FTE)
       - Annual turnover & training cost
       - Productivity efficiency percentage
   - **Error Handling**: Separate display for errors and warnings
   - **CSV Export**: Full support for both simple and multi-category exports

**Formulas Implemented**:
```typescript
// Basic Formula
Total Direct-Labor Hours = Units to Produce × Hours per Unit
Total Direct-Labor Cost = Total Hours × Hourly Rate

// With Efficiency
Adjusted Hours = Standard Hours ÷ Efficiency Rate

// With Wage Inflation
Quarter N Wage = Base Wage × (1 + Inflation Rate)^N

// With Overtime
Regular Cost = Regular Hours × Wage Rate
Overtime Cost = Overtime Hours × Wage Rate × Multiplier
Total Labor Cost = Regular Cost + Overtime Cost

// With Fringe Benefits
Fringe Benefit Cost = Total Labor Cost × Benefit Rate
Total Cost Including Benefits = Labor Cost + Fringe Benefits

// Multi-Category
Total Cost = Sum(Category Hours × Category Rate) for all categories

// Workforce Planning
FTE Needed = Total Hours ÷ Hours per Employee
Turnover Cost = (FTE × Turnover Rate × Training Cost) per quarter
```

**Key Features**:
- ✅ Flexible input modes (simple vs multi-category)
- ✅ Comprehensive optional enhancements
- ✅ Wage inflation with compounding
- ✅ Overtime premium calculations
- ✅ Fringe benefit tracking
- ✅ Productivity efficiency adjustments
- ✅ Workforce planning metrics
- ✅ Full CSV export support
- ✅ Professional table display
- ✅ Analytics dashboard
- ✅ Validation with warnings

**Testing**: All calculations validated against formulas from Ronald W. Hilton's framework

**Deployment**: Successfully built and deployed to GitHub Pages

**Next Schedule**: Schedule 5 - Manufacturing Overhead Budget

---

### January 2, 2026 - Schedule 5: Manufacturing Overhead Budget Implementation

**Status**: ✅ COMPLETED

**Work Completed**:
1. **Type Definitions** (`budget-app/src/lib/types/budgets.ts`)
   - Created `OverheadCostCategory` interface for detailed overhead tracking
   - Enhanced `ManufacturingOverheadInputs` with comprehensive fields:
     - Simple traditional costing approach (variable/fixed rates)
     - Detailed category breakdown
     - Activity-Based Costing (ABC) approach
     - Allocation base options (units, labor hours, machine hours)
   - Added extensive ABC-specific fields:
     - Unit-level costs (vary with production units)
     - Batch-level costs (production runs, inspections, machine hours)
     - Product-level costs (engineering, product management)
     - Facility-level costs (rent, insurance, property taxes, utilities)
     - Indirect labor (supervisory and support staff salaries)
   - Created `ManufacturingOverheadOutput` interface:
     - Quarterly breakdown of variable/fixed overhead
     - Total overhead and cash disbursements (excludes depreciation)
     - Overhead per unit metrics
     - Predetermined overhead rate
     - Optional category details for ABC approach
   - Added `OverheadCategoryDetail` interface for ABC cost tracking

2. **Calculation Engine** (`budget-app/src/lib/calculations/05-manufacturingOverheadBudget.ts`)
   - Implemented comprehensive validation:
     - Validates production units from Schedule 2
     - Checks for at least one overhead input approach
     - Validates ABC inputs if ABC approach is selected
     - Provides warnings for optimal data completeness
   - Created three calculation approaches with intelligent routing:
     - **Simple Traditional Costing**: Variable rate per unit/labor hour + fixed overhead
     - **Detailed Category Method**: Granular tracking by overhead category
     - **Activity-Based Costing (ABC)**: Four-level cost hierarchy
   - **ABC Cost Hierarchy Implementation**:
     - Unit-level: Indirect materials, small tools, energy per unit
     - Batch-level: Production runs, inspections, machine hours
     - Product-level: Engineering changes, product management
     - Facility-level: Rent, insurance, taxes, depreciation, supervisory salaries
   - **Key Calculations**:
     - Variable overhead based on units or labor hours
     - Fixed overhead allocation across quarters
     - Non-cash items (depreciation) tracked separately
     - Cash disbursements = Total overhead - Depreciation
     - Overhead per unit = Total overhead ÷ Total units
     - Predetermined overhead rate = Budgeted overhead ÷ Cost driver level
   - Formatting function for display with proper number formatting

3. **User Interface** (`budget-app/src/app/input/page.tsx`)
   - **Approach Selection**: Radio toggle between Simple and ABC methods
   - **Simple Mode Form**:
     - Variable overhead rate per unit
     - Variable overhead rate per direct labor hour (uses Schedule 4 data)
     - Fixed overhead per quarter
     - Depreciation per quarter
     - Allocation base selector (units/labor hours/machine hours)
   - **ABC Mode Form**:
     - **Batch-Level Inputs**: Production runs by quarter with cost per run
     - **Advanced ABC Inputs** (collapsible details section):
       - Inspections: Quarterly counts + cost per inspection
       - Machine hours: Quarterly hours + cost per hour
       - Facility costs: Rent, insurance, property taxes
       - Utilities: Amount + variable/fixed classification
       - Indirect labor: Supervisory and support staff salaries
       - Unit-level costs: Indirect materials, small tools, energy per unit
       - Product-level costs: Engineering changes, product management
       - Other costs: Technology, warehouse, environmental compliance
   - **Results Display**:
     - Table showing variable overhead, fixed overhead, total overhead by quarter
     - Depreciation and cash disbursements rows
     - **Cost Metrics Panel**:
       - Overhead per unit (yearly average)
       - Predetermined overhead rate (based on allocation base)
   - **Error Handling**: Errors and warnings displayed separately
   - **CSV Export**: Full export with company/product headers
   - **Dependencies**: Automatically uses Schedule 2 (production units) and optionally Schedule 4 (labor hours)

**Formulas Implemented**:
```typescript
// Simple Traditional Costing
Variable Overhead = Units × Variable Rate per Unit
  OR
Variable Overhead = Labor Hours × Variable Rate per Hour
Fixed Overhead = Fixed Amount per Quarter
Total Manufacturing Overhead = Variable Overhead + Fixed Overhead
Cash Disbursements = Total Overhead − Depreciation

// Activity-Based Costing (ABC)
// Unit-Level Costs (vary with units produced)
Unit-Level = (Indirect Materials + Small Tools + Energy) × Units

// Batch-Level Costs (vary with production runs/batches)
Batch-Level = (Production Runs × Cost per Run) +
              (Inspections × Cost per Inspection) +
              (Machine Hours × Cost per Hour)

// Product-Level Costs (support specific products)
Product-Level = Engineering Changes + Product Management

// Facility-Level Costs (support entire facility)
Facility-Level = Rent + Insurance + Property Taxes +
                 Utilities + Supervisory Salaries + Depreciation

Total ABC Overhead = Unit-Level + Batch-Level + Product-Level + Facility-Level

// Performance Metrics
Overhead per Unit = Total Overhead ÷ Total Units Produced
Predetermined OH Rate = Budgeted Overhead ÷ Budgeted Cost Driver
  where Cost Driver = Units, Labor Hours, or Machine Hours
```

**Key Features**:
- ✅ Three calculation approaches (simple, detailed, ABC)
- ✅ Four-level ABC cost hierarchy
- ✅ Flexible allocation base (units/labor hours/machine hours)
- ✅ Non-cash items (depreciation) separated for cash planning
- ✅ Predetermined overhead rate calculation
- ✅ Integration with Schedule 2 (production) and Schedule 4 (labor)
- ✅ Comprehensive optional inputs for detailed analysis
- ✅ Professional table display with quarterly breakdown
- ✅ Cost metrics dashboard
- ✅ Full CSV export support
- ✅ Validation with helpful warnings

**Testing**:
- ✅ TypeScript compilation successful (no type errors)
- ✅ Build completed successfully
- ✅ All calculations validated against formulas from Ronald W. Hilton's framework
- ✅ Static site generation working

**Next Schedule**: Schedule 6 - Selling & Administrative Expense Budget

---

### January 2, 2026 - Schedule 6: Selling, General & Administrative (SG&A) Expense Budget Implementation

**Status**: ✅ COMPLETED

**Work Completed**:
1. **Type Definitions** (`budget-app/src/lib/types/budgets.ts`)
   - Created `SalesPersonnelCategory` interface for sales team tracking
   - Created `DistributionChannel` interface for multi-channel distribution
   - Created `DepartmentBudget` interface for departmental budgeting
   - Enhanced `SellingAdminExpenseInputs` with comprehensive fields:
     - Simple approach (percentage-based variable/fixed rates)
     - Detailed approach (line-by-line expense tracking)
     - Sales expenses (commissions, distribution, customer service)
     - Marketing expenses (advertising, brand development, campaigns)
     - Administrative expenses (salaries by department, occupancy, technology)
     - Professional services, travel, regulatory costs
     - Bad debt allowance and depreciation
   - Created comprehensive `SellingAdminExpenseOutput` interface:
     - Sales personnel breakdown (salaries, benefits, commissions)
     - Distribution costs by channel
     - Marketing expenses by category
     - Administrative expenses by department
     - Total variable/fixed/total SG&A
     - Cash disbursements (excludes depreciation)
     - Performance metrics (SG&A %, per-unit costs, expense ratios)

2. **Calculation Engine** (`budget-app/src/lib/calculations/06-sellingAdminExpenseBudget.ts`)
   - Implemented comprehensive validation:
     - Validates sales data from Schedule 1
     - Ensures either simple OR detailed approach selected
     - Validates sales personnel and distribution channels
     - Provides warnings for missing optional enhancements
   - Created two calculation approaches:
     - **Simple Method**: Percentage-based variable + fixed quarterly amounts
     - **Detailed Method**: Line-by-line expense tracking
   - **Selling Expenses Breakdown**:
     - Sales commissions (revenue-based or unit-based)
     - Sales personnel costs (salaries, benefits, commissions)
     - Distribution costs (variable per unit + fixed per quarter)
     - Customer service costs (salaries + warranty + returns)
     - Customer acquisition costs
   - **Marketing Expenses Breakdown**:
     - Advertising, brand development, campaigns
     - Market research, trade shows, content creation
   - **Administrative Expenses Breakdown**:
     - Salaries by department (executive, finance, HR, IT, legal, admin)
     - Occupancy costs (rent, utilities, insurance, taxes, maintenance)
     - Technology costs (software, cloud, telecom, IT support)
     - Office operations (supplies, postage, printing)
     - Professional services (legal, audit, consulting)
     - Professional development (training, certifications, conferences)
     - Travel and entertainment
     - Regulatory compliance (licenses, permits, insurance)
     - Bad debt expense (% of sales)
     - Depreciation (non-cash)
   - **Performance Metrics**:
     - SG&A as % of sales
     - Variable/Fixed SG&A per unit
     - Marketing as % of sales
     - Sales and admin expense ratios
   - Formatting function for display with conditional row display

3. **User Interface** (`budget-app/src/app/input/page.tsx`)
   - **Approach Selection**: Radio toggle between Simple and Detailed
   - **Simple Approach Form**:
     - Variable selling expense rate (% of sales)
     - Variable admin expense rate (% of sales)
     - Fixed selling expense per quarter
     - Fixed admin expense per quarter
   - **Detailed Approach Form**:
     - **Selling Expenses Section**:
       - Commission rate (% of revenue)
       - Distribution cost per unit
       - Distribution fixed cost per quarter
       - Customer service salaries
       - Warranty expense per unit
     - **Marketing Expenses Section**:
       - Advertising budget per quarter
       - Brand development per quarter
       - Marketing campaigns per quarter
     - **Administrative Expenses Section**:
       - Executive, finance, HR, IT salaries
       - Office rent and utilities
       - Software licenses and telecommunications
       - Office supplies and legal fees
       - Bad debt rate (% of sales)
       - Depreciation - office equipment
   - **Results Display**:
     - Table with selling, marketing, and administrative expense sections
     - Total SG&A expenses and cash disbursements
     - **Metrics Panel**:
       - SG&A as % of sales (yearly)
       - Variable SG&A per unit
       - Total SG&A per unit
   - **Error Handling**: Separate display for errors and warnings
   - **CSV Export**: Full export with all expense categories
   - **Dependencies**: Automatically uses Schedule 1 (sales revenue and units)

**Formulas Implemented**:
```typescript
// Simple Approach
Variable SG&A = Sales Revenue × (Variable Selling Rate + Variable Admin Rate)
Fixed SG&A = Fixed Selling per Quarter + Fixed Admin per Quarter
Total SG&A = Variable SG&A + Fixed SG&A

// Detailed Approach - Selling Expenses
Sales Commissions = Sales Revenue × Commission Rate
Distribution Variable = Units Sold × Cost per Unit
Distribution Fixed = Fixed Cost per Quarter
Customer Service = Salaries + (Units × Warranty Rate) + (Units × Return Processing)
Total Variable Selling = Commissions + Distribution Variable + Unit-Based Costs
Total Fixed Selling = Salaries + Benefits + Distribution Fixed + Customer Service Salaries

// Marketing Expenses (all fixed per quarter)
Total Marketing = Advertising + Brand Development + Campaigns + Research + Events + Content

// Administrative Expenses
Administrative Salaries = Executive + Finance + HR + IT + Legal + General Admin
Occupancy = Rent + Utilities + Insurance + Taxes + Maintenance
Technology = Software + Cloud + Telecom + IT Support
Office Ops = Supplies + Postage + Printing
Professional Services = Legal + Audit + Consulting
Bad Debt Expense = Sales Revenue × Bad Debt Rate
Total Fixed Admin = Salaries + Occupancy + Technology + Ops + Services + Development + Travel + Compliance + Depreciation

// Overall Totals
Total Variable SG&A = Variable Selling + Bad Debt
Total Fixed SG&A = Fixed Selling + Marketing + Fixed Admin
Total SG&A = Variable SG&A + Fixed SG&A
Cash Disbursements = Total SG&A − Depreciation

// Performance Metrics
SG&A as % of Sales = Total SG&A ÷ Sales Revenue
Variable SG&A per Unit = Variable SG&A ÷ Units Sold
Total SG&A per Unit = Total SG&A ÷ Units Sold
Marketing as % of Sales = Marketing ÷ Sales Revenue
Sales Expense Ratio = Selling Expenses ÷ Sales Revenue
Admin Expense Ratio = Admin Expenses ÷ Sales Revenue
```

**Key Features**:
- ✅ Two calculation approaches (simple percentage-based, detailed line-by-line)
- ✅ Comprehensive expense categories (selling, marketing, administrative)
- ✅ Sales commission tracking (revenue-based or unit-based)
- ✅ Distribution cost management (variable + fixed)
- ✅ Marketing budget allocation by category
- ✅ Administrative expense tracking by department
- ✅ Bad debt allowance calculation
- ✅ Depreciation tracking (excluded from cash disbursements)
- ✅ Performance metrics and expense ratios
- ✅ Integration with Schedule 1 (sales data)
- ✅ Professional table display with expense breakdowns
- ✅ Metrics dashboard with key SG&A ratios
- ✅ Full CSV export support
- ✅ Validation with helpful warnings

**Testing**:
- ✅ TypeScript compilation successful (no type errors)
- ✅ Build completed successfully
- ✅ All calculations validated against formulas from Ronald W. Hilton's framework
- ✅ Static site generation working

**Next Schedule**: Schedule 7 - Cash Receipts Budget (or continue with remaining schedules 7-13)
