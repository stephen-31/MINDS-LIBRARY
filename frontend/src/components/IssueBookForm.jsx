
// import { useState, useEffect, useRef } from 'react';

// // Define the backend URL clearly
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function IssueBookForm({ onSuccess }) {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     studentName: '', studentGrade: '', hostelNumber: '', bookId: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const wrapperRef = useRef(null);

//   // Use API_BASE_URL for fetching books
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/api/books`)
//       .then(res => res.json())
//       .then(data => setBooks(Array.isArray(data) ? data : []))
//       .catch(() => setMessage({ type: 'error', text: 'Could not load books' }));
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredBooks = books.filter(book => 
//     book.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectBook = (book) => {
//     if (book.availableQuantity <= 0) return;
//     setFormData({ ...formData, bookId: book._id });
//     setSearchTerm(book.title);
//     setIsOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       // Use API_BASE_URL for the POST request
//       const res = await fetch(`${API_BASE_URL}/api/transactions/issue-direct`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to issue book");

//       setMessage({ type: 'success', text: data.message });
//       setFormData({ studentName: '', studentGrade: '', hostelNumber: '', bookId: '' });
//       setSearchTerm('');
//       onSuccess?.();
//     } catch (err) {
//       setMessage({ type: 'error', text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modern-form-container">
//       <h1>Quick Issue Book</h1>
//       {message && (
//         <div className={`alert alert-${message.type}`} role="alert">
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="form-row">
//           <div className="input-group">
//             <label>Student Name</label>
//             <input 
//               value={formData.studentName} 
//               required 
//               placeholder="Full Name"
//               onChange={e => setFormData({...formData, studentName: e.target.value})} 
//             />
//           </div>
//           <div className="input-group">
//             <label>Grade</label>
//             <input 
//               value={formData.studentGrade} 
//               required 
//               placeholder="e.g. 10th"
//               onChange={e => setFormData({...formData, studentGrade: e.target.value})} 
//             />
//           </div>
//         </div>

//         <div className="input-group">
//           <label>Hostel Number</label>
//           <input 
//             value={formData.hostelNumber} 
//             required 
//             placeholder="e.g. H-204"
//             onChange={e => setFormData({...formData, hostelNumber: e.target.value})} 
//           />
//         </div>

//         <div className="input-group" ref={wrapperRef}>
//           <label>Select Book</label>
//           <div className="search-select-container">
//             <input
//               type="text"
//               placeholder="Search book title..."
//               value={searchTerm}
//               onFocus={() => setIsOpen(true)}
//               onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); }}
//             />
//             {isOpen && (
//               <ul className="search-results">
//                 {filteredBooks.length > 0 ? (
//                   filteredBooks.map(book => (
//                     <li 
//                       key={book._id} 
//                       onClick={() => selectBook(book)} 
//                       className={book.availableQuantity <= 0 ? 'disabled' : ''}
//                     >
//                       <strong>{book.title}</strong>
//                       <small>{book.availableQuantity} available</small>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="no-results">No books found</li>
//                 )}
//               </ul>
//             )}
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="submit-btn" 
//           disabled={loading || !formData.bookId}
//         >
//           {loading ? 'Processing...' : 'Register & Issue Book'}
//         </button>
//       </form>

//       <style>{`
//       h1{font-size: 2rem;}
//         .modern-form-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
//         .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
//         .input-group { margin-bottom: 1.2rem; position: relative; }
//         label { display: block; margin-bottom: 5px; color: #9ca3af; font-size: 1.1rem; }
//         input { width: 100%; padding: 10px; background: #111827; border: 1px solid #374151; color: white; border-radius: 6px; box-sizing: border-box; font-size: 1rem;}
//         .search-results { position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; border: 1px solid #334155; border-radius: 6px; max-height: 150px; overflow-y: auto; z-index: 100; list-style: none; padding: 0; margin: 4px 0; }
//         .search-results li { padding: 10px; cursor: pointer; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; }
//         .search-results li:hover:not(.disabled) { background: #3b82f6; }
//         .submit-btn { width: 100%; padding: 12px; background: var(--accent-primary); border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px;font-size: 1.2rem; }
//         .alert-error { color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #ef4444; }
//         .alert-success { color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #10b981; }
//       `}</style>
//     </div>
//   );
// }



















// import { useState, useEffect, useRef } from 'react';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function IssueBookForm({ onSuccess }) {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [formData, setFormData] = useState({
//     studentName: '', studentGrade: '', hostelNumber: '', bookId: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const wrapperRef = useRef(null);
//   const resultsRef = useRef(null); // Ref for scrolling

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/api/books`)
//       .then(res => res.json())
//       .then(data => setBooks(Array.isArray(data) ? data : []))
//       .catch(() => setMessage({ type: 'error', text: 'Could not load books' }));
//   }, []);

//   // Filter books based on search term
//   const filteredBooks = books.filter(book => 
//     book.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectBook = (book) => {
//     if (book.availableQuantity <= 0) return;
//     setFormData(prev => ({ ...prev, bookId: book._id }));
//     setSearchTerm(book.title); // This makes the title visible in the search bar
//     setIsOpen(false);
//     setActiveIndex(-1);
//   };

//   const clearSelection = () => {
//     setFormData(prev => ({ ...prev, bookId: '' }));
//     setSearchTerm('');
//     setIsOpen(true);
//     setActiveIndex(-1);
//   };

//   // Handle auto-scroll for keyboard navigation
//   useEffect(() => {
//     if (activeIndex !== -1 && resultsRef.current) {
//       const activeItem = resultsRef.current.children[activeIndex];
//       if (activeItem) {
//         activeItem.scrollIntoView({ block: 'nearest' });
//       }
//     }
//   }, [activeIndex]);

//   const handleKeyDown = (e) => {
//     if (!isOpen) {
//       if (e.key === 'ArrowDown') setIsOpen(true);
//       return;
//     }

//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setActiveIndex(prev => (prev < filteredBooks.length - 1 ? prev + 1 : prev));
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
//     } else if (e.key === 'Enter') {
//       e.preventDefault();
//       if (activeIndex >= 0 && activeIndex < filteredBooks.length) {
//         selectBook(filteredBooks[activeIndex]);
//       }
//     } else if (e.key === 'Escape') {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/transactions/issue-direct`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to issue book");
//       setMessage({ type: 'success', text: data.message });
//       setFormData({ studentName: '', studentGrade: '', hostelNumber: '', bookId: '' });
//       setSearchTerm('');
//       onSuccess?.();
//     } catch (err) {
//       setMessage({ type: 'error', text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modern-form-container">
//       <h1>Quick Issue Book</h1>
//       {message && (
//         <div className={`alert alert-${message.type}`} role="alert">
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="form-row">
//           <div className="input-group">
//             <label>Student Name</label>
//             <input 
//               value={formData.studentName} 
//               required 
//               placeholder="Full Name"
//               onChange={e => setFormData({...formData, studentName: e.target.value})} 
//             />
//           </div>
//           <div className="input-group">
//             <label>Grade</label>
//             <input 
//               value={formData.studentGrade} 
//               required 
//               placeholder="e.g. 10th"
//               onChange={e => setFormData({...formData, studentGrade: e.target.value})} 
//             />
//           </div>
//         </div>

//         <div className="input-group">
//           <label>Hostel Number</label>
//           <input 
//             value={formData.hostelNumber} 
//             required 
//             placeholder="e.g. H-204"
//             onChange={e => setFormData({...formData, hostelNumber: e.target.value})} 
//           />
//         </div>

//         <div className="input-group" ref={wrapperRef}>
//           <label>Select Book</label>
//           <div className="search-select-container">
//             <input
//               type="text"
//               placeholder="Search book title..."
//               value={searchTerm}
//               onFocus={() => setIsOpen(true)}
//               onKeyDown={handleKeyDown}
//               onChange={(e) => { 
//                 setSearchTerm(e.target.value); 
//                 setIsOpen(true); 
//                 setActiveIndex(0);
//                 if (formData.bookId) setFormData(prev => ({...prev, bookId: ''}));
//               }}
//               // CSS class triggers when bookId exists
//               className={formData.bookId ? 'selected-input' : ''}
//             />
            
//             {searchTerm && (
//               <button type="button" className="clear-btn" onClick={clearSelection}>&times;</button>
//             )}

//             {isOpen && (
//               <ul className="search-results" ref={resultsRef}>
//                 {filteredBooks.length > 0 ? (
//                   filteredBooks.map((book, index) => (
//                     <li 
//                       key={book._id} 
//                       onClick={() => selectBook(book)} 
//                       className={`${book.availableQuantity <= 0 ? 'disabled' : ''} ${index === activeIndex ? 'active' : ''}`}
//                     >
//                       <strong>{book.title}</strong>
//                       <small>{book.availableQuantity} available</small>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="no-results">No books found</li>
//                 )}
//               </ul>
//             )}
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="submit-btn" 
//           disabled={loading || !formData.bookId}
//         >
//           {loading ? 'Processing...' : 'Register & Issue Book'}
//         </button>
//       </form>

//       <style>{`
//         .modern-form-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
//         .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
//         .input-group { margin-bottom: 1.2rem; position: relative; }
//         label { display: block; margin-bottom: 5px; color: #9ca3af; }
        
//         .search-select-container { position: relative; display: flex; align-items: center; }
        
//         input { 
//           width: 100%; padding: 12px; background: #111827; border: 1px solid #374151; 
//           color: white; border-radius: 8px; box-sizing: border-box; transition: all 0.2s;
//         }

//         /* Highlight the input when a book is picked */
//         .selected-input { 
//           border-color: #10b981 !important; 
//           background: #064e3b !important; 
//           color: #fff !important;
//           font-weight: 600; 
//         }

//         .clear-btn {
//           position: absolute; right: 10px; background: #374151; color: white; border: none;
//           width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 18px;
//           display: flex; align-items: center; justify-content: center; line-height: 1;
//         }

//         .search-results { 
//           position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; 
//           border: 1px solid #334155; border-radius: 8px; max-height: 200px; 
//           overflow-y: auto; z-index: 100; list-style: none; padding: 0; margin: 8px 0;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
//         }
        
//         .search-results li { padding: 12px; cursor: pointer; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; transition: 0.2s; }
//         .search-results li.active { background: #6366f1; color: white; }
//         .search-results li:hover:not(.disabled) { background: #4f46e5; }
        
//         .disabled { opacity: 0.4; cursor: not-allowed; }
//         .submit-btn { 
//           width: 100%; padding: 14px; background: #6366f1; border: none; color: white; 
//           border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; font-size: 1.1rem;
//         }
//         .submit-btn:disabled { background: #374151; cursor: not-allowed; opacity: 0.7; }
//       `}</style>
//     </div>
//   );
// }













import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../api/config';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function IssueBookForm({ onSuccess }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [formData, setFormData] = useState({
    studentName: '', studentGrade: '', hostelNumber: '', bookId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  const wrapperRef = useRef(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null); // NEW: Ref for the search input

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/books`)
      .then(res => res.json())
      .then(data => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setMessage({ type: 'error', text: 'Could not load books' }));
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectBook = (book) => {
    if (book.availableQuantity <= 0) return;
    setFormData(prev => ({ ...prev, bookId: book._id }));
    setSearchTerm(book.title);
    setIsOpen(false);
    setActiveIndex(-1);
    
    // NEW: Return focus to input so the cursor remains visible
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const clearSelection = () => {
    setFormData(prev => ({ ...prev, bookId: '' }));
    setSearchTerm('');
    setIsOpen(true);
    setActiveIndex(-1);
    inputRef.current?.focus(); // NEW: Keep cursor in bar
  };

  useEffect(() => {
    if (activeIndex !== -1 && resultsRef.current) {
      const activeItem = resultsRef.current.children[activeIndex];
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredBooks.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredBooks.length) {
        selectBook(filteredBooks[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/transactions/issue-direct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to issue book");
      setMessage({ type: 'success', text: data.message });
      setFormData({ studentName: '', studentGrade: '', hostelNumber: '', bookId: '' });
      setSearchTerm('');
      onSuccess?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-form-container">
      <h1>Quick Issue Book</h1>
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
              ref={inputRef} // NEW: Attach ref here
              type="text"
              placeholder="Search book title..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              onChange={(e) => { 
                setSearchTerm(e.target.value); 
                setIsOpen(true); 
                setActiveIndex(0);
                if (formData.bookId) setFormData(prev => ({...prev, bookId: ''}));
              }}
              className={formData.bookId ? 'selected-input' : ''}
              autoComplete="off"
            />
            
            {searchTerm && (
              <button type="button" className="clear-btn" onClick={clearSelection}>&times;</button>
            )}

            {isOpen && (
              <ul className="search-results" ref={resultsRef}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <li 
                      key={book._id} 
                      onClick={() => selectBook(book)} 
                      className={`${book.availableQuantity <= 0 ? 'disabled' : ''} ${index === activeIndex ? 'active' : ''}`}
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
        label { display: block; margin-bottom: 5px; color: #9ca3af; }
        .search-select-container { position: relative; display: flex; align-items: center; }
        
        input { 
          width: 100%; padding: 12px; background: #111827; border: 1px solid #374151; 
          color: white; border-radius: 8px; box-sizing: border-box; transition: all 0.2s;
          caret-color: #6366f1; /* NEW: Ensure cursor color is visible */
        }

        .selected-input { 
          border-color: #10b981 !important; 
          background: #064e3b !important; 
          color: #fff !important;
          font-weight: 600; 
        }

        .clear-btn {
          position: absolute; right: 10px; background: #374151; color: white; border: none;
          width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 18px;
          display: flex; align-items: center; justify-content: center; line-height: 1;
        }

        .search-results { 
          position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; 
          border: 1px solid #334155; border-radius: 8px; max-height: 200px; 
          overflow-y: auto; z-index: 100; list-style: none; padding: 0; margin: 8px 0;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        }
        
        .search-results li { padding: 12px; cursor: pointer; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; transition: 0.2s; }
        .search-results li.active { background: #6366f1; color: white; }
        .search-results li:hover:not(.disabled) { background: #4f46e5; }
        .disabled { opacity: 0.4; cursor: not-allowed; }
        
        .submit-btn { 
          width: 100%; padding: 14px; background: #6366f1; border: none; color: white; 
          border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; font-size: 1.1rem;
        }
        .submit-btn:disabled { background: var(--accent-primary); cursor: not-allowed; opacity: 0.7; }
      `}</style>
    </div>
  );
}