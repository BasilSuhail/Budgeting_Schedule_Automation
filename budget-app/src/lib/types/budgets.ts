/**
 * Type definitions for Budget Automation System
 * Based on Ronald W. Hilton's 13-Schedule Master Budget Framework
 */

// ============================================================================
// QUARTERLY DATA STRUCTURE
// ============================================================================

export interface QuarterlyData {
  q1: number;  // Quarter 1 (Oct-Dec)
  q2: number;  // Quarter 2 (Jan-Mar)
  q3: number;  // Quarter 3 (Apr-Jun)
  q4: number;  // Quarter 4 (Jul-Sep)
  yearly: number;  // Total for the year
}

// ============================================================================
// COMPANY INFORMATION
// ============================================================================

export interface CompanyInfo {
  name: string;
  industry: string;  // e.g., "Sugar Manufacturing", "Textile", "Food Processing"
  productName: string;  // e.g., "Sugar", "Fabric", "Flour"
  fiscalYearStart: string;  // e.g., "2024-10-01"
  currency: string;  // e.g., "PKR", "USD"
}

// ============================================================================
// 1. SALES BUDGET INPUTS
// ============================================================================

export interface SalesBudgetInputs {
  // Historical sales data (optional - for reference)
  historicalSalesUnits?: QuarterlyData;

  // Forecasted sales for budget year
  forecastedSalesUnits: QuarterlyData;  // In metric tons, units, etc.

  // Pricing information
  sellingPricePerUnit: number;  // Base selling price
  priceInflationRate?: number;  // Expected price increase (e.g., 0.05 for 5%)

  // Growth assumptions
  salesGrowthRate?: number;  // Expected sales volume growth

  // Cash vs Credit Sales (for Cash Receipts Budget - Schedule 8)
  cashSalesPercentage?: number;  // % of sales collected as cash (e.g., 0.40 for 40%)
  creditSalesPercentage?: number;  // % of sales on account (e.g., 0.60 for 60%)
}

// ============================================================================
// 2. PRODUCTION BUDGET INPUTS
// ============================================================================

export interface ProductionBudgetInputs {
  // Sales forecast (from Schedule 1)
  forecastedSalesUnits: QuarterlyData;

  // Inventory policy
  beginningInventory: number;  // Opening inventory (metric tons)
  desiredEndingInventoryRatio: number;  // e.g., 0.10 for 10% of next quarter's sales

  // For Q4, ending inventory for next year's Q1
  nextYearQ1ForecastedSales?: number;

  // Production capacity constraints (optional)
  maxProductionCapacityPerQuarter?: number;

  // Batch size requirements (optional)
  minimumBatchSize?: number;
  optimalBatchSize?: number;

  // Lead time adjustments (optional)
  productionLeadTimeDays?: number;

  // Inventory cost analysis (optional)
  inventoryCarryingCostPerUnit?: number;  // Cost to hold one unit for one quarter

  // Just-in-Time (JIT) settings (optional)
  useJIT?: boolean;  // If true, production = sales with minimal inventory

  // Obsolescence risk (optional)
  productShelfLifeDays?: number;
  obsolescenceRiskPercentage?: number;  // % of inventory expected to become obsolete
}

// ============================================================================
// 3. DIRECT MATERIAL BUDGET INPUTS
// ============================================================================

export interface MaterialType {
  name: string;  // e.g., "Tent Fabric", "Tent Poles"
  requiredPerUnit: number;  // Quantity per finished product
  costPerUnit: number;  // Purchase price per unit
  beginningInventory: number;  // Opening inventory balance
  desiredEndingInventoryRatio: number;  // % of next quarter's production needs
  unit: string;  // e.g., "yards", "kits", "pounds"

  // Optional enhancements
  scrapWastePercentage?: number;  // % of material lost to waste (e.g., 0.05 for 5%)
  supplierLeadTimeDays?: number;  // Days from order to delivery
  useJIT?: boolean;  // Just-in-Time delivery (no ending inventory needed)
  priceInflationRate?: number;  // Expected price increase per quarter
  bulkDiscountThreshold?: number;  // Quantity for discount
  bulkDiscountRate?: number;  // Discount % if threshold met
}

export interface DirectMaterialBudgetInputs {
  // Production requirements (from Schedule 2)
  unitsToBeProduced: QuarterlyData;
  nextYearQ1Production?: number;  // For Q4 ending inventory calculation

  // Material types
  materials: MaterialType[];  // Can have multiple materials (fabric, poles, etc.)

  // Optional: Overall payment terms (for cash disbursements)
  percentPaidInCurrentQuarter?: number;  // e.g., 0.60 for 60% paid in same quarter
  percentPaidInNextQuarter?: number;  // e.g., 0.40 for 40% paid next quarter

  // Optional: Vendor performance tracking
  trackVendorMetrics?: boolean;
  targetOnTimeDeliveryRate?: number;  // e.g., 0.95 for 95%
  targetQualityRate?: number;  // e.g., 0.98 for 98% defect-free
}

// ============================================================================
// 4. DIRECT LABOUR BUDGET INPUTS
// ============================================================================

export interface DirectLabourBudgetInputs {
  // Labour requirements
  labourHoursPerUnit: number;  // Hours needed per unit of production

  // Labour rates
  wageRatePerHour: number;  // Wage per hour
  wageInflationRate?: number;
}

// ============================================================================
// 5. MANUFACTURING OVERHEAD BUDGET INPUTS
// ============================================================================

export interface ManufacturingOverheadInputs {
  // Variable overhead
  variableOverheadRatePerUnit?: number;  // Variable OH per unit produced
  variableOverheadRatePerLabourHour?: number;  // Variable OH per DL hour

  // Fixed overhead (quarterly amounts)
  fixedOverheadPerQuarter: number;

  // Depreciation (non-cash expense)
  depreciationPerQuarter: number;
}

// ============================================================================
// 6. SELLING & ADMINISTRATIVE EXPENSE BUDGET INPUTS
// ============================================================================

export interface SellingAdminExpenseInputs {
  // Variable expenses (as % of sales or per unit)
  variableSellingExpenseRate?: number;  // e.g., 0.05 for 5% of sales
  variableAdminExpenseRate?: number;

  // Fixed expenses (quarterly)
  fixedSellingExpensePerQuarter: number;
  fixedAdminExpensePerQuarter: number;

  // Distribution costs
  distributionCostPerUnit?: number;
}

// ============================================================================
// 7. CASH RECEIPTS BUDGET INPUTS
// ============================================================================

export interface CashReceiptsInputs {
  // Collection policy
  percentCollectedInSameQuarter: number;  // e.g., 0.70 for 70%
  percentCollectedInNextQuarter: number;  // e.g., 0.28 for 28%
  percentUncollectible?: number;  // e.g., 0.02 for 2% bad debt

  // Beginning accounts receivable
  beginningAccountsReceivable: number;
}

// ============================================================================
// 8. CASH DISBURSEMENT BUDGET INPUTS
// ============================================================================

export interface CashDisbursementInputs {
  // Payment policies (already covered in other sections)
  // This section will pull from other budgets

  // Additional cash expenses
  incomeTaxPayments?: QuarterlyData;
  dividendPayments?: QuarterlyData;
  capitalExpenditures?: QuarterlyData;
  loanPayments?: QuarterlyData;
}

// ============================================================================
// 9. CASH BUDGET INPUTS
// ============================================================================

export interface CashBudgetInputs {
  // Beginning cash balance
  beginningCashBalance: number;

  // Cash policy
  minimumCashBalance: number;  // Desired minimum cash

  // Financing
  interestRateOnBorrowing?: number;  // e.g., 0.08 for 8% annual
  interestRateOnInvestments?: number;
}

// ============================================================================
// 10. BALANCE SHEET INPUTS
// ============================================================================

export interface BalanceSheetInputs {
  // Beginning balance sheet items
  beginningCash: number;
  beginningAccountsReceivable: number;
  beginningInventoryRawMaterial: number;
  beginningInventoryFinishedGoods: number;
  beginningFixedAssets: number;
  beginningAccumulatedDepreciation: number;

  beginningAccountsPayable: number;
  beginningLongTermDebt: number;
  beginningCommonStock: number;
  beginningRetainedEarnings: number;
}

// ============================================================================
// COMPREHENSIVE BUDGET INPUTS (All together)
// ============================================================================

export interface ComprehensiveBudgetInputs {
  company: CompanyInfo;
  salesBudget: SalesBudgetInputs;
  productionBudget: ProductionBudgetInputs;
  directMaterial: DirectMaterialBudgetInputs;
  directLabour: DirectLabourBudgetInputs;
  manufacturingOverhead: ManufacturingOverheadInputs;
  sellingAdmin: SellingAdminExpenseInputs;
  cashReceipts: CashReceiptsInputs;
  cashDisbursement: CashDisbursementInputs;
  cashBudget: CashBudgetInputs;
  balanceSheet: BalanceSheetInputs;
}

// ============================================================================
// OUTPUT TYPES FOR EACH SCHEDULE
// ============================================================================

export interface SalesBudgetOutput {
  salesUnits: QuarterlyData;
  sellingPrice: QuarterlyData;  // Can vary by quarter if inflation applied
  salesRevenue: QuarterlyData;
  cashSales?: QuarterlyData;  // Cash portion of sales revenue
  creditSales?: QuarterlyData;  // Credit portion of sales revenue
}

export interface ProductionBudgetOutput {
  salesUnits: QuarterlyData;
  desiredEndingInventory: QuarterlyData;
  totalUnitsRequired: QuarterlyData;
  beginningInventory: QuarterlyData;
  requiredProduction: QuarterlyData;

  // Enhanced analytics (optional)
  capacityUtilization?: QuarterlyData;  // % of max capacity used
  inventoryCarryingCost?: QuarterlyData;  // Cost to hold inventory
  batchAdjustments?: QuarterlyData;  // Production adjusted for batch sizes
  obsolescenceCost?: QuarterlyData;  // Expected cost from obsolescence
  productionEfficiency?: QuarterlyData;  // Ratio of optimal production
}

export interface MaterialBudgetDetail {
  name: string;
  unit: string;
  productionNeeds: QuarterlyData;  // Units to be produced
  materialRequiredForProduction: QuarterlyData;  // Material needed for production
  desiredEndingInventory: QuarterlyData;  // Target ending inventory
  totalMaterialRequired: QuarterlyData;  // Production needs + ending inventory
  beginningInventory: QuarterlyData;  // Opening inventory
  materialToBePurchased: QuarterlyData;  // Units to purchase
  costPerUnit: QuarterlyData;  // Unit cost (can vary with inflation/discounts)
  totalPurchaseCost: QuarterlyData;  // Total cost of purchases

  // Optional analytics
  scrapWasteCost?: QuarterlyData;
  bulkDiscountSavings?: QuarterlyData;
  inventoryTurnoverRatio?: number;  // Annual turnover
  daysInventoryOutstanding?: number;  // Average days of inventory
}

export interface DirectMaterialBudgetOutput {
  materials: MaterialBudgetDetail[];  // Detailed breakdown by material type
  totalMaterialPurchaseCost: QuarterlyData;  // Sum of all materials
  cashDisbursements?: QuarterlyData;  // Payment schedule

  // Optional analytics
  totalScrapWasteCost?: QuarterlyData;
  totalBulkDiscountSavings?: QuarterlyData;
  overallInventoryTurnover?: number;
  criticalMaterials?: string[];  // Materials at risk of shortage
}

export interface DirectLabourBudgetOutput {
  productionUnits: QuarterlyData;
  labourHoursRequired: QuarterlyData;
  labourRate: QuarterlyData;
  labourCost: QuarterlyData;
}

export interface ManufacturingOverheadOutput {
  variableOverhead: QuarterlyData;
  fixedOverhead: QuarterlyData;
  totalOverhead: QuarterlyData;
  depreciation: QuarterlyData;
  cashDisbursements: QuarterlyData;  // Total OH minus depreciation
}

export interface SellingAdminExpenseOutput {
  variableExpenses: QuarterlyData;
  fixedExpenses: QuarterlyData;
  totalExpenses: QuarterlyData;
}

export interface CashReceiptsOutput {
  salesRevenue: QuarterlyData;
  collectionsSameQuarter: QuarterlyData;
  collectionsNextQuarter: QuarterlyData;
  totalCashReceipts: QuarterlyData;
  endingAccountsReceivable: QuarterlyData;
}

export interface CashDisbursementOutput {
  materialPayments: QuarterlyData;
  labourPayments: QuarterlyData;
  overheadPayments: QuarterlyData;
  sellingAdminPayments: QuarterlyData;
  otherPayments: QuarterlyData;
  totalDisbursements: QuarterlyData;
}

export interface CashBudgetOutput {
  beginningCash: QuarterlyData;
  cashReceipts: QuarterlyData;
  cashAvailable: QuarterlyData;
  cashDisbursements: QuarterlyData;
  excessOrDeficiency: QuarterlyData;
  financing: QuarterlyData;  // Borrowing or repayments
  endingCash: QuarterlyData;
}

export interface COGSOutput {
  beginningInventory: number;
  directMaterial: number;
  directLabour: number;
  manufacturingOverhead: number;
  totalManufacturingCost: number;
  endingInventory: number;
  costOfGoodsSold: number;
}

export interface IncomeStatementOutput {
  salesRevenue: number;
  costOfGoodsSold: number;
  grossMargin: number;
  sellingAdminExpenses: number;
  operatingIncome: number;
  interestExpense: number;
  netIncome: number;
}

export interface BalanceSheetOutput {
  // Assets
  cash: number;
  accountsReceivable: number;
  inventoryRawMaterial: number;
  inventoryFinishedGoods: number;
  totalCurrentAssets: number;
  fixedAssets: number;
  accumulatedDepreciation: number;
  netFixedAssets: number;
  totalAssets: number;

  // Liabilities
  accountsPayable: number;
  totalCurrentLiabilities: number;
  longTermDebt: number;
  totalLiabilities: number;

  // Equity
  commonStock: number;
  retainedEarnings: number;
  totalEquity: number;
  totalLiabilitiesAndEquity: number;
}

export interface CashFlowStatementOutput {
  // Operating activities
  netIncome: number;
  depreciation: number;
  changeInAccountsReceivable: number;
  changeInInventory: number;
  changeInAccountsPayable: number;
  cashFromOperations: number;

  // Investing activities
  capitalExpenditures: number;
  cashFromInvesting: number;

  // Financing activities
  debtProceeds: number;
  debtRepayments: number;
  dividendsPaid: number;
  cashFromFinancing: number;

  // Net change
  netChangeInCash: number;
  beginningCash: number;
  endingCash: number;
}

// ============================================================================
// COMPLETE BUDGET OUTPUT (All 13 Schedules + Cash Flow)
// ============================================================================

export interface CompleteBudgetOutput {
  salesBudget: SalesBudgetOutput;
  productionBudget: ProductionBudgetOutput;
  directMaterialBudget: DirectMaterialBudgetOutput;
  directLabourBudget: DirectLabourBudgetOutput;
  manufacturingOverhead: ManufacturingOverheadOutput;
  sellingAdminExpense: SellingAdminExpenseOutput;
  cashReceipts: CashReceiptsOutput;
  cashDisbursement: CashDisbursementOutput;
  cashBudget: CashBudgetOutput;
  cogs: COGSOutput;
  incomeStatement: IncomeStatementOutput;
  balanceSheet: BalanceSheetOutput;
  cashFlowStatement: CashFlowStatementOutput;
}
