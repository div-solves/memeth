import { useState } from 'react';

/**
 * CreateMeme Component
 * Allows users to create new memes in the registry
 * Simple, clean interface focused on essential data
 */
export default function CreateMeme() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    imageUri: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating meme:', formData);
    // Will be connected to MemeRegistry contract in production
    setIsOpen(false);
    setFormData({ name: '', symbol: '', imageUri: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <button className="create-btn" onClick={() => setIsOpen(true)}>
        + Create New Meme
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Meme</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name">Meme Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Doge to the Moon"
                  required
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="text"
                  id="symbol"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  placeholder="e.g., MOON"
                  required
                  className="input"
                  maxLength={10}
                />
                <small>Unique identifier (max 10 characters)</small>
              </div>

              <div className="form-group">
                <label htmlFor="imageUri">Image URI</label>
                <input
                  type="url"
                  id="imageUri"
                  name="imageUri"
                  value={formData.imageUri}
                  onChange={handleChange}
                  placeholder="ipfs://... or https://..."
                  required
                  className="input"
                />
                <small>IPFS or permanent storage link</small>
              </div>

              <div className="form-info">
                <p>
                  ⚠️ Creating a meme requires a small creation fee in ETH
                </p>
                <p>
                  ✅ No tokens are created - only a registry entry
                </p>
                <p>
                  ✅ Image data is permanent and immutable
                </p>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Meme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .create-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 15px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          transition: all 0.2s;
          display: block;
          margin: 0 auto;
        }

        .create-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

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

        .modal-header h2 {
          margin: 0;
          color: #333;
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

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
        }

        .form-group small {
          color: #999;
          font-size: 0.85rem;
        }

        .input {
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

        .form-info {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .form-info p {
          margin: 0.5rem 0;
          color: #555;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
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

        .btn-secondary {
          background: #e5e7eb;
          color: #666;
        }

        .btn-secondary:hover {
          background: #d1d5db;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
      `}</style>
    </>
  );
}
