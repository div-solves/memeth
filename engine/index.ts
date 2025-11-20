/**
 * MEMETH Engine - Main Entry Point
 * 
 * Offchain calculation engine for virtual meme exposure
 * No tokens, no bonding curves - pure mathematical modeling
 */

// Export all engine modules
export * from './pricing';
export * from './exposure';
export * from './simulation';

/**
 * Engine version
 */
export const ENGINE_VERSION = '0.1.0';

/**
 * Engine configuration
 */
export interface EngineConfig {
  minExposure: number;        // Minimum position size in ETH
  maxExposure: number;        // Maximum position size in ETH
  defaultVolatility: number;  // Default volatility (0-1)
  basePrice: number;          // Base starting price in ETH
  riskTolerance: number;      // Default risk tolerance (0-1)
}

/**
 * Default engine configuration
 */
export const DEFAULT_CONFIG: EngineConfig = {
  minExposure: 0.001,         // 0.001 ETH (~$2 at $2000/ETH)
  maxExposure: 10,            // 10 ETH per position
  defaultVolatility: 0.3,     // 30% volatility
  basePrice: 0.0001,          // 0.0001 ETH starting price
  riskTolerance: 0.05,        // 5% of balance at risk
};

/**
 * Engine status interface
 */
export interface EngineStatus {
  version: string;
  healthy: boolean;
  config: EngineConfig;
  timestamp: number;
}

/**
 * Get engine status
 * @param config Engine configuration
 * @returns Engine status
 */
export function getEngineStatus(config: EngineConfig = DEFAULT_CONFIG): EngineStatus {
  return {
    version: ENGINE_VERSION,
    healthy: true,
    config,
    timestamp: Date.now(),
  };
}

/**
 * Validate engine configuration
 * @param config Configuration to validate
 * @returns True if valid
 */
export function validateConfig(config: EngineConfig): boolean {
  return (
    config.minExposure > 0 &&
    config.maxExposure > config.minExposure &&
    config.defaultVolatility >= 0 &&
    config.defaultVolatility <= 1 &&
    config.basePrice > 0 &&
    config.riskTolerance >= 0 &&
    config.riskTolerance <= 1
  );
}

/**
 * Engine initialization
 */
export function initializeEngine(config: EngineConfig = DEFAULT_CONFIG): void {
  if (!validateConfig(config)) {
    throw new Error('Invalid engine configuration');
  }
  
  console.log('MEMETH Engine initialized');
  console.log(`Version: ${ENGINE_VERSION}`);
  console.log(`Config:`, config);
}
