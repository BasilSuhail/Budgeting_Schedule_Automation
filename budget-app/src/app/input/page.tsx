'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateSalesBudget, validateSalesBudgetInputs, formatSalesBudgetForDisplay } from '@/lib/calculations/01-salesBudget';
import { calculateProductionBudget, validateProductionBudgetInputs, formatProductionBudgetForDisplay } from '@/lib/calculations/02-productionBudget';
import { calculateDirectMaterialBudget, validateDirectMaterialBudgetInputs, formatDirectMaterialBudgetForDisplay } from '@/lib/calculations/03-directMaterialBudget';
import { calculateDirectLaborBudget, validateDirectLaborBudgetInputs, formatDirectLaborBudgetForDisplay } from '@/lib/calculations/04-directLaborBudget';
import { calculateManufacturingOverheadBudget, validateManufacturingOverheadInputs, formatManufacturingOverheadBudgetForDisplay } from '@/lib/calculations/05-manufacturingOverheadBudget';
import { calculateSellingAdminExpenseBudget, validateSellingAdminExpenseInputs, formatSellingAdminExpenseBudgetForDisplay } from '@/lib/calculations/06-sellingAdminExpenseBudget';
import type { SalesBudgetInputs, ProductionBudgetInputs, DirectMaterialBudgetInputs, DirectLabourBudgetInputs, ManufacturingOverheadInputs, SellingAdminExpenseInputs, MaterialType, LaborCategory, OverheadCostCategory, SalesPersonnelCategory, DistributionChannel, DepartmentBudget } from '@/lib/types/budgets';

export default function InputPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [currency, setCurrency] = useState('');
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString());
  const [assumptions, setAssumptions] = useState('');

  // Prior year sales (optional)
  const [priorQ1Sales, setPriorQ1Sales] = useState('');
  const [priorQ2Sales, setPriorQ2Sales] = useState('');
  const [priorQ3Sales, setPriorQ3Sales] = useState('');
  const [priorQ4Sales, setPriorQ4Sales] = useState('');

  // Current year forecast
  const [q1Sales, setQ1Sales] = useState('');
  const [q2Sales, setQ2Sales] = useState('');
  const [q3Sales, setQ3Sales] = useState('');
  const [q4Sales, setQ4Sales] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [inflationRate, setInflationRate] = useState('0');
  const [priceAdjustment, setPriceAdjustment] = useState<'constant' | 'inflation'>('inflation');

  // Cash vs Credit Sales
  const [cashSalesPercentage, setCashSalesPercentage] = useState('');
  const [creditSalesPercentage, setCreditSalesPercentage] = useState('');

  // Growth rate calculator
  const [growthRate, setGrowthRate] = useState('');

  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Schedule 2: Production Budget state
  const [beginningInventory, setBeginningInventory] = useState('');
  const [endingInventoryRatio, setEndingInventoryRatio] = useState('');
  const [nextYearQ1Sales, setNextYearQ1Sales] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [minBatchSize, setMinBatchSize] = useState('');
  const [optimalBatchSize, setOptimalBatchSize] = useState('');
  const [carryingCost, setCarryingCost] = useState('');
  const [useJIT, setUseJIT] = useState(false);
  const [obsolescenceRisk, setObsolescenceRisk] = useState('');

  const [productionResult, setProductionResult] = useState<any>(null);
  const [productionErrors, setProductionErrors] = useState<string[]>([]);

  // Schedule 3: Direct Material Budget state
  const [materials, setMaterials] = useState<MaterialType[]>([
    {
      name: '',
      requiredPerUnit: 0,
      costPerUnit: 0,
      beginningInventory: 0,
      desiredEndingInventoryRatio: 0,
      unit: '',
    },
  ]);
  const [nextYearQ1Production, setNextYearQ1Production] = useState('');
  const [percentPaidCurrentQuarter, setPercentPaidCurrentQuarter] = useState('');
  const [percentPaidNextQuarter, setPercentPaidNextQuarter] = useState('');

  const [materialResult, setMaterialResult] = useState<any>(null);
  const [materialErrors, setMaterialErrors] = useState<string[]>([]);

  // Schedule 4: Direct Labor Budget state
  const [useSimpleLaborInput, setUseSimpleLaborInput] = useState(true);
  const [directLaborHoursPerUnit, setDirectLaborHoursPerUnit] = useState('');
  const [hourlyWageRate, setHourlyWageRate] = useState('');
  const [laborCategories, setLaborCategories] = useState<LaborCategory[]>([
    {
      name: '',
      hoursPerUnit: 0,
      wageRatePerHour: 0,
    },
  ]);
  const [wageInflationRate, setWageInflationRate] = useState('');
  const [overtimeThreshold, setOvertimeThreshold] = useState('');
  const [overtimeMultiplier, setOvertimeMultiplier] = useState('1.5');
  const [fringeBenefitRate, setFringeBenefitRate] = useState('');
  const [productivityEfficiencyRate, setProductivityEfficiencyRate] = useState('');
  const [turnoverRate, setTurnoverRate] = useState('');
  const [trainingCostPerEmployee, setTrainingCostPerEmployee] = useState('');
  const [averageHoursPerEmployee, setAverageHoursPerEmployee] = useState('');

  const [laborResult, setLaborResult] = useState<any>(null);
  const [laborErrors, setLaborErrors] = useState<string[]>([]);

  // Schedule 5: Manufacturing Overhead Budget state
  const [overheadApproach, setOverheadApproach] = useState<'simple' | 'detailed' | 'abc'>('simple');

  // Simple approach fields
  const [variableOverheadRatePerUnit, setVariableOverheadRatePerUnit] = useState('');
  const [variableOverheadRatePerLaborHour, setVariableOverheadRatePerLaborHour] = useState('');
  const [fixedOverheadPerQuarter, setFixedOverheadPerQuarter] = useState('');
  const [depreciationPerQuarter, setDepreciationPerQuarter] = useState('');
  const [allocationBase, setAllocationBase] = useState<'units' | 'labor-hours' | 'machine-hours'>('units');

  // Detailed categories approach
  const [overheadCategories, setOverheadCategories] = useState<OverheadCostCategory[]>([
    {
      name: '',
      costType: 'variable',
      amount: 0,
      costDriver: 'units',
    },
  ]);

  // ABC approach fields
  const [useActivityBasedCosting, setUseActivityBasedCosting] = useState(false);
  const [productionRunsQ1, setProductionRunsQ1] = useState('');
  const [productionRunsQ2, setProductionRunsQ2] = useState('');
  const [productionRunsQ3, setProductionRunsQ3] = useState('');
  const [productionRunsQ4, setProductionRunsQ4] = useState('');
  const [costPerProductionRun, setCostPerProductionRun] = useState('');
  const [inspectionsQ1, setInspectionsQ1] = useState('');
  const [inspectionsQ2, setInspectionsQ2] = useState('');
  const [inspectionsQ3, setInspectionsQ3] = useState('');
  const [inspectionsQ4, setInspectionsQ4] = useState('');
  const [costPerInspection, setCostPerInspection] = useState('');
  const [machineHoursQ1, setMachineHoursQ1] = useState('');
  const [machineHoursQ2, setMachineHoursQ2] = useState('');
  const [machineHoursQ3, setMachineHoursQ3] = useState('');
  const [machineHoursQ4, setMachineHoursQ4] = useState('');
  const [costPerMachineHour, setCostPerMachineHour] = useState('');

  // Facility costs
  const [facilityRent, setFacilityRent] = useState('');
  const [facilityInsurance, setFacilityInsurance] = useState('');
  const [propertyTaxes, setPropertyTaxes] = useState('');
  const [utilities, setUtilities] = useState('');
  const [utilitiesIsVariable, setUtilitiesIsVariable] = useState(false);

  // Indirect labor
  const [supervisorySalaries, setSupervisorySalaries] = useState('');
  const [supportStaffSalaries, setSupportStaffSalaries] = useState('');

  // Supplies and materials
  const [indirectMaterialsPerUnit, setIndirectMaterialsPerUnit] = useState('');
  const [shopSuppliesPerQuarter, setShopSuppliesPerQuarter] = useState('');

  // Maintenance
  const [plannedMaintenancePerQuarter, setPlannedMaintenancePerQuarter] = useState('');
  const [maintenancePerMachineHour, setMaintenancePerMachineHour] = useState('');

  // Quality control
  const [qualityControlPerUnit, setQualityControlPerUnit] = useState('');
  const [qualityControlLabor, setQualityControlLabor] = useState('');

  // Other costs
  const [technologyCosts, setTechnologyCosts] = useState('');
  const [warehouseCosts, setWarehouseCosts] = useState('');
  const [environmentalComplianceCosts, setEnvironmentalComplianceCosts] = useState('');

  const [overheadResult, setOverheadResult] = useState<any>(null);
  const [overheadErrors, setOverheadErrors] = useState<string[]>([]);

  // Schedule 6: SG&A Expense Budget state
  const [sgaApproach, setSgaApproach] = useState<'simple' | 'detailed'>('simple');

  // Simple approach
  const [useSimpleSGA, setUseSimpleSGA] = useState(true);
  const [variableSellingExpenseRate, setVariableSellingExpenseRate] = useState('');
  const [variableAdminExpenseRate, setVariableAdminExpenseRate] = useState('');
  const [fixedSellingExpensePerQuarter, setFixedSellingExpensePerQuarter] = useState('');
  const [fixedAdminExpensePerQuarter, setFixedAdminExpensePerQuarter] = useState('');

  // Detailed approach - Selling Expenses
  const [commissionRate, setCommissionRate] = useState('');
  const [commissionPerUnit, setCommissionPerUnit] = useState('');
  const [distributionCostPerUnit, setDistributionCostPerUnit] = useState('');
  const [distributionFixedCostPerQuarter, setDistributionFixedCostPerQuarter] = useState('');
  const [customerServiceSalaries, setCustomerServiceSalaries] = useState('');
  const [warrantyExpensePerUnit, setWarrantyExpensePerUnit] = useState('');

  // Marketing Expenses
  const [advertisingBudgetPerQuarter, setAdvertisingBudgetPerQuarter] = useState('');
  const [brandDevelopmentPerQuarter, setBrandDevelopmentPerQuarter] = useState('');
  const [marketingCampaignsPerQuarter, setMarketingCampaignsPerQuarter] = useState('');

  // Administrative Expenses
  const [executiveSalaries, setExecutiveSalaries] = useState('');
  const [financeSalaries, setFinanceSalaries] = useState('');
  const [hrSalaries, setHrSalaries] = useState('');
  const [itSalaries, setItSalaries] = useState('');

  // Occupancy costs
  const [officeRentPerQuarter, setOfficeRentPerQuarter] = useState('');
  const [utilitiesPerQuarter, setUtilitiesPerQuarter] = useState('');

  // Technology costs
  const [softwareLicensesPerQuarter, setSoftwareLicensesPerQuarter] = useState('');
  const [telecommunicationsPerQuarter, setTelecommunicationsPerQuarter] = useState('');

  // Other admin costs
  const [officeSuppliesPerQuarter, setOfficeSuppliesPerQuarter] = useState('');
  const [legalFeesPerQuarter, setLegalFeesPerQuarter] = useState('');
  const [badDebtRate, setBadDebtRate] = useState('');
  const [depreciationOfficeEquipment, setDepreciationOfficeEquipment] = useState('');

  const [sgaResult, setSgaResult] = useState<any>(null);
  const [sgaErrors, setSgaErrors] = useState<string[]>([]);

  // Save preferences to localStorage when they change
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
  };

  const applyGrowthRate = () => {
    const growth = parseFloat(growthRate) / 100 || 0;
    const priorQ1 = parseFloat(priorQ1Sales) || 0;
    const priorQ2 = parseFloat(priorQ2Sales) || 0;
    const priorQ3 = parseFloat(priorQ3Sales) || 0;
    const priorQ4 = parseFloat(priorQ4Sales) || 0;

    if (priorQ1 === 0 && priorQ2 === 0 && priorQ3 === 0 && priorQ4 === 0) {
      alert('Please enter prior year sales data first');
      return;
    }

    setQ1Sales(String(Math.round(priorQ1 * (1 + growth))));
    setQ2Sales(String(Math.round(priorQ2 * (1 + growth))));
    setQ3Sales(String(Math.round(priorQ3 * (1 + growth))));
    setQ4Sales(String(Math.round(priorQ4 * (1 + growth))));
  };

  const handleCalculate = () => {
    const priorYearTotal = (parseFloat(priorQ1Sales) || 0) + (parseFloat(priorQ2Sales) || 0) + (parseFloat(priorQ3Sales) || 0) + (parseFloat(priorQ4Sales) || 0);
    const hasPriorYearData = priorYearTotal > 0;

    const hasCashCreditData = cashSalesPercentage !== '' || creditSalesPercentage !== '';

    const inputs: SalesBudgetInputs = {
      historicalSalesUnits: hasPriorYearData ? {
        q1: parseFloat(priorQ1Sales) || 0,
        q2: parseFloat(priorQ2Sales) || 0,
        q3: parseFloat(priorQ3Sales) || 0,
        q4: parseFloat(priorQ4Sales) || 0,
        yearly: priorYearTotal,
      } : undefined,
      forecastedSalesUnits: {
        q1: parseFloat(q1Sales) || 0,
        q2: parseFloat(q2Sales) || 0,
        q3: parseFloat(q3Sales) || 0,
        q4: parseFloat(q4Sales) || 0,
        yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
      },
      sellingPricePerUnit: parseFloat(sellingPrice) || 0,
      priceInflationRate: priceAdjustment === 'inflation' ? (parseFloat(inflationRate) || 0) : 0,
      cashSalesPercentage: hasCashCreditData ? (parseFloat(cashSalesPercentage) || 0) : undefined,
      creditSalesPercentage: hasCashCreditData ? (parseFloat(creditSalesPercentage) || 0) : undefined,
    };

    const validationErrors = validateSalesBudgetInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    const output = calculateSalesBudget(inputs);
    const formatted = formatSalesBudgetForDisplay(output, inputs);
    setResult(formatted);
    setErrors(validationErrors); // Keep warnings visible even after successful calculation
  };

  const handleCalculateProduction = () => {
    if (!result) {
      alert('Please calculate Sales Budget first (Schedule 1)');
      return;
    }

    const inputs: ProductionBudgetInputs = {
      forecastedSalesUnits: {
        q1: parseFloat(q1Sales) || 0,
        q2: parseFloat(q2Sales) || 0,
        q3: parseFloat(q3Sales) || 0,
        q4: parseFloat(q4Sales) || 0,
        yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
      },
      beginningInventory: parseFloat(beginningInventory) || 0,
      desiredEndingInventoryRatio: parseFloat(endingInventoryRatio) || 0,
      nextYearQ1ForecastedSales: nextYearQ1Sales ? parseFloat(nextYearQ1Sales) : undefined,
      maxProductionCapacityPerQuarter: maxCapacity ? parseFloat(maxCapacity) : undefined,
      minimumBatchSize: minBatchSize ? parseFloat(minBatchSize) : undefined,
      optimalBatchSize: optimalBatchSize ? parseFloat(optimalBatchSize) : undefined,
      inventoryCarryingCostPerUnit: carryingCost ? parseFloat(carryingCost) : undefined,
      useJIT,
      obsolescenceRiskPercentage: obsolescenceRisk ? parseFloat(obsolescenceRisk) : undefined,
    };

    const validationErrors = validateProductionBudgetInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setProductionErrors(validationErrors);
      setProductionResult(null);
      return;
    }

    const output = calculateProductionBudget(inputs);
    const formatted = formatProductionBudgetForDisplay(output, inputs);
    setProductionResult(formatted);
    setProductionErrors(validationErrors);
  };

  const downloadCSV = () => {
    if (!result) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 1: Sales Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n`;
    csvContent += `Currency: ${currency}\n`;
    if (assumptions) {
      csvContent += `Assumptions: ${assumptions}\n`;
    }
    csvContent += `\n`;

    // Headers
    csvContent += result.headers.join(',') + '\n';

    // Rows - remove commas from numbers to prevent CSV corruption
    result.rows.forEach((row: any) => {
      const cleanQ1 = String(row.q1).replace(/,/g, '');
      const cleanQ2 = String(row.q2).replace(/,/g, '');
      const cleanQ3 = String(row.q3).replace(/,/g, '');
      const cleanQ4 = String(row.q4).replace(/,/g, '');
      const cleanYearly = String(row.yearly).replace(/,/g, '');
      csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadProductionCSV = () => {
    if (!productionResult) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 2: Production Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n`;
    csvContent += `\n`;

    // Headers
    csvContent += productionResult.headers.join(',') + '\n';

    // Rows
    productionResult.rows.forEach((row: any) => {
      const cleanQ1 = String(row.q1).replace(/,/g, '');
      const cleanQ2 = String(row.q2).replace(/,/g, '');
      const cleanQ3 = String(row.q3).replace(/,/g, '');
      const cleanQ4 = String(row.q4).replace(/,/g, '');
      const cleanYearly = String(row.yearly).replace(/,/g, '');
      csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `production-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Material management functions
  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        name: '',
        requiredPerUnit: 0,
        costPerUnit: 0,
        beginningInventory: 0,
        desiredEndingInventoryRatio: 0,
        unit: '',
      },
    ]);
  };

  const removeMaterial = (index: number) => {
    if (materials.length === 1) {
      alert('You must have at least one material');
      return;
    }
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const updateMaterial = (index: number, field: keyof MaterialType, value: any) => {
    const newMaterials = [...materials];
    (newMaterials[index] as any)[field] = value;
    setMaterials(newMaterials);
  };

  const handleCalculateMaterial = () => {
    if (!productionResult) {
      alert('Please calculate Production Budget first (Schedule 2)');
      return;
    }

    const unitsToBeProduced = {
      q1: parseFloat(q1Sales) || 0,
      q2: parseFloat(q2Sales) || 0,
      q3: parseFloat(q3Sales) || 0,
      q4: parseFloat(q4Sales) || 0,
      yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
    };

    // Use production data from production result
    if (productionResult?.rows) {
      const prodRow = productionResult.rows.find((r: any) => r.label === 'Required Production');
      if (prodRow) {
        unitsToBeProduced.q1 = parseFloat(String(prodRow.q1).replace(/,/g, '')) || 0;
        unitsToBeProduced.q2 = parseFloat(String(prodRow.q2).replace(/,/g, '')) || 0;
        unitsToBeProduced.q3 = parseFloat(String(prodRow.q3).replace(/,/g, '')) || 0;
        unitsToBeProduced.q4 = parseFloat(String(prodRow.q4).replace(/,/g, '')) || 0;
        unitsToBeProduced.yearly = parseFloat(String(prodRow.yearly).replace(/,/g, '')) || 0;
      }
    }

    const inputs: DirectMaterialBudgetInputs = {
      unitsToBeProduced,
      nextYearQ1Production: nextYearQ1Production ? parseFloat(nextYearQ1Production) : undefined,
      materials: materials.map(m => ({
        ...m,
        requiredPerUnit: typeof m.requiredPerUnit === 'string' ? parseFloat(m.requiredPerUnit) || 0 : m.requiredPerUnit,
        costPerUnit: typeof m.costPerUnit === 'string' ? parseFloat(m.costPerUnit) || 0 : m.costPerUnit,
        beginningInventory: typeof m.beginningInventory === 'string' ? parseFloat(m.beginningInventory) || 0 : m.beginningInventory,
        desiredEndingInventoryRatio: typeof m.desiredEndingInventoryRatio === 'string' ? parseFloat(m.desiredEndingInventoryRatio) || 0 : m.desiredEndingInventoryRatio,
      })),
      percentPaidInCurrentQuarter: percentPaidCurrentQuarter ? parseFloat(percentPaidCurrentQuarter) : undefined,
      percentPaidInNextQuarter: percentPaidNextQuarter ? parseFloat(percentPaidNextQuarter) : undefined,
    };

    const validationErrors = validateDirectMaterialBudgetInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setMaterialErrors(validationErrors);
      setMaterialResult(null);
      return;
    }

    const output = calculateDirectMaterialBudget(inputs);
    const formatted = formatDirectMaterialBudgetForDisplay(output);
    setMaterialResult(formatted);
    setMaterialErrors(validationErrors);
  };

  const downloadMaterialCSV = () => {
    if (!materialResult) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 3: Direct Material Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n\n`;

    // For each material
    materialResult.materials?.forEach((material: any) => {
      csvContent += `Material: ${material.name} (${material.unit})\n`;
      csvContent += material.headers.join(',') + '\n';
      material.rows.forEach((row: any) => {
        const cleanQ1 = String(row.q1).replace(/,/g, '');
        const cleanQ2 = String(row.q2).replace(/,/g, '');
        const cleanQ3 = String(row.q3).replace(/,/g, '');
        const cleanQ4 = String(row.q4).replace(/,/g, '');
        const cleanYearly = String(row.yearly).replace(/,/g, '');
        csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
      });
      csvContent += '\n';
    });

    // Total summary
    if (materialResult.summary) {
      csvContent += 'Total Material Purchase Cost\n';
      csvContent += materialResult.summary.headers.join(',') + '\n';
      materialResult.summary.rows.forEach((row: any) => {
        const cleanQ1 = String(row.q1).replace(/,/g, '');
        const cleanQ2 = String(row.q2).replace(/,/g, '');
        const cleanQ3 = String(row.q3).replace(/,/g, '');
        const cleanQ4 = String(row.q4).replace(/,/g, '');
        const cleanYearly = String(row.yearly).replace(/,/g, '');
        csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `direct-material-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Labor category management functions
  const addLaborCategory = () => {
    setLaborCategories([
      ...laborCategories,
      {
        name: '',
        hoursPerUnit: 0,
        wageRatePerHour: 0,
      },
    ]);
  };

  const removeLaborCategory = (index: number) => {
    if (laborCategories.length === 1) {
      alert('You must have at least one labor category');
      return;
    }
    setLaborCategories(laborCategories.filter((_, i) => i !== index));
  };

  const updateLaborCategory = (index: number, field: keyof LaborCategory, value: any) => {
    const newCategories = [...laborCategories];
    (newCategories[index] as any)[field] = value;
    setLaborCategories(newCategories);
  };

  const handleCalculateLabor = () => {
    if (!productionResult) {
      alert('Please calculate Production Budget first (Schedule 2)');
      return;
    }

    const unitsToBeProduced = {
      q1: parseFloat(q1Sales) || 0,
      q2: parseFloat(q2Sales) || 0,
      q3: parseFloat(q3Sales) || 0,
      q4: parseFloat(q4Sales) || 0,
      yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
    };

    // Use production data from production result
    if (productionResult?.rows) {
      const prodRow = productionResult.rows.find((r: any) => r.label === 'Required Production');
      if (prodRow) {
        unitsToBeProduced.q1 = parseFloat(String(prodRow.q1).replace(/,/g, '')) || 0;
        unitsToBeProduced.q2 = parseFloat(String(prodRow.q2).replace(/,/g, '')) || 0;
        unitsToBeProduced.q3 = parseFloat(String(prodRow.q3).replace(/,/g, '')) || 0;
        unitsToBeProduced.q4 = parseFloat(String(prodRow.q4).replace(/,/g, '')) || 0;
        unitsToBeProduced.yearly = parseFloat(String(prodRow.yearly).replace(/,/g, '')) || 0;
      }
    }

    const inputs: DirectLabourBudgetInputs = {
      unitsToBeProduced,
      directLaborHoursPerUnit: useSimpleLaborInput && directLaborHoursPerUnit ? parseFloat(directLaborHoursPerUnit) : undefined,
      hourlyWageRate: useSimpleLaborInput && hourlyWageRate ? parseFloat(hourlyWageRate) : undefined,
      laborCategories: !useSimpleLaborInput ? laborCategories.map(cat => ({
        ...cat,
        hoursPerUnit: typeof cat.hoursPerUnit === 'string' ? parseFloat(cat.hoursPerUnit) || 0 : cat.hoursPerUnit,
        wageRatePerHour: typeof cat.wageRatePerHour === 'string' ? parseFloat(cat.wageRatePerHour) || 0 : cat.wageRatePerHour,
      })) : undefined,
      wageInflationRate: wageInflationRate ? parseFloat(wageInflationRate) : undefined,
      overtimeThreshold: overtimeThreshold ? parseFloat(overtimeThreshold) : undefined,
      overtimeMultiplier: overtimeMultiplier ? parseFloat(overtimeMultiplier) : undefined,
      fringeBenefitRate: fringeBenefitRate ? parseFloat(fringeBenefitRate) : undefined,
      productivityEfficiencyRate: productivityEfficiencyRate ? parseFloat(productivityEfficiencyRate) : undefined,
      turnoverRate: turnoverRate ? parseFloat(turnoverRate) : undefined,
      trainingCostPerEmployee: trainingCostPerEmployee ? parseFloat(trainingCostPerEmployee) : undefined,
      averageHoursPerEmployee: averageHoursPerEmployee ? parseFloat(averageHoursPerEmployee) : undefined,
    };

    const validationErrors = validateDirectLaborBudgetInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setLaborErrors(validationErrors);
      setLaborResult(null);
      return;
    }

    const output = calculateDirectLaborBudget(inputs);
    const formatted = formatDirectLaborBudgetForDisplay(output);
    setLaborResult(formatted);
    setLaborErrors(validationErrors);
  };

  const downloadLaborCSV = () => {
    if (!laborResult) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 4: Direct Labor Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n\n`;

    // If multi-category, include each category
    if (laborResult.categoryTables) {
      laborResult.categoryTables.forEach((cat: any) => {
        csvContent += `Labor Category: ${cat.categoryName}\n`;
        csvContent += cat.headers.join(',') + '\n';
        cat.rows.forEach((row: any) => {
          const cleanQ1 = String(row.q1).replace(/,/g, '');
          const cleanQ2 = String(row.q2).replace(/,/g, '');
          const cleanQ3 = String(row.q3).replace(/,/g, '');
          const cleanQ4 = String(row.q4).replace(/,/g, '');
          const cleanYearly = String(row.yearly).replace(/,/g, '');
          csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
        });
        csvContent += '\n';
      });

      // Summary
      csvContent += 'Summary - Total Direct Labor\n';
      csvContent += laborResult.headers.join(',') + '\n';
      laborResult.summaryRows.forEach((row: any) => {
        const cleanQ1 = String(row.q1).replace(/,/g, '');
        const cleanQ2 = String(row.q2).replace(/,/g, '');
        const cleanQ3 = String(row.q3).replace(/,/g, '');
        const cleanQ4 = String(row.q4).replace(/,/g, '');
        const cleanYearly = String(row.yearly).replace(/,/g, '');
        csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
      });
    } else {
      // Simple single-category
      csvContent += laborResult.headers.join(',') + '\n';
      laborResult.rows.forEach((row: any) => {
        const cleanQ1 = String(row.q1).replace(/,/g, '');
        const cleanQ2 = String(row.q2).replace(/,/g, '');
        const cleanQ3 = String(row.q3).replace(/,/g, '');
        const cleanQ4 = String(row.q4).replace(/,/g, '');
        const cleanYearly = String(row.yearly).replace(/,/g, '');
        csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `direct-labor-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Overhead category management functions
  const addOverheadCategory = () => {
    setOverheadCategories([
      ...overheadCategories,
      {
        name: '',
        costType: 'variable',
        amount: 0,
        costDriver: 'units',
      },
    ]);
  };

  const removeOverheadCategory = (index: number) => {
    if (overheadCategories.length === 1) {
      alert('You must have at least one overhead category');
      return;
    }
    setOverheadCategories(overheadCategories.filter((_, i) => i !== index));
  };

  const updateOverheadCategory = (index: number, field: keyof OverheadCostCategory, value: any) => {
    const newCategories = [...overheadCategories];
    (newCategories[index] as any)[field] = value;
    setOverheadCategories(newCategories);
  };

  const handleCalculateOverhead = () => {
    if (!productionResult) {
      alert('Please calculate Production Budget first (Schedule 2)');
      return;
    }

    const unitsToBeProduced = {
      q1: parseFloat(q1Sales) || 0,
      q2: parseFloat(q2Sales) || 0,
      q3: parseFloat(q3Sales) || 0,
      q4: parseFloat(q4Sales) || 0,
      yearly: (parseFloat(q1Sales) || 0) + (parseFloat(q2Sales) || 0) + (parseFloat(q3Sales) || 0) + (parseFloat(q4Sales) || 0),
    };

    // Use production data from production result
    if (productionResult?.rows) {
      const prodRow = productionResult.rows.find((r: any) => r.label === 'Required Production');
      if (prodRow) {
        unitsToBeProduced.q1 = parseFloat(String(prodRow.q1).replace(/,/g, '')) || 0;
        unitsToBeProduced.q2 = parseFloat(String(prodRow.q2).replace(/,/g, '')) || 0;
        unitsToBeProduced.q3 = parseFloat(String(prodRow.q3).replace(/,/g, '')) || 0;
        unitsToBeProduced.q4 = parseFloat(String(prodRow.q4).replace(/,/g, '')) || 0;
        unitsToBeProduced.yearly = parseFloat(String(prodRow.yearly).replace(/,/g, '')) || 0;
      }
    }

    // Get labor hours if available
    let directLaborHours = undefined;
    if (laborResult?.totalLaborHoursRequired) {
      directLaborHours = laborResult.totalLaborHoursRequired;
    }

    const inputs: ManufacturingOverheadInputs = {
      unitsToBeProduced,
      directLaborHours,
      variableOverheadRatePerUnit: variableOverheadRatePerUnit ? parseFloat(variableOverheadRatePerUnit) : undefined,
      variableOverheadRatePerLaborHour: variableOverheadRatePerLaborHour ? parseFloat(variableOverheadRatePerLaborHour) : undefined,
      fixedOverheadPerQuarter: fixedOverheadPerQuarter ? parseFloat(fixedOverheadPerQuarter) : undefined,
      depreciationPerQuarter: depreciationPerQuarter ? parseFloat(depreciationPerQuarter) : undefined,
      allocationBase,
      overheadCategories: overheadApproach === 'detailed' ? overheadCategories.map(cat => ({
        ...cat,
        amount: typeof cat.amount === 'string' ? parseFloat(cat.amount) || 0 : cat.amount,
      })) : undefined,
      useActivityBasedCosting: overheadApproach === 'abc',
      numberOfProductionRuns: overheadApproach === 'abc' && (productionRunsQ1 || productionRunsQ2 || productionRunsQ3 || productionRunsQ4) ? {
        q1: parseFloat(productionRunsQ1) || 0,
        q2: parseFloat(productionRunsQ2) || 0,
        q3: parseFloat(productionRunsQ3) || 0,
        q4: parseFloat(productionRunsQ4) || 0,
        yearly: (parseFloat(productionRunsQ1) || 0) + (parseFloat(productionRunsQ2) || 0) + (parseFloat(productionRunsQ3) || 0) + (parseFloat(productionRunsQ4) || 0),
      } : undefined,
      costPerProductionRun: costPerProductionRun ? parseFloat(costPerProductionRun) : undefined,
      numberOfInspections: overheadApproach === 'abc' && (inspectionsQ1 || inspectionsQ2 || inspectionsQ3 || inspectionsQ4) ? {
        q1: parseFloat(inspectionsQ1) || 0,
        q2: parseFloat(inspectionsQ2) || 0,
        q3: parseFloat(inspectionsQ3) || 0,
        q4: parseFloat(inspectionsQ4) || 0,
        yearly: (parseFloat(inspectionsQ1) || 0) + (parseFloat(inspectionsQ2) || 0) + (parseFloat(inspectionsQ3) || 0) + (parseFloat(inspectionsQ4) || 0),
      } : undefined,
      costPerInspection: costPerInspection ? parseFloat(costPerInspection) : undefined,
      machineHours: overheadApproach === 'abc' && (machineHoursQ1 || machineHoursQ2 || machineHoursQ3 || machineHoursQ4) ? {
        q1: parseFloat(machineHoursQ1) || 0,
        q2: parseFloat(machineHoursQ2) || 0,
        q3: parseFloat(machineHoursQ3) || 0,
        q4: parseFloat(machineHoursQ4) || 0,
        yearly: (parseFloat(machineHoursQ1) || 0) + (parseFloat(machineHoursQ2) || 0) + (parseFloat(machineHoursQ3) || 0) + (parseFloat(machineHoursQ4) || 0),
      } : undefined,
      costPerMachineHour: costPerMachineHour ? parseFloat(costPerMachineHour) : undefined,
      facilityRent: facilityRent ? parseFloat(facilityRent) : undefined,
      facilityInsurance: facilityInsurance ? parseFloat(facilityInsurance) : undefined,
      propertyTaxes: propertyTaxes ? parseFloat(propertyTaxes) : undefined,
      utilities: utilities ? parseFloat(utilities) : undefined,
      utilitiesIsVariable,
      supervisorySalaries: supervisorySalaries ? parseFloat(supervisorySalaries) : undefined,
      supportStaffSalaries: supportStaffSalaries ? parseFloat(supportStaffSalaries) : undefined,
      indirectMaterialsPerUnit: indirectMaterialsPerUnit ? parseFloat(indirectMaterialsPerUnit) : undefined,
      shopSuppliesPerQuarter: shopSuppliesPerQuarter ? parseFloat(shopSuppliesPerQuarter) : undefined,
      plannedMaintenancePerQuarter: plannedMaintenancePerQuarter ? parseFloat(plannedMaintenancePerQuarter) : undefined,
      maintenancePerMachineHour: maintenancePerMachineHour ? parseFloat(maintenancePerMachineHour) : undefined,
      qualityControlPerUnit: qualityControlPerUnit ? parseFloat(qualityControlPerUnit) : undefined,
      qualityControlLabor: qualityControlLabor ? parseFloat(qualityControlLabor) : undefined,
      technologyCosts: technologyCosts ? parseFloat(technologyCosts) : undefined,
      warehouseCosts: warehouseCosts ? parseFloat(warehouseCosts) : undefined,
      environmentalComplianceCosts: environmentalComplianceCosts ? parseFloat(environmentalComplianceCosts) : undefined,
    };

    const validationErrors = validateManufacturingOverheadInputs(inputs);
    const actualErrors = validationErrors.filter(e => !e.startsWith('WARNING:'));

    if (actualErrors.length > 0) {
      setOverheadErrors(validationErrors);
      setOverheadResult(null);
      return;
    }

    const output = calculateManufacturingOverheadBudget(inputs);
    const formatted = formatManufacturingOverheadBudgetForDisplay(output);
    setOverheadResult(formatted);
    setOverheadErrors(validationErrors);
  };

  const downloadOverheadCSV = () => {
    if (!overheadResult) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 5: Manufacturing Overhead Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n\n`;

    csvContent += overheadResult.headers.join(',') + '\n';
    overheadResult.rows.forEach((row: any) => {
      const cleanQ1 = String(row.q1).replace(/,/g, '');
      const cleanQ2 = String(row.q2).replace(/,/g, '');
      const cleanQ3 = String(row.q3).replace(/,/g, '');
      const cleanQ4 = String(row.q4).replace(/,/g, '');
      const cleanYearly = String(row.yearly).replace(/,/g, '');
      csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `manufacturing-overhead-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCalculateSGA = () => {
    if (!result) {
      alert('Please calculate Sales Budget first (Schedule 1)');
      return;
    }

    // Get sales data from Schedule 1
    const salesRevenue = {
      q1: result.totalRevenue?.q1 || 0,
      q2: result.totalRevenue?.q2 || 0,
      q3: result.totalRevenue?.q3 || 0,
      q4: result.totalRevenue?.q4 || 0,
      yearly: result.totalRevenue?.yearly || 0,
    };

    const salesUnits = {
      q1: result.unitsSold?.q1 || 0,
      q2: result.unitsSold?.q2 || 0,
      q3: result.unitsSold?.q3 || 0,
      q4: result.unitsSold?.q4 || 0,
      yearly: result.unitsSold?.yearly || 0,
    };

    const inputs: SellingAdminExpenseInputs = {
      salesRevenue,
      salesUnits,
      useSimpleApproach: sgaApproach === 'simple',

      // Simple approach
      variableSellingExpenseRate: variableSellingExpenseRate ? parseFloat(variableSellingExpenseRate) : undefined,
      variableAdminExpenseRate: variableAdminExpenseRate ? parseFloat(variableAdminExpenseRate) : undefined,
      fixedSellingExpensePerQuarter: fixedSellingExpensePerQuarter ? parseFloat(fixedSellingExpensePerQuarter) : undefined,
      fixedAdminExpensePerQuarter: fixedAdminExpensePerQuarter ? parseFloat(fixedAdminExpensePerQuarter) : undefined,

      // Detailed approach - Selling Expenses
      commissionRate: commissionRate ? parseFloat(commissionRate) : undefined,
      commissionPerUnit: commissionPerUnit ? parseFloat(commissionPerUnit) : undefined,
      distributionCostPerUnit: distributionCostPerUnit ? parseFloat(distributionCostPerUnit) : undefined,
      distributionFixedCostPerQuarter: distributionFixedCostPerQuarter ? parseFloat(distributionFixedCostPerQuarter) : undefined,
      customerServiceSalaries: customerServiceSalaries ? parseFloat(customerServiceSalaries) : undefined,
      warrantyExpensePerUnit: warrantyExpensePerUnit ? parseFloat(warrantyExpensePerUnit) : undefined,

      // Marketing Expenses
      advertisingBudgetPerQuarter: advertisingBudgetPerQuarter ? parseFloat(advertisingBudgetPerQuarter) : undefined,
      brandDevelopmentPerQuarter: brandDevelopmentPerQuarter ? parseFloat(brandDevelopmentPerQuarter) : undefined,
      marketingCampaignsPerQuarter: marketingCampaignsPerQuarter ? parseFloat(marketingCampaignsPerQuarter) : undefined,

      // Administrative Expenses
      executiveSalaries: executiveSalaries ? parseFloat(executiveSalaries) : undefined,
      financeSalaries: financeSalaries ? parseFloat(financeSalaries) : undefined,
      hrSalaries: hrSalaries ? parseFloat(hrSalaries) : undefined,
      itSalaries: itSalaries ? parseFloat(itSalaries) : undefined,

      // Occupancy costs
      officeRentPerQuarter: officeRentPerQuarter ? parseFloat(officeRentPerQuarter) : undefined,
      utilitiesPerQuarter: utilitiesPerQuarter ? parseFloat(utilitiesPerQuarter) : undefined,

      // Technology costs
      softwareLicensesPerQuarter: softwareLicensesPerQuarter ? parseFloat(softwareLicensesPerQuarter) : undefined,
      telecommunicationsPerQuarter: telecommunicationsPerQuarter ? parseFloat(telecommunicationsPerQuarter) : undefined,

      // Other admin costs
      officeSuppliesPerQuarter: officeSuppliesPerQuarter ? parseFloat(officeSuppliesPerQuarter) : undefined,
      legalFeesPerQuarter: legalFeesPerQuarter ? parseFloat(legalFeesPerQuarter) : undefined,
      badDebtRate: badDebtRate ? parseFloat(badDebtRate) : undefined,
      depreciationOfficeEquipment: depreciationOfficeEquipment ? parseFloat(depreciationOfficeEquipment) : undefined,
    };

    const validationErrors = validateSellingAdminExpenseInputs(inputs);
    const output = calculateSellingAdminExpenseBudget(inputs);
    const formatted = formatSellingAdminExpenseBudgetForDisplay(output);
    setSgaResult(formatted);
    setSgaErrors(validationErrors);
  };

  const downloadSGACSV = () => {
    if (!sgaResult) return;

    let csvContent = `${companyName || 'Your Company'} - ${productName || 'Product'}\n`;
    csvContent += `Schedule 6: Selling, General & Administrative Expense Budget\n`;
    csvContent += `For the Year Ending December 31, ${fiscalYear}\n\n`;

    csvContent += sgaResult.headers.join(',') + '\n';
    sgaResult.rows.forEach((row: any) => {
      const cleanQ1 = String(row.q1).replace(/,/g, '');
      const cleanQ2 = String(row.q2).replace(/,/g, '');
      const cleanQ3 = String(row.q3).replace(/,/g, '');
      const cleanQ4 = String(row.q4).replace(/,/g, '');
      const cleanYearly = String(row.yearly).replace(/,/g, '');
      csvContent += `"${row.label}",${cleanQ1},${cleanQ2},${cleanQ3},${cleanQ4},${cleanYearly}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sga-expense-budget-${companyName.replace(/\s+/g, '-').toLowerCase() || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bgColor = darkMode ? 'bg-[#111]' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-[#454545]';
  const headingColor = darkMode ? 'text-white' : 'text-black';
  const inputBg = darkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-white border-gray-300 text-black';
  const buttonBg = darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800';
  const hrColor = darkMode ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className={`text-sm hover:underline ${textColor}`}>
          ← Back
        </Link>
        <h1 className={`text-xl font-semibold ${headingColor}`}>
          Budget Input
        </h1>
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

      <main className={`max-w-5xl mx-auto px-6 py-12 ${textColor}`}>
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 1: Sales Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Enter your forecasted sales data
        </p>

        {/* Form */}
        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Company Information</h3>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Type company name"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Type product name"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="Type currency"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Fiscal Year
              </label>
              <input
                type="text"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                placeholder="Type fiscal year"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Prior Year Sales (Optional)</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Enter last year's sales to see growth comparison. Leave blank if not applicable.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q1 (Oct-Dec)
              </label>
              <input
                type="number"
                value={priorQ1Sales}
                onChange={(e) => setPriorQ1Sales(e.target.value)}
                placeholder="800"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q2 (Jan-Mar)
              </label>
              <input
                type="number"
                value={priorQ2Sales}
                onChange={(e) => setPriorQ2Sales(e.target.value)}
                placeholder="1200"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q3 (Apr-Jun)
              </label>
              <input
                type="number"
                value={priorQ3Sales}
                onChange={(e) => setPriorQ3Sales(e.target.value)}
                placeholder="1000"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q4 (Jul-Sep)
              </label>
              <input
                type="number"
                value={priorQ4Sales}
                onChange={(e) => setPriorQ4Sales(e.target.value)}
                placeholder="1100"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} mb-8`}>
            <h4 className={`text-sm font-semibold mb-3 ${headingColor}`}>
              Quick Forecast Calculator
            </h4>
            <p className={`text-xs mb-3 ${textColor}`}>
              Apply a growth rate to prior year sales to auto-calculate current year forecast
            </p>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className={`block text-xs font-medium mb-2 ${headingColor}`}>
                  Growth Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  placeholder="e.g., 15 for 15% growth"
                  className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                />
              </div>
              <button
                onClick={applyGrowthRate}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Apply to Forecast
              </button>
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Forecasted Sales (Current Year)</h3>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q1 (Oct-Dec)
              </label>
              <input
                type="number"
                value={q1Sales}
                onChange={(e) => setQ1Sales(e.target.value)}
                placeholder="1000"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q2 (Jan-Mar)
              </label>
              <input
                type="number"
                value={q2Sales}
                onChange={(e) => setQ2Sales(e.target.value)}
                placeholder="1500"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q3 (Apr-Jun)
              </label>
              <input
                type="number"
                value={q3Sales}
                onChange={(e) => setQ3Sales(e.target.value)}
                placeholder="1200"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Q4 (Jul-Sep)
              </label>
              <input
                type="number"
                value={q4Sales}
                onChange={(e) => setQ4Sales(e.target.value)}
                placeholder="1300"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${headingColor}`}>
              Price Adjustment Method
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceAdjustment"
                  value="constant"
                  checked={priceAdjustment === 'constant'}
                  onChange={(e) => setPriceAdjustment(e.target.value as 'constant' | 'inflation')}
                  className="mr-2"
                />
                <span className={`text-sm ${textColor}`}>Constant Price (same across all quarters)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceAdjustment"
                  value="inflation"
                  checked={priceAdjustment === 'inflation'}
                  onChange={(e) => setPriceAdjustment(e.target.value as 'constant' | 'inflation')}
                  className="mr-2"
                />
                <span className={`text-sm ${textColor}`}>Inflation-Adjusted Price</span>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Selling Price per Unit ({currency})
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="85000"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Inflation Rate (Annual %)
              </label>
              <input
                type="number"
                step="0.01"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                placeholder="0.15"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
                disabled={priceAdjustment === 'constant'}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                {priceAdjustment === 'constant'
                  ? 'Disabled when using constant price'
                  : 'Enter as decimal (e.g., 0.15 for 15%)'}
              </p>
            </div>
          </div>

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Cash vs Credit Sales (Optional)</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Split sales revenue into cash (collected immediately) and credit (collected later). Required for Schedule 8 (Cash Receipts Budget).
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Cash Sales Percentage
              </label>
              <input
                type="number"
                step="0.01"
                value={cashSalesPercentage}
                onChange={(e) => setCashSalesPercentage(e.target.value)}
                placeholder="0.40"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.40 for 40% cash sales)
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Credit Sales Percentage
              </label>
              <input
                type="number"
                step="0.01"
                value={creditSalesPercentage}
                onChange={(e) => setCreditSalesPercentage(e.target.value)}
                placeholder="0.60"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.60 for 60% credit sales)
              </p>
            </div>
          </div>

          <hr className={`my-12 ${hrColor}`} />

          <div className="mb-8">
            <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
              Budget Assumptions & Notes (Optional)
            </label>
            <textarea
              value={assumptions}
              onChange={(e) => setAssumptions(e.target.value)}
              placeholder="e.g., Conservative forecast due to market uncertainty; New market entry in Q3; Based on historical growth trends..."
              rows={3}
              className={`w-full px-4 py-3 border ${inputBg} text-base`}
            />
            <p className={`text-xs mt-2 ${textColor}`}>
              Document key assumptions for reference
            </p>
          </div>

          <button
            onClick={handleCalculate}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate
          </button>

          {errors.length > 0 && (
            <div className="mt-6 space-y-3">
              {errors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {errors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {errors.filter(e => e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Warnings:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {errors.filter(e => e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error.replace('WARNING: ', '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Results</h3>
            {result && (
              <button
                onClick={downloadCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!result && (
            <p className="text-lg leading-relaxed">
              Enter data and click Calculate to see your sales budget
            </p>
          )}

          {result && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-2 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear} | Currency: {currency}
              </p>
              {assumptions && (
                <div className={`mb-6 p-3 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <p className={`text-xs font-semibold mb-1 ${headingColor}`}>Assumptions & Notes:</p>
                  <p className={`text-sm ${textColor}`}>{assumptions}</p>
                </div>
              )}

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      {result.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} ${
                          idx === result.rows.length - 1 ? 'font-semibold' : ''
                        }`}
                      >
                        <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                        <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`text-xs mb-8 ${textColor}`}>
                Note: The "Yearly Total" price is the weighted average selling price across all quarters.
              </p>

              <div className="mb-8">
                <h4 className={`text-lg font-semibold mb-3 ${headingColor}`}>
                  Seasonal Distribution
                </h4>
                <p className={`text-sm mb-4 ${textColor}`}>
                  Percentage of annual sales expected in each quarter:
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {result.seasonalDistribution && (
                    <>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q1 (Oct-Dec)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q1.toFixed(1)}%
                        </div>
                      </div>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q2 (Jan-Mar)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q2.toFixed(1)}%
                        </div>
                      </div>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q3 (Apr-Jun)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q3.toFixed(1)}%
                        </div>
                      </div>
                      <div className={`p-3 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-xs mb-1 ${textColor}`}>Q4 (Jul-Sep)</div>
                        <div className={`text-2xl font-semibold ${headingColor}`}>
                          {result.seasonalDistribution.q4.toFixed(1)}%
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-lg leading-relaxed">
                ✓ Sales Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Sales Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Sales Budget is the starting point for the master budget. It shows expected sales
          in both units and revenue for each quarter and the entire year.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Sales Revenue = Expected Sales Units × Selling Price per Unit
        </p>

        <hr className={`my-16 ${hrColor}`} />

        {/* SCHEDULE 2: PRODUCTION BUDGET */}
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 2: Production Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Determine production volume needed to meet sales demand and maintain inventory levels
        </p>

        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Inventory Policy</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Beginning Inventory (Units)
              </label>
              <input
                type="number"
                value={beginningInventory}
                onChange={(e) => setBeginningInventory(e.target.value)}
                placeholder="100"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Opening inventory at start of year
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Desired Ending Inventory Ratio
              </label>
              <input
                type="number"
                step="0.01"
                value={endingInventoryRatio}
                onChange={(e) => setEndingInventoryRatio(e.target.value)}
                placeholder="0.10"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.10 for 10% of next quarter's sales)
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="useJIT"
                checked={useJIT}
                onChange={(e) => setUseJIT(e.target.checked)}
                className="mr-3 w-4 h-4"
              />
              <label htmlFor="useJIT" className={`text-sm font-medium ${headingColor}`}>
                Use Just-in-Time (JIT) Manufacturing
              </label>
            </div>
            <p className={`text-xs ${textColor} ml-7`}>
              Enable JIT to set ending inventory to zero (production = sales)
            </p>
          </div>

          <hr className={`my-8 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Optional Enhancements</h3>
          <p className={`text-sm mb-6 ${textColor}`}>
            Add production constraints and cost analysis (all optional)
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Next Year Q1 Sales Forecast
              </label>
              <input
                type="number"
                value={nextYearQ1Sales}
                onChange={(e) => setNextYearQ1Sales(e.target.value)}
                placeholder="Leave blank to use current Q1"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Max Production Capacity/Quarter
              </label>
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Inventory Carrying Cost/Unit
              </label>
              <input
                type="number"
                step="0.01"
                value={carryingCost}
                onChange={(e) => setCarryingCost(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Minimum Batch Size
              </label>
              <input
                type="number"
                value={minBatchSize}
                onChange={(e) => setMinBatchSize(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Optimal Batch Size
              </label>
              <input
                type="number"
                value={optimalBatchSize}
                onChange={(e) => setOptimalBatchSize(e.target.value)}
                placeholder="Optional"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Obsolescence Risk (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={obsolescenceRisk}
                onChange={(e) => setObsolescenceRisk(e.target.value)}
                placeholder="0.05"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Enter as decimal (e.g., 0.05 for 5% risk)
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculateProduction}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate Production Budget
          </button>

          {productionErrors.length > 0 && (
            <div className="mt-6 space-y-3">
              {productionErrors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {productionErrors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {productionErrors.filter(e => e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Warnings:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {productionErrors.filter(e => e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error.replace('WARNING: ', '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Production Budget Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Production Budget Results</h3>
            {productionResult && (
              <button
                onClick={downloadProductionCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!productionResult && (
            <p className="text-lg leading-relaxed">
              Calculate Sales Budget first, then enter production data and click Calculate Production Budget
            </p>
          )}

          {productionResult && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-6 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear}
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      {productionResult.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {productionResult.rows.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} ${
                          idx === productionResult.rows.length - 1 ? 'font-semibold' : ''
                        }`}
                      >
                        <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                        <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {productionResult.notes && (
                <p className={`text-xs mb-6 ${textColor} italic`}>
                  * {productionResult.notes}
                </p>
              )}

              {productionResult.inventoryCarryingCost && (
                <div className={`mb-6 p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${headingColor}`}>Inventory Carrying Cost</h4>
                  <p className={`text-xs ${textColor}`}>
                    Q1: {productionResult.inventoryCarryingCost.q1.toFixed(2)} |
                    Q2: {productionResult.inventoryCarryingCost.q2.toFixed(2)} |
                    Q3: {productionResult.inventoryCarryingCost.q3.toFixed(2)} |
                    Q4: {productionResult.inventoryCarryingCost.q4.toFixed(2)} |
                    Yearly: {productionResult.inventoryCarryingCost.yearly.toFixed(2)}
                  </p>
                </div>
              )}

              {productionResult.obsolescenceCost && (
                <div className={`mb-6 p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${headingColor}`}>Obsolescence Cost</h4>
                  <p className={`text-xs ${textColor}`}>
                    Q1: {productionResult.obsolescenceCost.q1.toFixed(2)} |
                    Q2: {productionResult.obsolescenceCost.q2.toFixed(2)} |
                    Q3: {productionResult.obsolescenceCost.q3.toFixed(2)} |
                    Q4: {productionResult.obsolescenceCost.q4.toFixed(2)} |
                    Yearly: {productionResult.obsolescenceCost.yearly.toFixed(2)}
                  </p>
                </div>
              )}

              <p className="text-lg leading-relaxed">
                ✓ Production Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Production Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Production Budget determines how many units must be produced to meet sales demand
          while maintaining desired inventory levels.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Units to Produce = Sales + Desired Ending Inventory - Beginning Inventory
        </p>

        <hr className={`my-16 ${hrColor}`} />

        {/* SCHEDULE 3: DIRECT MATERIAL BUDGET */}
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 3: Direct Material Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Calculate raw material requirements and purchase costs for production
        </p>

        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Materials</h3>
          <p className={`text-sm mb-6 ${textColor}`}>
            Add all raw materials required for production. You can add multiple materials (e.g., fabric, poles, etc.)
          </p>

          {materials.map((material, index) => (
            <div key={index} className={`mb-8 p-6 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-lg font-semibold ${headingColor}`}>
                  Material {index + 1}
                </h4>
                {materials.length > 1 && (
                  <button
                    onClick={() => removeMaterial(index)}
                    className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Material Name
                  </label>
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                    placeholder="e.g., Tent Fabric"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Unit of Measure
                  </label>
                  <input
                    type="text"
                    value={material.unit}
                    onChange={(e) => updateMaterial(index, 'unit', e.target.value)}
                    placeholder="e.g., yards, kg, liters"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Required per Unit Produced
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.requiredPerUnit}
                    onChange={(e) => updateMaterial(index, 'requiredPerUnit', e.target.value)}
                    placeholder="4.0"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Cost per Unit ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.costPerUnit}
                    onChange={(e) => updateMaterial(index, 'costPerUnit', e.target.value)}
                    placeholder="5.00"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Beginning Inventory
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.beginningInventory}
                    onChange={(e) => updateMaterial(index, 'beginningInventory', e.target.value)}
                    placeholder="600"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Ending Inventory Ratio
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.desiredEndingInventoryRatio}
                    onChange={(e) => updateMaterial(index, 'desiredEndingInventoryRatio', e.target.value)}
                    placeholder="0.10"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Enter as decimal (e.g., 0.10 for 10% of next quarter's needs)
                  </p>
                </div>
              </div>

              {/* Optional enhancements */}
              <details className="mt-4">
                <summary className={`text-sm font-medium cursor-pointer ${headingColor} hover:underline`}>
                  Optional Enhancements (click to expand)
                </summary>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                      Scrap/Waste %
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={material.scrapWastePercentage || ''}
                      onChange={(e) => updateMaterial(index, 'scrapWastePercentage', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="0.05"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                    <p className={`text-xs mt-1 ${textColor}`}>
                      e.g., 0.05 for 5% waste
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                      Price Inflation Rate
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={material.priceInflationRate || ''}
                      onChange={(e) => updateMaterial(index, 'priceInflationRate', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="0.02"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                    <p className={`text-xs mt-1 ${textColor}`}>
                      Quarterly rate (e.g., 0.02 for 2%)
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                      Bulk Discount Threshold
                    </label>
                    <input
                      type="number"
                      value={material.bulkDiscountThreshold || ''}
                      onChange={(e) => updateMaterial(index, 'bulkDiscountThreshold', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="10000"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                      Bulk Discount Rate
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={material.bulkDiscountRate || ''}
                      onChange={(e) => updateMaterial(index, 'bulkDiscountRate', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="0.10"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                    <p className={`text-xs mt-1 ${textColor}`}>
                      e.g., 0.10 for 10% discount
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                      Supplier Lead Time (days)
                    </label>
                    <input
                      type="number"
                      value={material.supplierLeadTimeDays || ''}
                      onChange={(e) => updateMaterial(index, 'supplierLeadTimeDays', e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="30"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id={`jit-${index}`}
                      checked={material.useJIT || false}
                      onChange={(e) => updateMaterial(index, 'useJIT', e.target.checked)}
                      className="mr-2 w-4 h-4"
                    />
                    <label htmlFor={`jit-${index}`} className={`text-sm ${headingColor}`}>
                      Use JIT (no ending inventory)
                    </label>
                  </div>
                </div>
              </details>
            </div>
          ))}

          <button
            onClick={addMaterial}
            className={`${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300'} font-medium px-6 py-2 text-sm mb-8`}
          >
            + Add Another Material
          </button>

          <hr className={`my-8 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Payment Terms (Optional)</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Specify when material purchases are paid (used for cash disbursement calculations)
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Next Year Q1 Production
              </label>
              <input
                type="number"
                value={nextYearQ1Production}
                onChange={(e) => setNextYearQ1Production(e.target.value)}
                placeholder="Leave blank to use current Q1"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                For Q4 ending inventory calculation
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                % Paid in Current Quarter
              </label>
              <input
                type="number"
                step="0.01"
                value={percentPaidCurrentQuarter}
                onChange={(e) => setPercentPaidCurrentQuarter(e.target.value)}
                placeholder="0.60"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                e.g., 0.60 for 60% paid immediately
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                % Paid in Next Quarter
              </label>
              <input
                type="number"
                step="0.01"
                value={percentPaidNextQuarter}
                onChange={(e) => setPercentPaidNextQuarter(e.target.value)}
                placeholder="0.40"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                e.g., 0.40 for 40% paid next quarter
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculateMaterial}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate Material Budget
          </button>

          {materialErrors.length > 0 && (
            <div className="mt-6 space-y-3">
              {materialErrors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {materialErrors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {materialErrors.filter(e => e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Warnings:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {materialErrors.filter(e => e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error.replace('WARNING: ', '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Material Budget Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Material Budget Results</h3>
            {materialResult && (
              <button
                onClick={downloadMaterialCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!materialResult && (
            <p className="text-lg leading-relaxed">
              Calculate Production Budget first, then enter material data and click Calculate Material Budget
            </p>
          )}

          {materialResult && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-6 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear}
              </p>

              {/* Display each material */}
              {materialResult.materials?.map((mat: any, idx: number) => (
                <div key={idx} className="mb-8">
                  <h4 className={`text-xl font-semibold mb-4 ${headingColor}`}>
                    {mat.name} ({mat.unit})
                  </h4>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                          {mat.headers.map((header: string, hidx: number) => (
                            <th
                              key={hidx}
                              className={`py-3 px-4 text-left font-semibold text-sm ${hidx === 0 ? '' : 'text-right'} ${headingColor}`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {mat.rows.map((row: any, ridx: number) => (
                          <tr
                            key={ridx}
                            className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                          >
                            <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                            <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Material-specific metrics */}
                  {(mat.inventoryTurnoverRatio || mat.daysInventoryOutstanding) && (
                    <div className={`p-3 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} text-sm mb-4`}>
                      {mat.inventoryTurnoverRatio && (
                        <p className={textColor}>
                          <strong>Inventory Turnover:</strong> {mat.inventoryTurnoverRatio.toFixed(2)}x annually
                        </p>
                      )}
                      {mat.daysInventoryOutstanding && (
                        <p className={textColor}>
                          <strong>Days Inventory Outstanding:</strong> {mat.daysInventoryOutstanding.toFixed(0)} days
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Total Summary */}
              {materialResult.summary && (
                <div className="mb-8">
                  <h4 className={`text-xl font-semibold mb-4 ${headingColor}`}>
                    Total Material Purchase Cost
                  </h4>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                          {materialResult.summary.headers.map((header: string, idx: number) => (
                            <th
                              key={idx}
                              className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {materialResult.summary.rows.map((row: any, idx: number) => (
                          <tr
                            key={idx}
                            className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} font-semibold`}
                          >
                            <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.yearly}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Analytics */}
              {materialResult.analytics && (
                <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} mb-6`}>
                  <h4 className={`text-sm font-semibold mb-3 ${headingColor}`}>Analytics</h4>

                  {materialResult.analytics.overallInventoryTurnover && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Overall Inventory Turnover:</strong> {materialResult.analytics.overallInventoryTurnover.toFixed(2)}x annually
                    </p>
                  )}

                  {materialResult.analytics.totalScrapWasteCost && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Total Scrap/Waste Cost:</strong> {currency} {materialResult.analytics.totalScrapWasteCost.toFixed(2)}
                    </p>
                  )}

                  {materialResult.analytics.totalBulkDiscountSavings && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Total Bulk Discount Savings:</strong> {currency} {materialResult.analytics.totalBulkDiscountSavings.toFixed(2)}
                    </p>
                  )}

                  {materialResult.analytics.criticalMaterials && materialResult.analytics.criticalMaterials.length > 0 && (
                    <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      <strong>⚠ Critical Materials (low turnover):</strong> {materialResult.analytics.criticalMaterials.join(', ')}
                    </p>
                  )}
                </div>
              )}

              <p className="text-lg leading-relaxed">
                ✓ Direct Material Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Direct Material Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Direct Material Budget calculates the quantity and cost of raw materials needed for production.
          It ensures adequate materials are available while managing inventory costs.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Material to Purchase = (Production Needs × Material per Unit + Desired Ending Inventory) - Beginning Inventory
        </p>

        <hr className={`my-16 ${hrColor}`} />

        {/* SCHEDULE 4: DIRECT LABOR BUDGET */}
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 4: Direct Labor Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Calculate direct labor hours and costs required for production
        </p>

        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Labor Input Method</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Choose between simple single-category input or multi-category labor types
          </p>

          <div className="flex gap-6 mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="laborInputMethod"
                checked={useSimpleLaborInput}
                onChange={() => setUseSimpleLaborInput(true)}
                className="mr-2"
              />
              <span className={`text-sm ${textColor}`}>Simple (Single labor rate)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="laborInputMethod"
                checked={!useSimpleLaborInput}
                onChange={() => setUseSimpleLaborInput(false)}
                className="mr-2"
              />
              <span className={`text-sm ${textColor}`}>Multi-Category (Different labor types)</span>
            </label>
          </div>

          {useSimpleLaborInput ? (
            <>
              <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Labor Requirements</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Direct Labor Hours per Unit
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={directLaborHoursPerUnit}
                    onChange={(e) => setDirectLaborHoursPerUnit(e.target.value)}
                    placeholder="2.5"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Hours of direct labor required to produce one unit
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Hourly Wage Rate ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={hourlyWageRate}
                    onChange={(e) => setHourlyWageRate(e.target.value)}
                    placeholder="25.00"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Average wage rate per hour
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Labor Categories</h3>
              <p className={`text-sm mb-6 ${textColor}`}>
                Add different labor categories with their own hourly requirements and wage rates
              </p>

              {laborCategories.map((category, index) => (
                <div key={index} className={`mb-8 p-6 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className={`text-lg font-semibold ${headingColor}`}>
                      Labor Category {index + 1}
                    </h4>
                    {laborCategories.length > 1 && (
                      <button
                        onClick={() => removeLaborCategory(index)}
                        className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => updateLaborCategory(index, 'name', e.target.value)}
                        placeholder="e.g., Assembly, Finishing"
                        className={`w-full px-4 py-3 border ${inputBg} text-base`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                        Hours per Unit
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={category.hoursPerUnit}
                        onChange={(e) => updateLaborCategory(index, 'hoursPerUnit', e.target.value)}
                        placeholder="1.5"
                        className={`w-full px-4 py-3 border ${inputBg} text-base`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                        Wage Rate per Hour ({currency})
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={category.wageRatePerHour}
                        onChange={(e) => updateLaborCategory(index, 'wageRatePerHour', e.target.value)}
                        placeholder="30.00"
                        className={`w-full px-4 py-3 border ${inputBg} text-base`}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addLaborCategory}
                className={`${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300'} font-medium px-6 py-2 text-sm mb-8`}
              >
                + Add Another Labor Category
              </button>
            </>
          )}

          <hr className={`my-8 ${hrColor}`} />

          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Optional Enhancements</h3>
          <p className={`text-sm mb-6 ${textColor}`}>
            Add wage inflation, overtime, fringe benefits, and workforce planning metrics (all optional)
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Wage Inflation Rate (Quarterly)
              </label>
              <input
                type="number"
                step="0.001"
                value={wageInflationRate}
                onChange={(e) => setWageInflationRate(e.target.value)}
                placeholder="0.01"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                e.g., 0.01 for 1% per quarter
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Fringe Benefit Rate
              </label>
              <input
                type="number"
                step="0.01"
                value={fringeBenefitRate}
                onChange={(e) => setFringeBenefitRate(e.target.value)}
                placeholder="0.25"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                e.g., 0.25 for 25% (health, FICA, etc.)
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Productivity Efficiency Rate
              </label>
              <input
                type="number"
                step="0.01"
                value={productivityEfficiencyRate}
                onChange={(e) => setProductivityEfficiencyRate(e.target.value)}
                placeholder="0.95"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                e.g., 0.95 for 95% efficiency
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Overtime Threshold (Hours/Quarter)
              </label>
              <input
                type="number"
                value={overtimeThreshold}
                onChange={(e) => setOvertimeThreshold(e.target.value)}
                placeholder="Leave blank for no overtime"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                Maximum regular hours before overtime
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                Overtime Multiplier
              </label>
              <input
                type="number"
                step="0.1"
                value={overtimeMultiplier}
                onChange={(e) => setOvertimeMultiplier(e.target.value)}
                placeholder="1.5"
                className={`w-full px-4 py-3 border ${inputBg} text-base`}
              />
              <p className={`text-xs mt-2 ${textColor}`}>
                e.g., 1.5 for time-and-a-half
              </p>
            </div>
          </div>

          <details className="mb-8">
            <summary className={`text-lg font-semibold cursor-pointer ${headingColor} hover:underline mb-4`}>
              Workforce Planning (click to expand)
            </summary>

            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Average Hours per Employee (Quarterly)
                </label>
                <input
                  type="number"
                  value={averageHoursPerEmployee}
                  onChange={(e) => setAverageHoursPerEmployee(e.target.value)}
                  placeholder="480"
                  className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                />
                <p className={`text-xs mt-1 ${textColor}`}>
                  For calculating FTE needed
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Annual Turnover Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={turnoverRate}
                  onChange={(e) => setTurnoverRate(e.target.value)}
                  placeholder="0.15"
                  className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                />
                <p className={`text-xs mt-1 ${textColor}`}>
                  e.g., 0.15 for 15% turnover
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Training Cost per Employee ({currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={trainingCostPerEmployee}
                  onChange={(e) => setTrainingCostPerEmployee(e.target.value)}
                  placeholder="2000"
                  className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                />
              </div>
            </div>
          </details>

          <button
            onClick={handleCalculateLabor}
            className={`${buttonBg} font-medium px-8 py-3 text-lg`}
          >
            Calculate Labor Budget
          </button>

          {laborErrors.length > 0 && (
            <div className="mt-6 space-y-3">
              {laborErrors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {laborErrors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {laborErrors.filter(e => e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Warnings:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {laborErrors.filter(e => e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error.replace('WARNING: ', '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Labor Budget Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Labor Budget Results</h3>
            {laborResult && (
              <button
                onClick={downloadLaborCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!laborResult && (
            <p className="text-lg leading-relaxed">
              Calculate Production Budget first, then enter labor data and click Calculate Labor Budget
            </p>
          )}

          {laborResult && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-6 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear}
              </p>

              {/* Display multi-category tables if applicable */}
              {laborResult.categoryTables && laborResult.categoryTables.map((cat: any, idx: number) => (
                <div key={idx} className="mb-8">
                  <h4 className={`text-xl font-semibold mb-4 ${headingColor}`}>
                    {cat.categoryName}
                  </h4>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                          {cat.headers.map((header: string, hidx: number) => (
                            <th
                              key={hidx}
                              className={`py-3 px-4 text-left font-semibold text-sm ${hidx === 0 ? '' : 'text-right'} ${headingColor}`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cat.rows.map((row: any, ridx: number) => (
                          <tr
                            key={ridx}
                            className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                          >
                            <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                            <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Summary table for multi-category OR main table for simple */}
              {laborResult.summaryRows && (
                <div className="mb-8">
                  <h4 className={`text-xl font-semibold mb-4 ${headingColor}`}>
                    Summary - Total Direct Labor
                  </h4>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                          {laborResult.headers.map((header: string, idx: number) => (
                            <th
                              key={idx}
                              className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {laborResult.summaryRows.map((row: any, idx: number) => (
                          <tr
                            key={idx}
                            className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                          >
                            <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                            <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                            <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Simple single-category main table */}
              {!laborResult.summaryRows && laborResult.rows && (
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        {laborResult.headers.map((header: string, idx: number) => (
                          <th
                            key={idx}
                            className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {laborResult.rows.map((row: any, idx: number) => (
                        <tr
                          key={idx}
                          className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                        >
                          <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                          <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                          <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                          <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                          <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                          <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Additional Metrics */}
              {(laborResult.laborCostPerUnit || laborResult.averageEmployeesNeeded) && (
                <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} mb-6`}>
                  <h4 className={`text-sm font-semibold mb-3 ${headingColor}`}>Analytics</h4>

                  {laborResult.laborCostPerUnit && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Labor Cost per Unit:</strong> {currency} {laborResult.laborCostPerUnit.yearly.toFixed(2)}
                    </p>
                  )}

                  {laborResult.averageEmployeesNeeded && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Average Employees Needed:</strong> {laborResult.averageEmployeesNeeded.yearly.toFixed(1)} FTE
                    </p>
                  )}

                  {laborResult.turnoverCost && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Annual Turnover & Training Cost:</strong> {currency} {laborResult.turnoverCost.yearly.toFixed(2)}
                    </p>
                  )}

                  {laborResult.productivityRate && (
                    <p className={`text-sm ${textColor}`}>
                      <strong>Productivity Efficiency:</strong> {(laborResult.productivityRate.yearly * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
              )}

              <p className="text-lg leading-relaxed">
                ✓ Direct Labor Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Direct Labor Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Direct Labor Budget calculates the hours and costs for direct labor needed to complete the production plan.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Total Direct-Labor Cost = (Units to Produce × Hours per Unit) × Hourly Wage Rate
        </p>

        <hr className={`my-16 ${hrColor}`} />

        {/* SCHEDULE 5: MANUFACTURING OVERHEAD BUDGET */}
        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 5: Manufacturing Overhead Budget
        </h2>
        <p className="text-lg mb-12 leading-relaxed">
          Calculate all manufacturing costs other than direct materials and direct labor
        </p>

        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Overhead Approach</h3>
          <p className={`text-sm mb-4 ${textColor}`}>
            Choose your overhead calculation method
          </p>

          <div className="flex gap-6 mb-8 flex-wrap">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="overheadApproach"
                checked={overheadApproach === 'simple'}
                onChange={() => setOverheadApproach('simple')}
                className="mr-2"
              />
              <span className={`text-sm ${textColor}`}>Simple (Traditional costing)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="overheadApproach"
                checked={overheadApproach === 'abc'}
                onChange={() => setOverheadApproach('abc')}
                className="mr-2"
              />
              <span className={`text-sm ${textColor}`}>Activity-Based Costing (ABC)</span>
            </label>
          </div>

          {overheadApproach === 'simple' && (
            <>
              <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Variable & Fixed Overhead</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Variable Overhead Rate per Unit ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={variableOverheadRatePerUnit}
                    onChange={(e) => setVariableOverheadRatePerUnit(e.target.value)}
                    placeholder="5.00"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Variable overhead cost per unit produced
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Variable Overhead Rate per Labor Hour ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={variableOverheadRatePerLaborHour}
                    onChange={(e) => setVariableOverheadRatePerLaborHour(e.target.value)}
                    placeholder="3.00"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Variable overhead per direct labor hour (requires Schedule 4)
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Fixed Overhead per Quarter ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={fixedOverheadPerQuarter}
                    onChange={(e) => setFixedOverheadPerQuarter(e.target.value)}
                    placeholder="50000"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Fixed overhead costs per quarter
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                    Depreciation per Quarter ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={depreciationPerQuarter}
                    onChange={(e) => setDepreciationPerQuarter(e.target.value)}
                    placeholder="10000"
                    className={`w-full px-4 py-3 border ${inputBg} text-base`}
                  />
                  <p className={`text-xs mt-2 ${textColor}`}>
                    Non-cash depreciation expense
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Allocation Base (for predetermined overhead rate)
                </label>
                <select
                  value={allocationBase}
                  onChange={(e) => setAllocationBase(e.target.value as any)}
                  className={`w-full px-4 py-3 border ${inputBg} text-base`}
                >
                  <option value="units">Units Produced</option>
                  <option value="labor-hours">Direct Labor Hours</option>
                  <option value="machine-hours">Machine Hours</option>
                </select>
              </div>
            </>
          )}

          {overheadApproach === 'abc' && (
            <>
              <h3 className={`text-2xl font-semibold mb-6 ${headingColor}`}>Activity-Based Costing Data</h3>
              <p className={`text-sm mb-6 ${textColor}`}>
                Enter cost driver data for ABC analysis (Unit-level, Batch-level, Facility-level)
              </p>

              <div className="mb-8">
                <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Batch-Level Costs (Production Runs)</h4>
                <div className="grid md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q1 Runs</label>
                    <input
                      type="number"
                      value={productionRunsQ1}
                      onChange={(e) => setProductionRunsQ1(e.target.value)}
                      placeholder="10"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q2 Runs</label>
                    <input
                      type="number"
                      value={productionRunsQ2}
                      onChange={(e) => setProductionRunsQ2(e.target.value)}
                      placeholder="12"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q3 Runs</label>
                    <input
                      type="number"
                      value={productionRunsQ3}
                      onChange={(e) => setProductionRunsQ3(e.target.value)}
                      placeholder="15"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q4 Runs</label>
                    <input
                      type="number"
                      value={productionRunsQ4}
                      onChange={(e) => setProductionRunsQ4(e.target.value)}
                      placeholder="13"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Cost per Run</label>
                    <input
                      type="number"
                      step="0.01"
                      value={costPerProductionRun}
                      onChange={(e) => setCostPerProductionRun(e.target.value)}
                      placeholder="1000"
                      className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                    />
                  </div>
                </div>
              </div>

              <details className="mb-8">
                <summary className={`text-lg font-semibold cursor-pointer ${headingColor} hover:underline mb-4`}>
                  Advanced ABC Inputs (click to expand)
                </summary>

                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className={`text-base font-semibold mb-3 ${headingColor}`}>Product-Level Costs (Inspections)</h4>
                    <div className="grid md:grid-cols-5 gap-4">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q1</label>
                        <input
                          type="number"
                          value={inspectionsQ1}
                          onChange={(e) => setInspectionsQ1(e.target.value)}
                          placeholder="5"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q2</label>
                        <input
                          type="number"
                          value={inspectionsQ2}
                          onChange={(e) => setInspectionsQ2(e.target.value)}
                          placeholder="6"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q3</label>
                        <input
                          type="number"
                          value={inspectionsQ3}
                          onChange={(e) => setInspectionsQ3(e.target.value)}
                          placeholder="7"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Q4</label>
                        <input
                          type="number"
                          value={inspectionsQ4}
                          onChange={(e) => setInspectionsQ4(e.target.value)}
                          placeholder="6"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Cost/Inspection</label>
                        <input
                          type="number"
                          step="0.01"
                          value={costPerInspection}
                          onChange={(e) => setCostPerInspection(e.target.value)}
                          placeholder="500"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-base font-semibold mb-3 ${headingColor}`}>Facility-Level Costs (Quarterly)</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Facility Rent</label>
                        <input
                          type="number"
                          step="0.01"
                          value={facilityRent}
                          onChange={(e) => setFacilityRent(e.target.value)}
                          placeholder="20000"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Facility Insurance</label>
                        <input
                          type="number"
                          step="0.01"
                          value={facilityInsurance}
                          onChange={(e) => setFacilityInsurance(e.target.value)}
                          placeholder="5000"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Property Taxes</label>
                        <input
                          type="number"
                          step="0.01"
                          value={propertyTaxes}
                          onChange={(e) => setPropertyTaxes(e.target.value)}
                          placeholder="3000"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Supervisory Salaries</label>
                        <input
                          type="number"
                          step="0.01"
                          value={supervisorySalaries}
                          onChange={(e) => setSupervisorySalaries(e.target.value)}
                          placeholder="15000"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Support Staff</label>
                        <input
                          type="number"
                          step="0.01"
                          value={supportStaffSalaries}
                          onChange={(e) => setSupportStaffSalaries(e.target.value)}
                          placeholder="10000"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Depreciation</label>
                        <input
                          type="number"
                          step="0.01"
                          value={depreciationPerQuarter}
                          onChange={(e) => setDepreciationPerQuarter(e.target.value)}
                          placeholder="10000"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-base font-semibold mb-3 ${headingColor}`}>Unit-Level Costs</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Indirect Materials per Unit</label>
                        <input
                          type="number"
                          step="0.01"
                          value={indirectMaterialsPerUnit}
                          onChange={(e) => setIndirectMaterialsPerUnit(e.target.value)}
                          placeholder="2.50"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${headingColor}`}>Quality Control per Unit</label>
                        <input
                          type="number"
                          step="0.01"
                          value={qualityControlPerUnit}
                          onChange={(e) => setQualityControlPerUnit(e.target.value)}
                          placeholder="1.50"
                          className={`w-full px-3 py-2 border ${inputBg} text-sm`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </>
          )}

          <button
            onClick={handleCalculateOverhead}
            className={`${buttonBg} font-medium px-8 py-3 text-lg mt-4`}
          >
            Calculate Manufacturing Overhead
          </button>

          {overheadErrors.length > 0 && (
            <div className="mt-6 space-y-3">
              {overheadErrors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
                <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                  <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    Errors:
                  </p>
                  <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                    {overheadErrors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        {/* Overhead Budget Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>Manufacturing Overhead Results</h3>
            {overheadResult && (
              <button
                onClick={downloadOverheadCSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!overheadResult && (
            <p className="text-lg leading-relaxed">
              Calculate Production Budget first, then enter overhead data and click Calculate Manufacturing Overhead
            </p>
          )}

          {overheadResult && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-6 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear}
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      {overheadResult.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {overheadResult.rows.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                      >
                        <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q1}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q2}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q3}</td>
                        <td className="py-3 px-4 text-right text-sm font-mono">{row.q4}</td>
                        <td className="py-3 px-4 text-right text-sm font-semibold font-mono">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {overheadResult.overheadPerUnit && (
                <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} mb-6`}>
                  <h4 className={`text-sm font-semibold mb-3 ${headingColor}`}>Cost Metrics</h4>
                  <p className={`text-sm mb-2 ${textColor}`}>
                    <strong>Overhead per Unit:</strong> {currency} {overheadResult.overheadPerUnit.yearly.toFixed(2)}
                  </p>
                  {overheadResult.predeterminedRate && (
                    <p className={`text-sm ${textColor}`}>
                      <strong>Predetermined Overhead Rate:</strong> {currency} {overheadResult.predeterminedRate.toFixed(2)} per {allocationBase === 'units' ? 'unit' : allocationBase === 'labor-hours' ? 'labor hour' : 'machine hour'}
                    </p>
                  )}
                </div>
              )}

              <p className="text-lg leading-relaxed">
                ✓ Manufacturing Overhead Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the Manufacturing Overhead Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Manufacturing Overhead Budget calculates all manufacturing costs other than direct materials and direct labor, including indirect materials, indirect labor, utilities, depreciation, and facility costs.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Total Manufacturing Overhead = Variable Overhead + Fixed Overhead; Cash Disbursements = Total Overhead − Depreciation
        </p>

        <hr className={`my-12 ${hrColor}`} />

        {/* ============================================ */}
        {/* SCHEDULE 6: SG&A EXPENSE BUDGET */}
        {/* ============================================ */}

        <h2 className={`text-4xl font-bold mb-4 ${headingColor}`}>
          Schedule 6: Selling, General & Administrative (SG&A) Expense Budget
        </h2>
        <p className="text-lg mb-8 leading-relaxed">
          The SG&A Expense Budget plans all non-manufacturing operating expenses including sales commissions, marketing, distribution, and administrative costs.
        </p>

        {/* Approach Selection */}
        <div className="mb-8">
          <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Select Approach</h4>
          <div className="flex gap-6 mb-4 flex-wrap">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sgaApproach"
                checked={sgaApproach === 'simple'}
                onChange={() => setSgaApproach('simple')}
                className="mr-2"
              />
              <span>Simple (Percentage-based)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sgaApproach"
                checked={sgaApproach === 'detailed'}
                onChange={() => setSgaApproach('detailed')}
                className="mr-2"
              />
              <span>Detailed (Line-by-line)</span>
            </label>
          </div>
        </div>

        {/* Simple Approach Form */}
        {sgaApproach === 'simple' && (
          <div className="mb-8">
            <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Simple Approach Inputs</h4>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Variable Selling Expense Rate (% of sales)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={variableSellingExpenseRate}
                  onChange={(e) => setVariableSellingExpenseRate(e.target.value)}
                  placeholder="0.05 (5%)"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Variable Admin Expense Rate (% of sales)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={variableAdminExpenseRate}
                  onChange={(e) => setVariableAdminExpenseRate(e.target.value)}
                  placeholder="0.03 (3%)"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Fixed Selling Expense per Quarter ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fixedSellingExpensePerQuarter}
                  onChange={(e) => setFixedSellingExpensePerQuarter(e.target.value)}
                  placeholder="50000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Fixed Admin Expense per Quarter ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fixedAdminExpensePerQuarter}
                  onChange={(e) => setFixedAdminExpensePerQuarter(e.target.value)}
                  placeholder="75000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Detailed Approach Form */}
        {sgaApproach === 'detailed' && (
          <div className="mb-8">
            <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Selling Expenses</h4>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Commission Rate (% of revenue)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  placeholder="0.05 (5%)"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Distribution Cost per Unit ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={distributionCostPerUnit}
                  onChange={(e) => setDistributionCostPerUnit(e.target.value)}
                  placeholder="2.50"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Distribution Fixed Cost per Quarter ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={distributionFixedCostPerQuarter}
                  onChange={(e) => setDistributionFixedCostPerQuarter(e.target.value)}
                  placeholder="15000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Customer Service Salaries per Quarter ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={customerServiceSalaries}
                  onChange={(e) => setCustomerServiceSalaries(e.target.value)}
                  placeholder="25000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Warranty Expense per Unit ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={warrantyExpensePerUnit}
                  onChange={(e) => setWarrantyExpensePerUnit(e.target.value)}
                  placeholder="1.00"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>
            </div>

            <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Marketing Expenses (per Quarter)</h4>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Advertising Budget ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={advertisingBudgetPerQuarter}
                  onChange={(e) => setAdvertisingBudgetPerQuarter(e.target.value)}
                  placeholder="20000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Brand Development ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={brandDevelopmentPerQuarter}
                  onChange={(e) => setBrandDevelopmentPerQuarter(e.target.value)}
                  placeholder="10000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Marketing Campaigns ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={marketingCampaignsPerQuarter}
                  onChange={(e) => setMarketingCampaignsPerQuarter(e.target.value)}
                  placeholder="15000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>
            </div>

            <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Administrative Expenses (per Quarter)</h4>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Executive Salaries ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={executiveSalaries}
                  onChange={(e) => setExecutiveSalaries(e.target.value)}
                  placeholder="150000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Finance Salaries ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={financeSalaries}
                  onChange={(e) => setFinanceSalaries(e.target.value)}
                  placeholder="50000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  HR Salaries ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={hrSalaries}
                  onChange={(e) => setHrSalaries(e.target.value)}
                  placeholder="40000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  IT Salaries ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={itSalaries}
                  onChange={(e) => setItSalaries(e.target.value)}
                  placeholder="60000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Office Rent ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={officeRentPerQuarter}
                  onChange={(e) => setOfficeRentPerQuarter(e.target.value)}
                  placeholder="30000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Utilities ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={utilitiesPerQuarter}
                  onChange={(e) => setUtilitiesPerQuarter(e.target.value)}
                  placeholder="5000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Software Licenses ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={softwareLicensesPerQuarter}
                  onChange={(e) => setSoftwareLicensesPerQuarter(e.target.value)}
                  placeholder="10000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Telecommunications ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={telecommunicationsPerQuarter}
                  onChange={(e) => setTelecommunicationsPerQuarter(e.target.value)}
                  placeholder="3000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Office Supplies ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={officeSuppliesPerQuarter}
                  onChange={(e) => setOfficeSuppliesPerQuarter(e.target.value)}
                  placeholder="2000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Legal Fees ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={legalFeesPerQuarter}
                  onChange={(e) => setLegalFeesPerQuarter(e.target.value)}
                  placeholder="8000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Bad Debt Rate (% of sales)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={badDebtRate}
                  onChange={(e) => setBadDebtRate(e.target.value)}
                  placeholder="0.02 (2%)"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${headingColor}`}>
                  Depreciation - Office Equipment ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={depreciationOfficeEquipment}
                  onChange={(e) => setDepreciationOfficeEquipment(e.target.value)}
                  placeholder="5000"
                  className={`w-full px-4 py-2 border ${inputBg}`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={handleCalculateSGA}
          className={`${buttonBg} font-medium px-6 py-3 mb-6`}
        >
          Calculate SG&A Expenses
        </button>

        {/* Error Display */}
        {sgaErrors.length > 0 && (
          <div className="mt-6 space-y-3">
            {sgaErrors.filter(e => !e.startsWith('WARNING:')).length > 0 && (
              <div className={`p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                  Errors:
                </p>
                <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                  {sgaErrors.filter(e => !e.startsWith('WARNING:')).map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {sgaErrors.filter(e => e.startsWith('WARNING:')).length > 0 && (
              <div className={`p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  Warnings:
                </p>
                <ul className={`list-disc list-inside text-xs space-y-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  {sgaErrors.filter(e => e.startsWith('WARNING:')).map((warning, idx) => (
                    <li key={idx}>{warning.replace('WARNING: ', '')}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SGA Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${headingColor}`}>SG&A Expense Results</h3>
            {sgaResult && (
              <button
                onClick={downloadSGACSV}
                className={`${buttonBg} font-medium px-6 py-2 text-sm`}
              >
                Download CSV
              </button>
            )}
          </div>

          {!sgaResult && (
            <p className="text-lg leading-relaxed">
              Calculate Sales Budget first, then enter SG&A data and click Calculate SG&A Expenses
            </p>
          )}

          {sgaResult && (
            <div>
              <p className={`text-lg mb-2 ${headingColor}`}>
                <strong>{companyName || 'Your Company'}</strong> — {productName || 'Product'}
              </p>
              <p className={`text-sm mb-6 ${textColor}`}>
                For the Year Ending December 31, {fiscalYear}
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      {sgaResult.headers.map((header: string, idx: number) => (
                        <th
                          key={idx}
                          className={`py-3 px-4 text-left font-semibold text-sm ${idx === 0 ? '' : 'text-right'} ${headingColor}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sgaResult.rows.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                      >
                        <td className={`py-3 px-4 text-sm ${headingColor}`}>{row.label}</td>
                        <td className="py-3 px-4 text-sm text-right">{row.q1}</td>
                        <td className="py-3 px-4 text-sm text-right">{row.q2}</td>
                        <td className="py-3 px-4 text-sm text-right">{row.q3}</td>
                        <td className="py-3 px-4 text-sm text-right">{row.q4}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{row.yearly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {sgaResult.sgaAsPercentOfSales && (
                <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'} mb-6`}>
                  <h4 className={`text-sm font-semibold mb-3 ${headingColor}`}>SG&A Metrics</h4>
                  <p className={`text-sm mb-2 ${textColor}`}>
                    <strong>SG&A as % of Sales (Yearly):</strong> {(sgaResult.sgaAsPercentOfSales.yearly * 100).toFixed(2)}%
                  </p>
                  {sgaResult.variableSGAPerUnit && (
                    <p className={`text-sm mb-2 ${textColor}`}>
                      <strong>Variable SG&A per Unit:</strong> {currency} {sgaResult.variableSGAPerUnit.yearly.toFixed(2)}
                    </p>
                  )}
                  {sgaResult.totalSGAPerUnit && (
                    <p className={`text-sm ${textColor}`}>
                      <strong>Total SG&A per Unit:</strong> {currency} {sgaResult.totalSGAPerUnit.yearly.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              <p className="text-lg leading-relaxed">
                ✓ SG&A Expense Budget calculated successfully
              </p>
            </div>
          )}
        </div>

        <hr className={`my-12 ${hrColor}`} />

        <h3 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
          About the SG&A Expense Budget
        </h3>
        <p className="text-lg mb-4 leading-relaxed">
          The Selling, General & Administrative Expense Budget plans all non-manufacturing operating expenses including sales commissions, marketing, distribution, and administrative overhead.
        </p>
        <p className="text-base leading-relaxed">
          <strong>Formula:</strong> Total SG&A = Variable Expenses + Fixed Expenses; Variable includes commissions and distribution; Fixed includes salaries, rent, and utilities
        </p>
      </main>

      <footer className={`max-w-5xl mx-auto px-6 py-12 border-t ${hrColor} text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© 2025 Budget Automation System</p>
      </footer>
    </div>
  );
}
