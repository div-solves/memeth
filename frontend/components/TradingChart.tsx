import { useState } from 'react';

/**
 * TradingChart Component
 * Displays price chart with time intervals and zoom/pan capabilities
 * 
 * Features:
 * - Selectable time intervals (1m, 5m, 1h, 1d, 1w)
 * - Candlestick/line chart toggle
 * - Mock data with proper structure
 * 
 * TODO: Integrate with real-time price feed
 * TODO: Add actual zoom/pan with a charting library (e.g., lightweight-charts, recharts)
 */

type ChartType = 'line' | 'candlestick';
type TimeInterval = '1m' | '5m' | '1h' | '1d' | '1w';

interface PricePoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

interface TradingChartProps {
  symbol: string;
  currentPrice: number;
}

export default function TradingChart({ symbol, currentPrice }: TradingChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('1h');

  // Mock data generator - TODO: Replace with real price feed
  const generateMockData = (interval: TimeInterval): PricePoint[] => {
    const dataPoints = interval === '1m' ? 60 : interval === '5m' ? 48 : interval === '1h' ? 24 : interval === '1d' ? 30 : 52;
    const basePrice = currentPrice;
    const data: PricePoint[] = [];

    for (let i = 0; i < dataPoints; i++) {
      const variance = (Math.random() - 0.5) * 0.2;
      const price = basePrice * (1 + variance);
      const open = basePrice * (1 + (Math.random() - 0.5) * 0.15);
      const high = Math.max(price, open) * (1 + Math.random() * 0.05);
      const low = Math.min(price, open) * (1 - Math.random() * 0.05);
      const close = price;

      data.push({
        time: getTimeLabel(i, interval, dataPoints),
        price: price,
        open,
        high,
        low,
        close,
        volume: Math.random() * 10,
      });
    }

    return data;
  };

  const getTimeLabel = (index: number, interval: TimeInterval, total: number): string => {
    const now = new Date();
    let timeAgo: number;

    switch (interval) {
      case '1m':
        timeAgo = (total - index) * 60000;
        break;
      case '5m':
        timeAgo = (total - index) * 5 * 60000;
        break;
      case '1h':
        timeAgo = (total - index) * 3600000;
        break;
      case '1d':
        timeAgo = (total - index) * 86400000;
        break;
      case '1w':
        timeAgo = (total - index) * 7 * 86400000;
        break;
    }

    const date = new Date(now.getTime() - timeAgo);
    
    if (interval === '1d' || interval === '1w') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const chartData = generateMockData(timeInterval);
  const priceChange = ((chartData[chartData.length - 1].price - chartData[0].price) / chartData[0].price) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="trading-chart">
      {/* Chart Header */}
      <div className="chart-header">
        <div className="chart-info">
          <h3 className="chart-title">{symbol} Price Chart</h3>
          <div className="chart-stats">
            <span className="current-price">{currentPrice.toFixed(6)} ETH</span>
            <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="chart-controls">
          <div className="chart-type-toggle">
            <button
              className={`toggle-btn ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
            >
              📈 Line
            </button>
            <button
              className={`toggle-btn ${chartType === 'candlestick' ? 'active' : ''}`}
              onClick={() => setChartType('candlestick')}
            >
              📊 Candles
            </button>
          </div>

          {/* Time Interval Selector */}
          <div className="interval-selector">
            {(['1m', '5m', '1h', '1d', '1w'] as TimeInterval[]).map((interval) => (
              <button
                key={interval}
                className={`interval-btn ${timeInterval === interval ? 'active' : ''}`}
                onClick={() => setTimeInterval(interval)}
              >
                {interval}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="chart-container">
        {chartType === 'line' ? (
          <LineChart data={chartData} isPositive={isPositive} />
        ) : (
          <CandlestickChart data={chartData} />
        )}
      </div>

      {/* Chart Footer */}
      <div className="chart-footer">
        <small className="chart-note">
          ℹ️ Mock chart data for demonstration. Real-time price feed will be integrated with contract.
        </small>
      </div>

      <style jsx>{`
        .trading-chart {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chart-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .chart-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .chart-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .current-price {
          font-size: 1.8rem;
          font-weight: 700;
          color: #333;
        }

        .price-change {
          font-size: 1.2rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
        }

        .price-change.positive {
          color: #10b981;
          background: #d1fae5;
        }

        .price-change.negative {
          color: #ef4444;
          background: #fee2e2;
        }

        .chart-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-end;
        }

        .chart-type-toggle {
          display: flex;
          gap: 0.5rem;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-btn:hover {
          border-color: #667eea;
        }

        .toggle-btn.active {
          border-color: #667eea;
          background: #667eea;
          color: white;
        }

        .interval-selector {
          display: flex;
          gap: 0.5rem;
        }

        .interval-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 50px;
        }

        .interval-btn:hover {
          border-color: #667eea;
        }

        .interval-btn.active {
          border-color: #667eea;
          background: #667eea;
          color: white;
        }

        .chart-container {
          background: #f9fafb;
          border-radius: 15px;
          padding: 2rem;
          min-height: 400px;
        }

        .chart-footer {
          margin-top: 1.5rem;
          text-align: center;
        }

        .chart-note {
          color: #999;
          font-size: 0.875rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .chart-header {
            flex-direction: column;
            align-items: stretch;
          }

          .chart-controls {
            align-items: stretch;
          }

          .interval-selector {
            justify-content: space-between;
          }

          .interval-btn {
            flex: 1;
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}

// Line Chart Component
function LineChart({ data, isPositive }: { data: PricePoint[]; isPositive: boolean }) {
  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="line-chart">
      <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={i * 75}
            x2="1000"
            y2={i * 75}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Price line */}
        <polyline
          points={data
            .map((point, index) => {
              const x = (index / (data.length - 1)) * 1000;
              const y = 300 - ((point.price - minPrice) / priceRange) * 280 - 10;
              return `${x},${y}`;
            })
            .join(' ')}
          fill="none"
          stroke={isPositive ? '#10b981' : '#ef4444'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Area fill */}
        <polygon
          points={
            data
              .map((point, index) => {
                const x = (index / (data.length - 1)) * 1000;
                const y = 300 - ((point.price - minPrice) / priceRange) * 280 - 10;
                return `${x},${y}`;
              })
              .join(' ') + ' 1000,300 0,300'
          }
          fill={isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
        />
      </svg>

      <style jsx>{`
        .line-chart {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

// Candlestick Chart Component
function CandlestickChart({ data }: { data: PricePoint[] }) {
  const maxPrice = Math.max(...data.map((d) => d.high || d.price));
  const minPrice = Math.min(...data.map((d) => d.low || d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="candlestick-chart">
      <svg width="100%" height="100%" viewBox="0 0 1000 300">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={i * 75}
            x2="1000"
            y2={i * 75}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Candlesticks */}
        {data.map((point, index) => {
          const x = (index / data.length) * 1000 + 1000 / data.length / 2;
          const width = Math.max(1000 / data.length - 4, 2);
          
          const open = point.open || point.price;
          const close = point.close || point.price;
          const high = point.high || Math.max(open, close);
          const low = point.low || Math.min(open, close);
          
          const isGreen = close >= open;
          const color = isGreen ? '#10b981' : '#ef4444';
          
          const yHigh = 300 - ((high - minPrice) / priceRange) * 280 - 10;
          const yLow = 300 - ((low - minPrice) / priceRange) * 280 - 10;
          const yOpen = 300 - ((open - minPrice) / priceRange) * 280 - 10;
          const yClose = 300 - ((close - minPrice) / priceRange) * 280 - 10;
          const bodyTop = Math.min(yOpen, yClose);
          const bodyHeight = Math.abs(yOpen - yClose) || 1;

          return (
            <g key={index}>
              {/* Wick */}
              <line
                x1={x}
                y1={yHigh}
                x2={x}
                y2={yLow}
                stroke={color}
                strokeWidth="2"
              />
              {/* Body */}
              <rect
                x={x - width / 2}
                y={bodyTop}
                width={width}
                height={bodyHeight}
                fill={color}
                opacity={isGreen ? 0.8 : 1}
              />
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        .candlestick-chart {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
