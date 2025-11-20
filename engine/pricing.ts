/**
 * Pricing Engine for Virtual Meme Exposure
 * 
 * Core Principle: Mathematical, transparent pricing without manipulation
 * No bonding curves, no fake liquidity - pure exposure pricing
 */

export interface PricingParameters {
  basePrice: number;        // Base price in ETH
  volatility: number;       // Volatility factor (0-1)
  activityScore: number;    // Community activity (0-1)
  totalExposure: number;    // Total exposure in ETH
}

export interface PriceQuote {
  price: number;            // Current price in ETH
  slippage: number;         // Expected slippage %
  timestamp: number;        // Quote timestamp
}

/**
 * Calculate current virtual price for a meme
 * @param params Pricing parameters
 * @returns Current price in ETH
 */
export function calculatePrice(params: PricingParameters): number {
  const { basePrice, volatility, activityScore, totalExposure } = params;
  
  // Simple exposure-based pricing model
  // In production, this would be more sophisticated
  const exposureFactor = 1 + (totalExposure / 1000); // Scale factor
  const activityMultiplier = 0.5 + (activityScore * 0.5); // 0.5x to 1x
  const volatilityAdjustment = 1 + (volatility * 0.1); // Up to 10% variance
  
  const price = basePrice * exposureFactor * activityMultiplier * volatilityAdjustment;
  
  return Math.max(price, 0.000001); // Minimum price floor
}

/**
 * Calculate price impact for a given exposure amount
 * @param currentPrice Current price in ETH
 * @param exposureAmount Amount of exposure to take (in ETH)
 * @param totalExposure Current total exposure
 * @returns Price impact percentage
 */
export function calculatePriceImpact(
  currentPrice: number,
  exposureAmount: number,
  totalExposure: number
): number {
  if (totalExposure === 0) return 0;
  
  // Simple linear impact model
  const impactPercent = (exposureAmount / totalExposure) * 100;
  
  // Cap impact at reasonable levels
  return Math.min(impactPercent, 50);
}

/**
 * Get price quote for opening a position
 * @param params Current pricing parameters
 * @param exposureAmount Amount of exposure desired (in ETH)
 * @returns Price quote with slippage
 */
export function getPriceQuote(
  params: PricingParameters,
  exposureAmount: number
): PriceQuote {
  const currentPrice = calculatePrice(params);
  const slippage = calculatePriceImpact(
    currentPrice,
    exposureAmount,
    params.totalExposure
  );
  
  return {
    price: currentPrice,
    slippage,
    timestamp: Date.now(),
  };
}

/**
 * Calculate entry price with slippage applied
 * @param quote Price quote
 * @returns Effective entry price
 */
export function getEffectivePrice(quote: PriceQuote): number {
  return quote.price * (1 + quote.slippage / 100);
}

/**
 * Validate pricing parameters
 * @param params Parameters to validate
 * @returns True if valid
 */
export function validatePricingParams(params: PricingParameters): boolean {
  return (
    params.basePrice > 0 &&
    params.volatility >= 0 &&
    params.volatility <= 1 &&
    params.activityScore >= 0 &&
    params.activityScore <= 1 &&
    params.totalExposure >= 0
  );
}
