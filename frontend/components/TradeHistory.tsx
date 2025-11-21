import { useState } from 'react';

/**
 * TradeHistory Component
 * Displays trade feed with filtering options
 * 
 * Features:
 * - Per-coin or global trade history
 * - Real-time trade feed
 * - Filter by trade type (open/close)
 * - Shows time, user, direction, amount, price, fee
 * 
 * TODO: Connect to contract events/API for real trades
 * TODO: Add pagination for large histories
 */

interface Trade {
  id: number;
  timestamp: Date;
  user: string;
  symbol: string;
  type: 'open' | 'close';
  amount: number;
  price: number;
  fee: number;
  pnl?: number;
}

interface TradeHistoryProps {
  symbol?: string; // If provided, show only trades for this symbol
  maxTrades?: number;
}

export default function TradeHistory({ symbol, maxTrades = 50 }: TradeHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'open' | 'close'>('all');

  // Mock trade data - TODO: Replace with real contract events
  const mockTrades: Trade[] = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 2 * 60000),
      user: '0x1234...5678',
      symbol: 'MOON',
      type: 'open',
      amount: 0.5,
      price: 0.0001,
      fee: 0.0000025,
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 5 * 60000),
      user: '0xabcd...ef01',
      symbol: 'LASER',
      type: 'close',
      amount: 1.2,
      price: 0.00005,
      fee: 0.000003,
      pnl: 0.034,
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 8 * 60000),
      user: '0x9876...5432',
      symbol: 'MOON',
      type: 'open',
      amount: 2.0,
      price: 0.000095,
      fee: 0.00001,
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 15 * 60000),
      user: '0x5555...4444',
      symbol: 'SHIB',
      type: 'open',
      amount: 0.1,
      price: 0.00001,
      fee: 0.0000005,
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 22 * 60000),
      user: '0x3333...2222',
      symbol: 'MOON',
      type: 'close',
      amount: 0.75,
      price: 0.00012,
      fee: 0.000045,
      pnl: 0.0187,
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 30 * 60000),
      user: '0x7777...8888',
      symbol: 'CHAD',
      type: 'open',
      amount: 1.5,
      price: 0.00012,
      fee: 0.0000075,
    },
  ];

  // Filter trades
  const filteredTrades = mockTrades
    .filter((trade) => !symbol || trade.symbol === symbol)
    .filter((trade) => filter === 'all' || trade.type === filter)
    .slice(0, maxTrades);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="trade-history">
      <div className="history-header">
        <h3 className="history-title">
          {symbol ? `${symbol} Trade History` : 'Recent Trades'}
        </h3>
        
        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'open' ? 'active' : ''}`}
            onClick={() => setFilter('open')}
          >
            📈 Opens
          </button>
          <button
            className={`filter-btn ${filter === 'close' ? 'active' : ''}`}
            onClick={() => setFilter('close')}
          >
            📉 Closes
          </button>
        </div>
      </div>

      {/* Trade List */}
      <div className="trade-list">
        {filteredTrades.length > 0 ? (
          filteredTrades.map((trade) => (
            <div key={trade.id} className="trade-item">
              <div className="trade-main">
                <div className="trade-info">
                  <span className={`trade-type ${trade.type}`}>
                    {trade.type === 'open' ? '📈 OPEN' : '📉 CLOSE'}
                  </span>
                  {!symbol && (
                    <span className="trade-symbol">${trade.symbol}</span>
                  )}
                  <span className="trade-user">{trade.user}</span>
                </div>
                
                <div className="trade-time">{formatTime(trade.timestamp)}</div>
              </div>

              <div className="trade-details">
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">{trade.amount.toFixed(4)} ETH</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{trade.price.toFixed(6)} ETH</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Fee (0.5%):</span>
                  <span className="detail-value fee">{trade.fee.toFixed(6)} ETH</span>
                </div>
                {trade.pnl !== undefined && (
                  <div className="detail-row">
                    <span className="detail-label">P&L:</span>
                    <span className={`detail-value pnl ${trade.pnl >= 0 ? 'positive' : 'negative'}`}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(4)} ETH
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <p>No trades found</p>
            <small>Trade history will appear here</small>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="history-footer">
        <small>
          ℹ️ Showing {filteredTrades.length} {filter !== 'all' ? filter : ''} trades
          {symbol && ` for ${symbol}`}
        </small>
      </div>

      <style jsx>{`
        .trade-history {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .history-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .filter-btn:hover {
          border-color: #667eea;
        }

        .filter-btn.active {
          border-color: #667eea;
          background: #667eea;
          color: white;
        }

        .trade-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 600px;
          overflow-y: auto;
        }

        .trade-list::-webkit-scrollbar {
          width: 8px;
        }

        .trade-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .trade-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .trade-list::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .trade-item {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1rem;
          transition: all 0.2s;
        }

        .trade-item:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .trade-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .trade-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .trade-type {
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .trade-type.open {
          background: #d1fae5;
          color: #059669;
        }

        .trade-type.close {
          background: #fee2e2;
          color: #dc2626;
        }

        .trade-symbol {
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .trade-user {
          color: #666;
          font-size: 0.9rem;
          font-family: monospace;
        }

        .trade-time {
          color: #999;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        .trade-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .detail-label {
          color: #666;
          font-size: 0.85rem;
        }

        .detail-value {
          font-weight: 600;
          color: #333;
          font-size: 0.85rem;
        }

        .detail-value.fee {
          color: #667eea;
        }

        .detail-value.pnl.positive {
          color: #10b981;
        }

        .detail-value.pnl.negative {
          color: #ef4444;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #999;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-state p {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .empty-state small {
          font-size: 0.9rem;
        }

        .history-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .history-footer small {
          color: #999;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .history-header {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-buttons {
            justify-content: center;
          }

          .trade-main {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .trade-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
