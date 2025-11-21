/**
 * CoinStats Component
 * Displays key statistics for a memecoin
 * 
 * Features:
 * - Holders count
 * - 24h Volume
 * - Market cap (virtual)
 * - Total exposure
 * - Activity score
 * - Price change
 * 
 * TODO: Connect to contract for real data
 */

interface CoinStatsProps {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  holders: number;
  volume24h: number;
  totalExposure: number;
  activityScore: number;
  marketCap?: number;
}

export default function CoinStats({
  symbol,
  name,
  currentPrice,
  priceChange24h,
  holders,
  volume24h,
  totalExposure,
  activityScore,
  marketCap,
}: CoinStatsProps) {
  const isPriceUp = priceChange24h >= 0;
  
  // Calculate market cap if not provided (mock calculation)
  const calculatedMarketCap = marketCap || currentPrice * totalExposure * 1000;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  return (
    <div className="coin-stats">
      {/* Header */}
      <div className="stats-header">
        <div className="coin-info">
          <h2 className="coin-name">{name}</h2>
          <div className="coin-symbol">${symbol}</div>
        </div>
        
        <div className="price-info">
          <div className="current-price">{currentPrice.toFixed(6)} ETH</div>
          <div className={`price-change ${isPriceUp ? 'positive' : 'negative'}`}>
            {isPriceUp ? '▲' : '▼'} {Math.abs(priceChange24h).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Holders</div>
            <div className="stat-value">{formatNumber(holders)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">{volume24h.toFixed(2)} ETH</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <div className="stat-label">Total Exposure</div>
            <div className="stat-value">{totalExposure.toFixed(2)} ETH</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-label">Activity Score</div>
            <div className="stat-value">
              {(activityScore * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Virtual Market Cap</div>
            <div className="stat-value">{formatNumber(calculatedMarketCap)} ETH</div>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">💸</div>
          <div className="stat-content">
            <div className="stat-label">Platform Fee</div>
            <div className="stat-value">0.5%</div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="stats-footer">
        <div className="info-badge">
          <span className="badge-icon">ℹ️</span>
          <span className="badge-text">
            Virtual exposure only • No ERC20 tokens • Settles in ETH
          </span>
        </div>
      </div>

      <style jsx>{`
        .coin-stats {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .coin-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .coin-name {
          font-size: 2rem;
          font-weight: 900;
          color: #333;
          margin: 0;
        }

        .coin-symbol {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          width: fit-content;
        }

        .price-info {
          text-align: right;
        }

        .current-price {
          font-size: 2.5rem;
          font-weight: 900;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .price-change {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .price-change.positive {
          background: #d1fae5;
          color: #059669;
        }

        .price-change.negative {
          background: #fee2e2;
          color: #dc2626;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 15px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
        }

        .stat-card.highlight {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border-color: #667eea;
        }

        .stat-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #666;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.3rem;
          font-weight: 700;
          color: #333;
        }

        .stats-footer {
          padding-top: 1.5rem;
          border-top: 2px solid #e5e7eb;
        }

        .info-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #fef3c7;
          border: 2px solid #fbbf24;
          border-radius: 12px;
          padding: 1rem 1.5rem;
        }

        .badge-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .badge-text {
          color: #78350f;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .stats-header {
            flex-direction: column;
            gap: 1.5rem;
          }

          .price-info {
            text-align: left;
          }

          .coin-name {
            font-size: 1.5rem;
          }

          .current-price {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .info-badge {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
