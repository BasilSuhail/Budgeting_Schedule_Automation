/**
 * SCHEDULE 1: SALES BUDGET
 *
 * Based on Ronald W. Hilton's "Managerial Accounting" Chapter 9
 *
 * Purpose: The sales budget is the starting point for the master budget.
 * It shows the expected sales revenue for each quarter and the entire year.
 *
 * Formula:
 * Sales Revenue = Expected Sales Units × Selling Price per Unit
 *
 * The sales forecast incorporates:
 * - Historical sales trends
 * - General economic conditions
 * - Industry trends
 * - Competitive factors
 * - Planned marketing activities
 * - Price changes
 */

import type { SalesBudgetInputs, SalesBudgetOutput, QuarterlyData } from '../types/budgets';

export function calculateSalesBudget(inputs: SalesBudgetInputs): SalesBudgetOutput {
  const { forecastedSalesUnits, sellingPricePerUnit, priceInflationRate = 0 } = inputs;

  // Calculate selling price for each quarter (with inflation if applicable)
  const sellingPrice: QuarterlyData = {
    q1: sellingPricePerUnit,
    q2: sellingPricePerUnit * (1 + priceInflationRate / 4), // Quarterly inflation
    q3: sellingPricePerUnit * (1 + (priceInflationRate / 4) * 2),
    q4: sellingPricePerUnit * (1 + (priceInflationRate / 4) * 3),
    yearly: 0, // Will calculate weighted average
  };

  // Calculate weighted average selling price for the year
  const totalUnits = forecastedSalesUnits.yearly;
  sellingPrice.yearly = totalUnits > 0
    ? (
        (forecastedSalesUnits.q1 * sellingPrice.q1) +
        (forecastedSalesUnits.q2 * sellingPrice.q2) +
        (forecastedSalesUnits.q3 * sellingPrice.q3) +
        (forecastedSalesUnits.q4 * sellingPrice.q4)
      ) / totalUnits
    : sellingPricePerUnit;

  // Calculate sales revenue for each quarter
  const salesRevenue: QuarterlyData = {
    q1: forecastedSalesUnits.q1 * sellingPrice.q1,
    q2: forecastedSalesUnits.q2 * sellingPrice.q2,
    q3: forecastedSalesUnits.q3 * sellingPrice.q3,
    q4: forecastedSalesUnits.q4 * sellingPrice.q4,
    yearly: 0, // Will sum up
  };

  // Calculate yearly total revenue
  salesRevenue.yearly = salesRevenue.q1 + salesRevenue.q2 + salesRevenue.q3 + salesRevenue.q4;

  return {
    salesUnits: forecastedSalesUnits,
    sellingPrice,
    salesRevenue,
  };
}

/**
 * Helper function to validate sales budget inputs
 */
export function validateSalesBudgetInputs(inputs: SalesBudgetInputs): string[] {
  const errors: string[] = [];

  // Validate sales units
  if (inputs.forecastedSalesUnits.q1 < 0) errors.push('Q1 sales units cannot be negative');
  if (inputs.forecastedSalesUnits.q2 < 0) errors.push('Q2 sales units cannot be negative');
  if (inputs.forecastedSalesUnits.q3 < 0) errors.push('Q3 sales units cannot be negative');
  if (inputs.forecastedSalesUnits.q4 < 0) errors.push('Q4 sales units cannot be negative');

  // Validate selling price
  if (inputs.sellingPricePerUnit <= 0) {
    errors.push('Selling price must be greater than zero');
  }

  // Validate inflation rate if provided
  if (inputs.priceInflationRate !== undefined) {
    if (inputs.priceInflationRate < -1) {
      errors.push('Price inflation rate cannot be less than -100%');
    }
    if (inputs.priceInflationRate > 2) {
      errors.push('Price inflation rate seems unrealistic (over 200%)');
    }
  }

  // Check that yearly totals make sense
  const calculatedYearly =
    inputs.forecastedSalesUnits.q1 +
    inputs.forecastedSalesUnits.q2 +
    inputs.forecastedSalesUnits.q3 +
    inputs.forecastedSalesUnits.q4;

  if (Math.abs(calculatedYearly - inputs.forecastedSalesUnits.yearly) > 0.01) {
    errors.push(
      `Yearly total (${inputs.forecastedSalesUnits.yearly}) does not match sum of quarters (${calculatedYearly})`
    );
  }

  return errors;
}

/**
 * Helper function to format sales budget output for display
 */
export function formatSalesBudgetForDisplay(output: SalesBudgetOutput) {
  return {
    headers: ['', 'Q1 (Oct-Dec)', 'Q2 (Jan-Mar)', 'Q3 (Apr-Jun)', 'Q4 (Jul-Sep)', 'Yearly Total'],
    rows: [
      {
        label: 'Expected Sales (Units)',
        q1: output.salesUnits.q1.toFixed(2),
        q2: output.salesUnits.q2.toFixed(2),
        q3: output.salesUnits.q3.toFixed(2),
        q4: output.salesUnits.q4.toFixed(2),
        yearly: output.salesUnits.yearly.toFixed(2),
      },
      {
        label: 'Selling Price per Unit',
        q1: output.sellingPrice.q1.toFixed(2),
        q2: output.sellingPrice.q2.toFixed(2),
        q3: output.sellingPrice.q3.toFixed(2),
        q4: output.sellingPrice.q4.toFixed(2),
        yearly: output.sellingPrice.yearly.toFixed(2),
      },
      {
        label: 'Sales Revenue',
        q1: output.salesRevenue.q1.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        q2: output.salesRevenue.q2.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        q3: output.salesRevenue.q3.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        q4: output.salesRevenue.q4.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        yearly: output.salesRevenue.yearly.toLocaleString('en-US', { minimumFractionDigits: 2 }),
      },
    ],
  };
}
