import { useState } from 'react';

/**
 * MemeCard Component
 * Displays a meme with its current stats and trading interface
 * pump.fun-inspired design without the scam mechanics
 */

interface MemeCardProps {
  id: number;
  name: string;
  symbol: string;
  imageUri: string;
  currentPrice: number;
  priceChange: number;
  totalExposure: number;
  activityScore: number;
}

export default function MemeCard({
  id,
  name,
  symbol,
  imageUri,
  currentPrice,
  priceChange,
  totalExposure,
  activityScore,
}: MemeCardProps) {
  const [exposureAmount, setExposureAmount] = useState('');

  const handleOpenPosition = () => {
    console.log(`Opening position: ${exposureAmount} ETH on ${symbol}`);
    // Will be connected to engine in production
  };

  const priceChangeColor = priceChange >= 0 ? '#10b981' : '#ef4444';

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUri} alt={name} />
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{name}</h3>
          <span className="card-symbol">${symbol}</span>
        </div>

        <div className="card-stats">
          <div className="stat">
            <span className="stat-label">Price</span>
            <span className="stat-value">{currentPrice.toFixed(6)} ETH</span>
          </div>
          
          <div className="stat">
            <span className="stat-label">24h</span>
            <span className="stat-value" style={{ color: priceChangeColor }}>
              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
          
          <div className="stat">
            <span className="stat-label">Exposure</span>
            <span className="stat-value">{totalExposure.toFixed(2)} ETH</span>
          </div>
          
          <div className="stat">
            <span className="stat-label">Activity</span>
            <span className="stat-value">
              {'🔥'.repeat(Math.ceil(activityScore * 5))}
            </span>
          </div>
        </div>

        <div className="card-actions">
          <input
            type="number"
            placeholder="ETH amount"
            value={exposureAmount}
            onChange={(e) => setExposureAmount(e.target.value)}
            className="input"
            min="0.001"
            step="0.001"
          />
          <button onClick={handleOpenPosition} className="btn btn-primary">
            Open Position
          </button>
        </div>

        <div className="card-footer">
          <small>Virtual exposure • Settled in ETH</small>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-title {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
        }

        .card-symbol {
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .card-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #999;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .input:focus {
          border-color: #667eea;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .card-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .card-footer small {
          color: #999;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
