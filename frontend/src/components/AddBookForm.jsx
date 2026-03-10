import { useState } from 'react';

export default function AddBookForm({ onSuccess }) {
  // Ensure your state includes author and isbn
  const [bookData, setBookData] = useState({
    title: '',
    author: '', // Ensure this is not empty
    isbn: '',   // Ensure this is not empty
    totalQuantity: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: bookData.title.trim(),
          author: bookData.author.trim(),
          isbn: bookData.isbn.trim(),
          totalQuantity: parseInt(bookData.totalQuantity, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add book');
      setMessage({ type: 'success', text: data.message });
      setBookData({ title: '', author: '', isbn: '', totalQuantity: '' });
      onSuccess?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-card">
      <h2>Add Book to Inventory</h2>
      <p>Enter book details to update stock levels.</p>

      {message && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input 
              value={bookData.title} 
              onChange={(e) => setBookData({...bookData, title: e.target.value})} 
              required 
              placeholder="e.g. The Great Gatsby" 
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input 
              placeholder="e.g. Robert Kiyosaki" 
              value={bookData.author} 
              onChange={(e) => setBookData({...bookData, author: e.target.value})} 
              required
            />
          </div>
          <div className="form-group">
            <label>ISBN</label>
            <input 
              placeholder="e.g. 978-0143111580" 
              value={bookData.isbn} 
              onChange={(e) => setBookData({...bookData, isbn: e.target.value})} 
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input 
              type="number" 
              value={bookData.totalQuantity} 
              onChange={(e) => setBookData({...bookData, totalQuantity: e.target.value})} 
              required 
            />
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add to Inventory'}
        </button>
      </form>

      <style>{`
         .section-card{background: #1a2233; padding: 2rem; border-radius: 12px; color: white;}
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 1.5rem; }
        .modern-form input { 
          width: 100%; padding: 12px; background: var(--bg-dark); 
          border: 1px solid var(--border); color: white; border-radius: 8px; font-size: 1.5rem;
        }
        .btn-primary { 
        font-size:1.5rem;
          width: 100%; padding: 14px; background: var(--accent-primary); 
          color: white; border: 1px solid var(--border); border-radius: 8px; font-weight: 600; cursor: pointer;
        }
          
          
        .alert { padding: 12px; border-radius: 8px; margin-bottom: 15px; border: 1px solid; }
        .alert-error { background: rgba(239, 68, 68, 0.1); border-color: #ef4444; color: #ef4444; }
        .alert-success { background: rgba(16, 185, 129, 0.1); border-color: #10b981; color: #10b981; }
      `}</style>
    </section>
  );
}