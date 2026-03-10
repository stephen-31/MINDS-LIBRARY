import { useState, useEffect, useRef } from 'react';

export default function IssueBookForm({ onSuccess }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '', studentGrade: '', hostelNumber: '', bookId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const wrapperRef = useRef(null);

  // Initial fetch for books
  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setMessage({ type: 'error', text: 'Could not load books' }));
  }, []);

  // Handle clicking outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectBook = (book) => {
    if (book.availableQuantity <= 0) return;
    setFormData({ ...formData, bookId: book._id });
    setSearchTerm(book.title);
    setIsOpen(false);
  };

  // UPDATED: Combined handleSubmit with relative path logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/transactions/issue-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      // 1. Check if the response is actually JSON/OK before parsing
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); 
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();

      // 2. Success Actions
      setMessage({ type: 'success', text: data.message || "Book Issued Successfully!" });
      setFormData({ studentName: '', studentGrade: '', hostelNumber: '', bookId: '' });
      setSearchTerm('');
      onSuccess?.();
    } catch (err) {
      // This catches the "Unexpected token <" if the proxy fails
      setMessage({ type: 'error', text: err.message.includes('<!DOCTYPE') 
        ? "API Route not found. Check if your backend is running on port 5000." 
        : err.message 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-form-container">
      <h2>Quick Issue Book</h2>
      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label>Student Name</label>
            <input 
              value={formData.studentName} 
              required 
              placeholder="Full Name"
              onChange={e => setFormData({...formData, studentName: e.target.value})} 
            />
          </div>
          <div className="input-group">
            <label>Grade</label>
            <input 
              value={formData.studentGrade} 
              required 
              placeholder="e.g. 10th"
              onChange={e => setFormData({...formData, studentGrade: e.target.value})} 
            />
          </div>
        </div>

        <div className="input-group">
          <label>Hostel Number</label>
          <input 
            value={formData.hostelNumber} 
            required 
            placeholder="e.g. H-204"
            onChange={e => setFormData({...formData, hostelNumber: e.target.value})} 
          />
        </div>

        <div className="input-group" ref={wrapperRef}>
          <label>Select Book</label>
          <div className="search-select-container">
            <input
              type="text"
              placeholder="Search book title..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); }}
            />
            {isOpen && (
              <ul className="search-results">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map(book => (
                    <li 
                      key={book._id} 
                      onClick={() => selectBook(book)} 
                      className={book.availableQuantity <= 0 ? 'disabled' : ''}
                    >
                      <strong>{book.title}</strong>
                      <small>{book.availableQuantity} available</small>
                    </li>
                  ))
                ) : (
                  <li className="no-results">No books found</li>
                )}
              </ul>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading || !formData.bookId}
        >
          {loading ? 'Processing...' : 'Register & Issue Book'}
        </button>
      </form>

      <style>{`
        .modern-form-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .input-group { margin-bottom: 1.2rem; position: relative; }
        label { display: block; margin-bottom: 5px; color: #9ca3af; font-size: 1.5rem; }
        input { width: 100%; padding: 10px; background: #111827; border: 1px solid #374151; color: white; border-radius: 6px; box-sizing: border-box; font-size: 1.5rem;}
        input:focus { outline: none; border-color: #3b82f6; }
        .search-select-container { position: relative; }
        .search-results { position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; border: 1px solid #334155; border-radius: 6px; max-height: 150px; overflow-y: auto; z-index: 100; list-style: none; padding: 0; margin: 4px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5); }
        .search-results li { padding: 10px; cursor: pointer; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; }
        .search-results li:hover:not(.disabled) { background: #3b82f6; }
        .search-results li.disabled { opacity: 0.5; cursor: not-allowed; background: #0f172a; }
        .no-results { padding: 10px; color: #9ca3af; text-align: center; }
        .submit-btn { font-size: 1.5rem;width: 100%; padding: 12px; background: #3b82f6; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
        .submit-btn:disabled { background: var(--accent-primary); cursor: not-allowed; }
        .alert-error { color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #ef4444; }
        .alert-success { color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #10b981; }
      `}</style>
    </div>
  );
}