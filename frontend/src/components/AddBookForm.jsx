// // 
// import { useState } from 'react';
// import { API_BASE_URL } from '../api/config';

// // Replace this with your actual Render/Railway/Heroku backend URL
// // const API_BASE_URL = 'http://localhost:5000'; 
// // This will use the Render URL if available, otherwise it defaults to localhost
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function AddBookForm({ onSuccess }) {
//   const [bookData, setBookData] = useState({
//     title: '',
//     author: '',
//     isbn: '',
//     totalQuantity: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);
//     setLoading(true);
//     try {
//       // Use the absolute URL for the live environment
//       const res = await fetch(`${API_BASE_URL}/api/books`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: bookData.title.trim(),
//           author: bookData.author.trim(),
//           isbn: bookData.isbn.trim(),
//           totalQuantity: parseInt(bookData.totalQuantity, 10),
//         }),
//       });

//       // Handle non-JSON responses (like 404 Not Found)
//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server did not return JSON. Check your API URL.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Failed to add book');
      
//       setMessage({ type: 'success', text: data.message || "Book added!" });
//       setBookData({ title: '', author: '', isbn: '', totalQuantity: '' });
//       onSuccess?.();
//     } catch (err) {
//       setMessage({ type: 'error', text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="section-card">
//       <h1 className="main-title">Add Book to Inventory</h1>
//       <h5 className="sub-title">Enter book details to update stock levels.</h5>

//       {message && (
//         <div className={`alert alert-${message.type}`}>{message.text}</div>
//       )}

//       <form onSubmit={handleSubmit} className="modern-form">
//         <div className="form-grid">
//           <div className="form-group">
//             <label>Title</label>
//             <input 
//               value={bookData.title} 
//               onChange={(e) => setBookData({...bookData, title: e.target.value})} 
//               required 
//               placeholder="e.g. The Great Gatsby" 
//             />
//           </div>
//           <div className="form-group">
//             <label>Author</label>
//             <input 
//               placeholder="e.g. Robert Kiyosaki" 
//               value={bookData.author} 
//               onChange={(e) => setBookData({...bookData, author: e.target.value})} 
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>ISBN</label>
//             <input 
//               placeholder="e.g. 978-0143111580" 
//               value={bookData.isbn} 
//               onChange={(e) => setBookData({...bookData, isbn: e.target.value})} 
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Quantity</label>
//             <input 
//               type="number" 
//               value={bookData.totalQuantity} 
//               onChange={(e) => setBookData({...bookData, totalQuantity: e.target.value})} 
//               required 
//             />
//           </div>
//         </div>
//         <button type="submit" className="btn-primary" disabled={loading}>
//           {loading ? 'Adding...' : 'Add to Inventory'}
//         </button>
//       </form>

//       <style>{`
//         :root {
//           --bg-dark: #0f172a;
//           --border: #1f2937;
//           --accent-primary: #6366f1;
//           --text-muted: #9ca3af;
//         }
//         .section-card { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
//         .main-title { font-size: 2rem; margin-top: 0; }
//         .sub-title { color: #9ca3af; margin-bottom: 2rem; font-weight: 400; }
//         .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
//         .form-group label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 1rem; }
//         .modern-form input { 
//           width: 100%; padding: 12px; background: var(--bg-dark); 
//           border: 1px solid var(--border); color: white; border-radius: 8px; font-size: 1.1rem;
//           box-sizing: border-box;
//         }
//         .btn-primary { 
//           font-size: 1.2rem; width: 100%; padding: 14px; background: var(--accent-primary); 
//           color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
//           transition: opacity 0.2s;
//         }
//         .btn-primary:hover { opacity: 0.9; }
//         .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
//         .alert { padding: 12px; border-radius: 8px; margin-bottom: 15px; border: 1px solid; font-size: 1rem; }
//         .alert-error { background: rgba(239, 68, 68, 0.1); border-color: #ef4444; color: #ef4444; }
//         .alert-success { background: rgba(16, 185, 129, 0.1); border-color: #10b981; color: #10b981; }
//       `}</style>
//     </section>
//   );
// }
import { useState } from 'react';

// Use the environment variable for production, defaulting to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AddBookForm({ onSuccess }) {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    totalQuantity: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: bookData.title.trim(),
          author: bookData.author.trim(),
          isbn: bookData.isbn.trim(),
          totalQuantity: parseInt(bookData.totalQuantity, 10),
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON. Check your API URL.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add book');
      
      setMessage({ type: 'success', text: data.message || "Book added!" });
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
      <h1 className="main-title">Add Book to Inventory</h1>
      <h5 className="sub-title">Enter book details to update stock levels.</h5>

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
        :root {
          --bg-dark: #0f172a;
          --border: #1f2937;
          --accent-primary: #6366f1;
          --text-muted: #9ca3af;
        }
        .section-card { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
        .main-title { font-size: 2rem; margin-top: 0; }
        .sub-title { color: #9ca3af; margin-bottom: 2rem; font-weight: 400; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 1rem; }
        .modern-form input { 
          width: 100%; padding: 12px; background: var(--bg-dark); 
          border: 1px solid var(--border); color: white; border-radius: 8px; font-size: 1.1rem;
          box-sizing: border-box;
        }
        .btn-primary { 
          font-size: 1.2rem; width: 100%; padding: 14px; background: var(--accent-primary); 
          color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .alert { padding: 12px; border-radius: 8px; margin-bottom: 15px; border: 1px solid; font-size: 1rem; }
        .alert-error { background: rgba(239, 68, 68, 0.1); border-color: #ef4444; color: #ef4444; }
        .alert-success { background: rgba(16, 185, 129, 0.1); border-color: #10b981; color: #10b981; }
      `}</style>
    </section>
  );
}