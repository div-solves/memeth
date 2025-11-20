/**
 * Exposure Management Engine
 * 
 * Manages virtual positions without any token transfers
 * Pure accounting of exposure, risk, and PnL
 */

export interface Position {
  id: string;
  userId: string;
  memeId: number;
  exposureAmount: number;    // Amount in ETH
  entryPrice: number;        // Entry price in ETH
  openTimestamp: number;
  status: 'open' | 'closed';
}

export interface PositionPnL {
  position: Position;
  currentPrice: number;
  pnl: number;               // Profit/Loss in ETH
  pnlPercent: number;        // PnL percentage
  roi: number;               // Return on investment
}

/**
 * Calculate PnL for an open position
 * @param position The position
 * @param currentPrice Current market price
 * @returns Position PnL details
 */
export function calculatePositionPnL(
  position: Position,
  currentPrice: number
): PositionPnL {
  if (position.status !== 'open') {
    throw new Error('Position is not open');
  }
  
  const priceChange = currentPrice - position.entryPrice;
  const pnl = (priceChange / position.entryPrice) * position.exposureAmount;
  const pnlPercent = (priceChange / position.entryPrice) * 100;
  const roi = pnl / position.exposureAmount;
  
  return {
    position,
    currentPrice,
    pnl,
    pnlPercent,
    roi,
  };
}

/**
 * Calculate total exposure for a meme
 * @param positions All open positions for the meme
 * @returns Total exposure in ETH
 */
export function calculateTotalExposure(positions: Position[]): number {
  return positions
    .filter(p => p.status === 'open')
    .reduce((sum, p) => sum + p.exposureAmount, 0);
}

/**
 * Calculate user's total exposure across all memes
 * @param positions User's positions
 * @returns Total exposure in ETH
 */
export function calculateUserTotalExposure(positions: Position[]): number {
  return positions
    .filter(p => p.status === 'open')
    .reduce((sum, p) => sum + p.exposureAmount, 0);
}

/**
 * Calculate user's portfolio PnL
 * @param positions User's positions
 * @param currentPrices Map of meme ID to current price
 * @returns Portfolio PnL in ETH
 */
export function calculatePortfolioPnL(
  positions: Position[],
  currentPrices: Map<number, number>
): number {
  let totalPnL = 0;
  
  for (const position of positions) {
    if (position.status !== 'open') continue;
    
    const currentPrice = currentPrices.get(position.memeId);
    if (!currentPrice) continue;
    
    const positionPnL = calculatePositionPnL(position, currentPrice);
    totalPnL += positionPnL.pnl;
  }
  
  return totalPnL;
}

/**
 * Validate position opening request
 * @param userBalance User's available balance
 * @param exposureAmount Requested exposure
 * @param minExposure Minimum allowed exposure
 * @param maxExposure Maximum allowed exposure
 * @returns Validation result
 */
export function validatePositionOpen(
  userBalance: number,
  exposureAmount: number,
  minExposure: number = 0.001, // 0.001 ETH minimum
  maxExposure: number = 10      // 10 ETH maximum per position
): { valid: boolean; error?: string } {
  if (exposureAmount < minExposure) {
    return {
      valid: false,
      error: `Exposure below minimum: ${minExposure} ETH`,
    };
  }
  
  if (exposureAmount > maxExposure) {
    return {
      valid: false,
      error: `Exposure above maximum: ${maxExposure} ETH`,
    };
  }
  
  if (exposureAmount > userBalance) {
    return {
      valid: false,
      error: 'Insufficient balance',
    };
  }
  
  return { valid: true };
}

/**
 * Calculate position duration in hours
 * @param position The position
 * @returns Duration in hours
 */
export function getPositionDuration(position: Position): number {
  const now = Date.now();
  const durationMs = now - position.openTimestamp;
  return durationMs / (1000 * 60 * 60); // Convert to hours
}

/**
 * Get position age category
 * @param position The position
 * @returns Age category
 */
export function getPositionAgeCategory(position: Position): string {
  const hours = getPositionDuration(position);
  
  if (hours < 1) return 'fresh';
  if (hours < 24) return 'day';
  if (hours < 168) return 'week';
  return 'old';
}
