/**
 * Risk Simulation Engine
 * 
 * Simulates market scenarios and risk factors
 * Helps understand potential outcomes without real risk
 */

import { Position, calculatePositionPnL } from './exposure';
import { PricingParameters, calculatePrice } from './pricing';

export interface SimulationScenario {
  name: string;
  priceChange: number;      // Percentage change
  description: string;
}

export interface SimulationResult {
  scenario: SimulationScenario;
  finalPrice: number;
  pnl: number;
  pnlPercent: number;
  balanceChange: number;
}

/**
 * Predefined market scenarios
 */
export const SCENARIOS: SimulationScenario[] = [
  {
    name: 'moon',
    priceChange: 100,
    description: 'Price doubles (100% gain)',
  },
  {
    name: 'pump',
    priceChange: 50,
    description: 'Strong pump (50% gain)',
  },
  {
    name: 'moderate_gain',
    priceChange: 25,
    description: 'Moderate gain (25%)',
  },
  {
    name: 'flat',
    priceChange: 0,
    description: 'No change',
  },
  {
    name: 'moderate_loss',
    priceChange: -25,
    description: 'Moderate loss (-25%)',
  },
  {
    name: 'dump',
    priceChange: -50,
    description: 'Heavy dump (-50%)',
  },
  {
    name: 'crash',
    priceChange: -75,
    description: 'Severe crash (-75%)',
  },
];

/**
 * Simulate position outcome for a scenario
 * @param position The position to simulate
 * @param scenario Market scenario
 * @returns Simulation result
 */
export function simulatePosition(
  position: Position,
  scenario: SimulationScenario
): SimulationResult {
  const finalPrice = position.entryPrice * (1 + scenario.priceChange / 100);
  const positionPnL = calculatePositionPnL(position, finalPrice);
  
  return {
    scenario,
    finalPrice,
    pnl: positionPnL.pnl,
    pnlPercent: positionPnL.pnlPercent,
    balanceChange: positionPnL.pnl,
  };
}

/**
 * Run multiple scenario simulations
 * @param position The position
 * @param scenarios Scenarios to test (defaults to all)
 * @returns Array of simulation results
 */
export function runSimulations(
  position: Position,
  scenarios: SimulationScenario[] = SCENARIOS
): SimulationResult[] {
  return scenarios.map(scenario => simulatePosition(position, scenario));
}

/**
 * Calculate Value at Risk (VaR)
 * @param position The position
 * @param confidenceLevel Confidence level (e.g., 0.95 for 95%)
 * @returns Maximum expected loss at given confidence
 */
export function calculateVaR(
  position: Position,
  confidenceLevel: number = 0.95
): number {
  // Simple VaR calculation based on exposure
  // In production, this would use historical volatility
  const assumedMaxLoss = 0.5; // Assume max 50% loss
  const var95 = position.exposureAmount * assumedMaxLoss;
  
  return var95;
}

/**
 * Calculate maximum possible loss
 * @param position The position
 * @returns Maximum loss amount (equals exposure)
 */
export function calculateMaxLoss(position: Position): number {
  // In a virtual exposure system, max loss is the exposure amount
  return position.exposureAmount;
}

/**
 * Calculate risk-reward ratio
 * @param exposureAmount Position size
 * @param targetProfit Target profit amount
 * @param stopLoss Stop loss amount
 * @returns Risk-reward ratio
 */
export function calculateRiskRewardRatio(
  exposureAmount: number,
  targetProfit: number,
  stopLoss: number
): number {
  if (stopLoss === 0) return Infinity;
  return targetProfit / stopLoss;
}

/**
 * Suggest position size based on risk tolerance
 * @param userBalance User's total balance
 * @param riskPercent Percentage of balance to risk (e.g., 0.05 for 5%)
 * @returns Suggested position size
 */
export function suggestPositionSize(
  userBalance: number,
  riskPercent: number = 0.05
): number {
  return userBalance * riskPercent;
}

/**
 * Simulate price evolution over time
 * @param params Current pricing parameters
 * @param steps Number of time steps
 * @param volatility Volatility factor
 * @returns Array of simulated prices
 */
export function simulatePriceEvolution(
  params: PricingParameters,
  steps: number = 100,
  volatility: number = 0.02
): number[] {
  const prices: number[] = [];
  let currentPrice = calculatePrice(params);
  prices.push(currentPrice);
  
  for (let i = 1; i < steps; i++) {
    // Simple random walk simulation
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    currentPrice = currentPrice * (1 + randomChange);
    currentPrice = Math.max(currentPrice, 0.000001); // Floor
    prices.push(currentPrice);
  }
  
  return prices;
}

/**
 * Calculate break-even price
 * @param entryPrice Entry price
 * @param fees Total fees (as decimal, e.g., 0.01 for 1%)
 * @returns Break-even price
 */
export function calculateBreakEven(
  entryPrice: number,
  fees: number = 0
): number {
  return entryPrice * (1 + fees);
}
