import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';

/**
 * Create Memecoin Page
 * Dedicated page for creating new memecoins with image upload
 * 
 * Features:
 * - Image upload with preview and validation (jpeg/png, max 2MB)
 * - Form validation for symbol, name, description, category
 * - Gas cost estimation
 * - 0.5% platform fee disclosure
 * 
 * TODO: Integrate with MemeRegistry contract
 * TODO: Store images in /public/memes or IPFS
 */

type Category = 'animals' | 'people' | 'objects' | 'abstract' | 'other';

export default function CreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    category: 'animals' as Category,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock gas cost - TODO: Calculate from actual network
  const estimatedGasCost = '0.0015 ETH (~$3.50)';
  const creationFee = '0.001 ETH';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setImageError('Please upload a JPEG or PNG image');
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setImageError('Image size must be less than 2MB');
      return;
    }

    setImageError('');
    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Upload image to /public/memes or IPFS
      // TODO: Call MemeRegistry contract to create meme
      console.log('Creating meme:', {
        ...formData,
        imageFile: imageFile?.name,
      });

      // Mock delay for submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success - redirect to coins page or new meme page
      alert('Meme created successfully! 🎉');
      router.push('/coins');
    } catch (error) {
      console.error('Error creating meme:', error);
      alert('Failed to create meme. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 3 &&
      formData.symbol.trim().length >= 3 &&
      formData.symbol.trim().length <= 5 &&
      formData.description.trim().length >= 10 &&
      imageFile !== null
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Create Memecoin - MEMETH</title>
        <meta name="description" content="Create a new virtual memecoin on MEMETH" />
      </Head>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            MEMETH
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/coins" className="nav-link">Coins</Link>
            <Link href="/create" className="nav-link active">Create</Link>
          </div>
          <div className="nav-wallet">
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="main">
        <section className="page-header">
          <h1 className="page-title">Create New Memecoin</h1>
          <p className="page-subtitle">
            Launch your own virtual meme asset on MEMETH
          </p>
        </section>

        <div className="content-grid">
          {/* Creation Form */}
          <section className="form-section">
            <form onSubmit={handleSubmit} className="create-form">
              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">
                  Meme Image <span className="required">*</span>
                </label>
                <div className="image-upload-area">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      className="upload-placeholder"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="upload-icon">📸</div>
                      <p>Click to upload image</p>
                      <small>JPEG or PNG, max 2MB</small>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </div>
                {imageError && <div className="error-message">{imageError}</div>}
              </div>

              {/* Meme Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Meme Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Moon Dog"
                  required
                  minLength={3}
                  maxLength={50}
                  className="form-input"
                />
                <small className="form-help">3-50 characters</small>
              </div>

              {/* Symbol */}
              <div className="form-group">
                <label htmlFor="symbol" className="form-label">
                  Symbol <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="symbol"
                  name="symbol"
                  value={formData.symbol.toUpperCase()}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                    setFormData((prev) => ({ ...prev, symbol: value }));
                  }}
                  placeholder="e.g., MOON"
                  required
                  minLength={3}
                  maxLength={5}
                  className="form-input"
                />
                <small className="form-help">3-5 letters, unique identifier</small>
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="animals">🐕 Animals</option>
                  <option value="people">👤 People</option>
                  <option value="objects">🎯 Objects</option>
                  <option value="abstract">🎨 Abstract</option>
                  <option value="other">📦 Other</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What makes this meme special? Tell the community!"
                  required
                  minLength={10}
                  maxLength={200}
                  rows={4}
                  className="form-textarea"
                />
                <small className="form-help">
                  {formData.description.length}/200 characters
                </small>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>⏳ Creating...</>
                ) : (
                  <>🚀 Create Memecoin</>
                )}
              </button>
            </form>
          </section>

          {/* Info Panel */}
          <aside className="info-panel">
            {/* Cost Breakdown */}
            <div className="info-card">
              <h3 className="info-title">💰 Cost Breakdown</h3>
              <div className="cost-item">
                <span>Creation Fee:</span>
                <strong>{creationFee}</strong>
              </div>
              <div className="cost-item">
                <span>Estimated Gas:</span>
                <strong>{estimatedGasCost}</strong>
              </div>
              <div className="cost-total">
                <span>Total Estimated Cost:</span>
                <strong>~0.0025 ETH</strong>
              </div>
            </div>

            {/* Important Notes */}
            <div className="info-card warning">
              <h3 className="info-title">⚠️ Important Notes</h3>
              <ul className="info-list">
                <li>This does NOT create an ERC20 token</li>
                <li>Creates a virtual meme asset in the registry</li>
                <li>No liquidity pools or bonding curves</li>
                <li>All trading settles in ETH</li>
                <li>Creation fee helps prevent spam</li>
              </ul>
            </div>

            {/* Platform Fee */}
            <div className="info-card highlight">
              <h3 className="info-title">📊 Trading Info</h3>
              <div className="fee-display">
                <div className="fee-large">0.5%</div>
                <div className="fee-label">Platform Fee</div>
              </div>
              <p className="fee-description">
                A 0.5% fee is applied to all trades and deducted from proceeds.
                This fee supports platform development and security.
              </p>
            </div>

            {/* Guidelines */}
            <div className="info-card">
              <h3 className="info-title">📋 Guidelines</h3>
              <ul className="info-list">
                <li>Choose a memorable, unique name</li>
                <li>Upload high-quality images</li>
                <li>Write clear descriptions</li>
                <li>No offensive content</li>
                <li>Respect intellectual property</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <p>Built on Ethereum • Virtual Meme Market Engine</p>
        <p className="footer-disclaimer">No tokens. No rugs. No scams.</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Navigation */
        .nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 900;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #333;
          font-weight: 500;
          transition: color 0.2s;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .nav-link:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .nav-link.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.15);
          font-weight: 600;
        }

        /* Main Content */
        .main {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }

        /* Page Header */
        .page-header {
          text-align: center;
          padding: 2rem 0 3rem;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          margin: 0 0 1rem 0;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        /* Form Section */
        .form-section {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .create-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 600;
          color: #333;
          font-size: 1rem;
        }

        .required {
          color: #ef4444;
        }

        .form-input,
        .form-textarea,
        .form-select {
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: #667eea;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-help {
          color: #666;
          font-size: 0.875rem;
        }

        /* Image Upload */
        .image-upload-area {
          position: relative;
        }

        .upload-placeholder {
          border: 3px dashed #d1d5db;
          border-radius: 15px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-placeholder:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .upload-placeholder p {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .upload-placeholder small {
          color: #666;
        }

        .file-input {
          display: none;
        }

        .image-preview {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .image-preview img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .remove-image {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .remove-image:hover {
          background: rgba(239, 68, 68, 0.9);
          transform: scale(1.1);
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Submit Button */
        .submit-button {
          padding: 1.25rem 2rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 1rem;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Info Panel */
        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .info-card.warning {
          background: #fef3c7;
          border: 2px solid #fbbf24;
        }

        .info-card.highlight {
          background: linear-gradient(135deg, #667eea15, #764ba215);
          border: 2px solid #667eea;
        }

        .info-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .cost-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .cost-total {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0 0;
          font-size: 1.1rem;
        }

        .cost-total strong {
          color: #667eea;
        }

        .info-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-list li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .info-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }

        .info-card.warning .info-list li::before {
          content: '•';
          color: #f59e0b;
        }

        .fee-display {
          text-align: center;
          padding: 1.5rem 0;
        }

        .fee-large {
          font-size: 3rem;
          font-weight: 900;
          color: #667eea;
        }

        .fee-label {
          font-size: 1rem;
          color: #666;
          font-weight: 600;
        }

        .fee-description {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
          margin: 1rem 0 0;
        }

        /* Footer */
        .footer {
          background: rgba(0, 0, 0, 0.2);
          color: white;
          text-align: center;
          padding: 2rem;
          margin-top: 2rem;
        }

        .footer p {
          margin: 0.5rem 0;
        }

        .footer-disclaimer {
          font-size: 0.85rem;
          opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .nav-content {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .nav-links {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .page-title {
            font-size: 2rem;
          }

          .form-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
