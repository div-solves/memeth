import { useState } from 'react';

/**
 * TradeForm Component
 * Form for opening/closing long positions with fee preview
 * 
 * Features:
 * - Buy/Sell (open/close long) interface
 * - 0.5% platform fee calculation and display
 * - PnL preview for closing positions
 * - Gas cost estimation
 * - Confirmation dialog
 * 
 * TODO: Integrate with Treasury contract
 * TODO: Calculate real PnL from position data
 */

interface TradeFormProps {
  symbol: string;
  currentPrice: number;
  // Mock position data - TODO: Get from contract
  hasOpenPosition?: boolean;
  positionSize?: number;
  entryPrice?: number;
}

const PLATFORM_FEE_PERCENT = 0.5; // 0.5%
const MOCK_GAS_COST = 0.0015; // ETH

export default function TradeForm({
  symbol,
  currentPrice,
  hasOpenPosition = false,
  positionSize = 0,
  entryPrice = 0,
}: TradeFormProps) {
  const [amount, setAmount] = useState('');
  const [tradeType, setTradeType] = useState<'open' | 'close'>('open');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const calculateFees = (amountEth: number) => {
    const platformFee = (amountEth * PLATFORM_FEE_PERCENT) / 100;
    return {
      platformFee,
      gasFee: MOCK_GAS_COST,
      totalFees: platformFee + MOCK_GAS_COST,
    };
  };

  const calculatePnL = () => {
    if (!hasOpenPosition || tradeType !== 'close') return null;

    const exitValue = positionSize * currentPrice;
    const entryValue = positionSize * entryPrice;
    const grossPnL = exitValue - entryValue;
    const fees = calculateFees(exitValue);
    const netPnL = grossPnL - fees.totalFees;

    return {
      grossPnL,
      netPnL,
      exitValue,
      entryValue,
      fees,
      returnPercent: (grossPnL / entryValue) * 100,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // TODO: Execute trade via contract
    console.log('Executing trade:', {
      type: tradeType,
      amount: parseFloat(amount),
      symbol,
      currentPrice,
    });
    
    setShowConfirmation(false);
    setAmount('');
    alert(`Trade executed successfully! 🎉`);
  };

  const amountNum = parseFloat(amount) || 0;
  const fees = calculateFees(amountNum);
  const pnl = calculatePnL();

  return (
    <>
      <div className="trade-form">
        <div className="trade-header">
          <h3 className="trade-title">Trade Virtual Exposure</h3>
          {hasOpenPosition && (
            <div className="position-info">
              <span className="position-label">Open Position:</span>
              <span className="position-value">
                {positionSize.toFixed(4)} ETH @ {entryPrice.toFixed(6)}
              </span>
            </div>
          )}
        </div>

        {/* Trade Type Selector */}
        <div className="trade-type-selector">
          <button
            type="button"
            className={`type-btn ${tradeType === 'open' ? 'active open' : ''}`}
            onClick={() => setTradeType('open')}
            disabled={hasOpenPosition}
          >
            <span className="type-icon">📈</span>
            <span>Open Long</span>
          </button>
          <button
            type="button"
            className={`type-btn ${tradeType === 'close' ? 'active close' : ''}`}
            onClick={() => setTradeType('close')}
            disabled={!hasOpenPosition}
          >
            <span className="type-icon">📉</span>
            <span>Close Long</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="trade-form-content">
          {/* Amount Input */}
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount (ETH)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={tradeType === 'open' ? '0.01' : positionSize.toString()}
              min="0.001"
              max={tradeType === 'close' ? positionSize : undefined}
              step="0.001"
              className="amount-input"
              required
            />
            {tradeType === 'close' && (
              <button
                type="button"
                className="max-btn"
                onClick={() => setAmount(positionSize.toString())}
              >
                MAX
              </button>
            )}
          </div>

          {/* Fee Breakdown */}
          {amountNum > 0 && (
            <div className="fee-breakdown">
              <h4 className="breakdown-title">Fee Breakdown</h4>
              
              <div className="fee-row">
                <span>Amount:</span>
                <strong>{amountNum.toFixed(4)} ETH</strong>
              </div>

              {tradeType === 'open' && (
                <div className="fee-row">
                  <span>Virtual Price:</span>
                  <strong>{currentPrice.toFixed(6)} ETH</strong>
                </div>
              )}

              <div className="fee-row fee-highlight">
                <span>Platform Fee (0.5%):</span>
                <strong>{fees.platformFee.toFixed(6)} ETH</strong>
              </div>

              <div className="fee-row">
                <span>Estimated Gas:</span>
                <strong>{fees.gasFee.toFixed(4)} ETH</strong>
              </div>

              <div className="fee-row total">
                <span>Total Fees:</span>
                <strong>{fees.totalFees.toFixed(6)} ETH</strong>
              </div>

              {tradeType === 'open' && (
                <div className="fee-row total">
                  <span>Total Cost:</span>
                  <strong>{(amountNum + fees.totalFees).toFixed(4)} ETH</strong>
                </div>
              )}

              {tradeType === 'close' && pnl && (
                <>
                  <div className="separator" />
                  <div className={`fee-row pnl ${pnl.netPnL >= 0 ? 'positive' : 'negative'}`}>
                    <span>Gross P&L:</span>
                    <strong>
                      {pnl.grossPnL >= 0 ? '+' : ''}
                      {pnl.grossPnL.toFixed(6)} ETH
                    </strong>
                  </div>
                  <div className={`fee-row pnl ${pnl.netPnL >= 0 ? 'positive' : 'negative'}`}>
                    <span>Net P&L (after fees):</span>
                    <strong>
                      {pnl.netPnL >= 0 ? '+' : ''}
                      {pnl.netPnL.toFixed(6)} ETH ({pnl.returnPercent.toFixed(2)}%)
                    </strong>
                  </div>
                  <div className="fee-row total">
                    <span>You Receive:</span>
                    <strong>{(pnl.exitValue - fees.totalFees).toFixed(4)} ETH</strong>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!amount || amountNum <= 0}
            className={`submit-btn ${tradeType}`}
          >
            {tradeType === 'open' ? '🚀 Open Long Position' : '💰 Close Long Position'}
          </button>

          {/* Disclaimer */}
          <div className="disclaimer">
            <p>⚠️ Virtual exposure only. No ERC20 tokens.</p>
            <p>All positions settle directly in ETH.</p>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Trade</h3>
              <button
                className="close-btn"
                onClick={() => setShowConfirmation(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="confirmation-summary">
                <div className="summary-row">
                  <span>Action:</span>
                  <strong className={tradeType}>
                    {tradeType === 'open' ? 'Open Long' : 'Close Long'}
                  </strong>
                </div>
                <div className="summary-row">
                  <span>Symbol:</span>
                  <strong>{symbol}</strong>
                </div>
                <div className="summary-row">
                  <span>Amount:</span>
                  <strong>{amountNum.toFixed(4)} ETH</strong>
                </div>
                <div className="summary-row">
                  <span>Price:</span>
                  <strong>{currentPrice.toFixed(6)} ETH</strong>
                </div>
                <div className="summary-row highlight">
                  <span>Platform Fee (0.5%):</span>
                  <strong>{fees.platformFee.toFixed(6)} ETH</strong>
                </div>
                <div className="summary-row">
                  <span>Gas Fee:</span>
                  <strong>{fees.gasFee.toFixed(4)} ETH</strong>
                </div>

                {pnl && tradeType === 'close' && (
                  <>
                    <div className="separator" />
                    <div className={`summary-row pnl ${pnl.netPnL >= 0 ? 'positive' : 'negative'}`}>
                      <span>Net P&L:</span>
                      <strong>
                        {pnl.netPnL >= 0 ? '+' : ''}
                        {pnl.netPnL.toFixed(6)} ETH ({pnl.returnPercent.toFixed(2)}%)
                      </strong>
                    </div>
                  </>
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button className={`btn-primary ${tradeType}`} onClick={handleConfirm}>
                  Confirm Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .trade-form {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .trade-header {
          margin-bottom: 1.5rem;
        }

        .trade-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin: 0 0 0.5rem 0;
        }

        .position-info {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #f3f4f6;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .position-label {
          color: #666;
        }

        .position-value {
          font-weight: 600;
          color: #333;
        }

        .trade-type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .type-btn {
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .type-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .type-btn:not(:disabled):hover {
          border-color: #667eea;
        }

        .type-btn.active.open {
          border-color: #10b981;
          background: #d1fae5;
          color: #059669;
        }

        .type-btn.active.close {
          border-color: #ef4444;
          background: #fee2e2;
          color: #dc2626;
        }

        .type-icon {
          font-size: 1.5rem;
        }

        .trade-form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          position: relative;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .amount-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1.2rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .amount-input:focus {
          border-color: #667eea;
        }

        .max-btn {
          position: absolute;
          right: 1rem;
          top: 2.75rem;
          padding: 0.5rem 1rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .max-btn:hover {
          background: #5568d3;
        }

        .fee-breakdown {
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 15px;
          padding: 1.5rem;
        }

        .breakdown-title {
          font-size: 1rem;
          font-weight: 700;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .fee-row:last-child {
          border-bottom: none;
        }

        .fee-row span {
          color: #666;
        }

        .fee-row strong {
          color: #333;
        }

        .fee-row.fee-highlight {
          background: rgba(102, 126, 234, 0.1);
          margin: 0 -1rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
        }

        .fee-row.fee-highlight span {
          color: #667eea;
          font-weight: 600;
        }

        .fee-row.total {
          font-size: 1.1rem;
          padding-top: 1rem;
          margin-top: 0.5rem;
          border-top: 2px solid #d1d5db;
        }

        .fee-row.total strong {
          color: #667eea;
        }

        .fee-row.pnl.positive strong {
          color: #10b981;
        }

        .fee-row.pnl.negative strong {
          color: #ef4444;
        }

        .separator {
          height: 1px;
          background: #d1d5db;
          margin: 0.5rem 0;
        }

        .submit-btn {
          padding: 1.25rem 2rem;
          border: none;
          border-radius: 15px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          color: white;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn.open {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .submit-btn.open:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }

        .submit-btn.close {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .submit-btn.close:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4);
        }

        .disclaimer {
          background: #fef3c7;
          border: 2px solid #fbbf24;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }

        .disclaimer p {
          margin: 0.25rem 0;
          color: #78350f;
          font-size: 0.9rem;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-header h3 {
          margin: 0;
          color: #333;
          font-size: 1.5rem;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          color: #999;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }

        .close-btn:hover {
          color: #333;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .confirmation-summary {
          background: #f9fafb;
          border-radius: 15px;
          padding: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-row span {
          color: #666;
        }

        .summary-row strong {
          color: #333;
        }

        .summary-row strong.open {
          color: #10b981;
        }

        .summary-row strong.close {
          color: #ef4444;
        }

        .summary-row.highlight {
          background: rgba(102, 126, 234, 0.1);
          margin: 0 -1.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
        }

        .summary-row.highlight span {
          color: #667eea;
          font-weight: 600;
        }

        .summary-row.pnl.positive strong {
          color: #10b981;
          font-size: 1.1rem;
        }

        .summary-row.pnl.negative strong {
          color: #ef4444;
          font-size: 1.1rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .btn-secondary,
        .btn-primary {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary {
          background: #e5e7eb;
          color: #666;
        }

        .btn-secondary:hover {
          background: #d1d5db;
        }

        .btn-primary.open {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .btn-primary.close {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
