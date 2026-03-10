
// import { useState, useEffect, useCallback } from 'react';

// // Use your actual live backend URL (e.g., from Render, Railway, etc.)
// const API_BASE_URL = 'http://localhost:5000';

// export default function BookList() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Wrapped in useCallback to prevent unnecessary re-renders
//   const fetchBooks = useCallback(() => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/books`)
//       .then((r) => {
//         if (!r.ok) throw new Error("Server responded with an error");
//         return r.json();
//       })
//       .then((data) => setBooks(Array.isArray(data) ? data : []))
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         // Optional: setBooks([]) or show a specific error UI here
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     fetchBooks();
//   }, [fetchBooks]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/books/${id}`, { 
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (res.ok) {
//         setBooks(prevBooks => prevBooks.filter(b => b._id !== id));
//       } else {
//         const data = await res.json();
//         alert(data.error || "Server rejected deletion");
//       }
//     } catch (err) {
//       alert("Connection failed. Ensure Backend is running and reachable.");
//     }
//   };

//   if (loading) return <div className="loading" style={{color:'white', padding:'20px'}}>Loading inventory...</div>;
  
//   // If no books, we still want to show the header and refresh button
//   if (books.length === 0) {
//     return (
//       <section className="full-page-container">
//         <div className="header-flex">
//           <div>
//             <h1 className="main-title">Book Inventory</h1>
//             <h5 className="sub-title">No books in inventory yet.</h5>
//           </div>
//           <button onClick={fetchBooks} className="btn-refresh">Refresh List</button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="full-page-container">
//       <div className="header-flex">
//         <div>
//           <h1 className="main-title">Book Inventory</h1>
//           <h5 className="sub-title">Full catalog overview.</h5>
//         </div>
//         <button onClick={fetchBooks} className="btn-refresh">Refresh List</button>
//       </div>

//       <div className="table-wrap">
//         <table className="electric-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>ISBN</th>
//               <th className="center-text">Total</th>
//               <th className="center-text">Available</th>
//               <th>Status</th>
//               <th className="right-text">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((b) => (
//               <tr key={b._id}>
//                 <td className="bold-white">{b.title}</td>
//                 <td className="text-muted">{b.author}</td>
//                 <td className="isbn-font">{b.isbn}</td>
//                 <td className="center-text stock-count">{b.totalQuantity}</td>
//                 <td className="center-text available-count">{b.availableQuantity}</td>
//                 <td>
//                   <span className={`badge ${b.availableQuantity > 0 ? 'badge-available' : 'badge-unavailable'}`}>
//                     {b.availableQuantity > 0 ? 'AVAILABLE' : 'OUT OF STOCK'}
//                   </span>
//                 </td>
//                 <td className="right-text">
//                   <button className="btn-delete-electric" onClick={() => handleDelete(b._id)}>
//                     DELETE
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//         .full-page-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
//         .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
//         .main-title { color: white; font-size: 2rem; margin: 0; }
//         .sub-title { color: #9ca3af; }
//         .table-wrap { width: 100%; overflow-x: auto; }
//         .electric-table { width: 100%; border-collapse: collapse; color: #e5e7eb; }
//         .electric-table th { 
//           background: #1f2937; color: #6366f1; padding: 12px 15px; 
//           font-weight: 600; text-transform: uppercase; font-size: 1.2rem; letter-spacing: 0.05em; 
//           text-align: left;
//         }
//         .electric-table td { padding: 15px; border-bottom: 1px solid #1f2937; font-size: 0.95rem; }
//         .bold-white { font-weight: bold; color:#9ca3af; }
//         .text-muted { color: #9ca3af; }
//         .isbn-font { font-family: monospace; color: #818cf8; }
//         .center-text { text-align: center; }
//         .right-text { text-align: right; }
//         .stock-count { color: #facc15; font-weight: bold; }
//         .available-count { color: #10b981; font-weight: bold; }
//         .badge { padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; }
//         .badge-available { background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; }
//         .badge-unavailable { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; }
//         .btn-delete-electric { 
//           background: transparent; color: #ef4444; font-size: 0.8rem; border: 1px solid #ef4444; 
//           padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: 0.2s; 
//         }
//         .btn-delete-electric:hover { background: #ef4444; color: white; }
//         .btn-refresh { font-size: 1rem; background: #374151; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
//         .btn-refresh:hover { background: #4b5563; }
//       `}</style>
//     </section>
//   );
// }
import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:5000';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/books`)
      .then((r) => {
        if (!r.ok) throw new Error("Server responded with an error");
        return r.json();
      })
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/books/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setBooks(prevBooks => prevBooks.filter(b => b._id !== id));
      }
    } catch (err) {
      alert("Connection failed.");
    }
  };

  // Logic to filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  if (loading) return <div className="loading" style={{color:'white', padding:'20px'}}>Loading inventory...</div>;

  return (
    <section className="full-page-container">
      <div className="header-flex">
        <div>
          <h1 className="main-title">Book Inventory</h1>
          <h5 className="sub-title">Full catalog overview.</h5>
        </div>
        
        {/* NEW SEARCH AREA */}
        <div className="action-area">
          <input 
            type="text" 
            placeholder="Search by title, author or ISBN..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchBooks} className="btn-refresh">Refresh List</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="electric-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th className="center-text">Total</th>
              <th className="center-text">Available</th>
              <th>Status</th>
              <th className="right-text">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((b) => (
                <tr key={b._id}>
                  <td className="bold-white">{b.title}</td>
                  <td className="text-muted">{b.author}</td>
                  <td className="isbn-font">{b.isbn}</td>
                  <td className="center-text stock-count">{b.totalQuantity}</td>
                  <td className="center-text available-count">{b.availableQuantity}</td>
                  <td>
                    <span className={`badge ${b.availableQuantity > 0 ? 'badge-available' : 'badge-unavailable'}`}>
                      {b.availableQuantity > 0 ? 'AVAILABLE' : 'OUT OF STOCK'}
                    </span>
                  </td>
                  <td className="right-text">
                    <button className="btn-delete-electric" onClick={() => handleDelete(b._id)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="center-text text-muted" style={{padding: '40px'}}>
                  No books found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .full-page-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
        .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; gap: 20px; }
        
        /* Action Area Styles */
        .action-area { display: flex; gap: 12px; align-items: center; flex-grow: 1; justify-content: flex-end; }
        .search-input { 
          background: #111827; 
          border: 1px solid #374151; 
          color: white; 
          padding: 10px 16px; 
          border-radius: 8px; 
          width: 300px; 
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #6366f1; }

        .main-title { color: white; font-size: 2rem; margin: 0; }
        .sub-title { color: #9ca3af; margin: 0; }
        .table-wrap { width: 100%; overflow-x: auto; }
        .electric-table { width: 100%; border-collapse: collapse; color: #e5e7eb; }
        .electric-table th { 
          background: #1f2937; color: #6366f1; padding: 12px 15px; 
          font-weight: 600; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em; 
          text-align: left;
        }
        .electric-table td { padding: 15px; border-bottom: 1px solid #1f2937; font-size: 0.95rem; }
        .bold-white { font-weight: bold; color: #fff; }
        .text-muted { color: #9ca3af; }
        .isbn-font { font-family: monospace; color: #818cf8; }
        .center-text { text-align: center; }
        .right-text { text-align: right; }
        .stock-count { color: #facc15; font-weight: bold; }
        .available-count { color: #10b981; font-weight: bold; }
        .badge { padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; }
        .badge-available { background:  #10b981; color: white; border: 1px solid #10b981; }
        .badge-unavailable { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; }
        .btn-delete-electric { 
          background: transparent; color: #ef4444; font-size: 0.8rem; border: 1px solid #ef4444; 
          padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: 0.2s; 
        }
        .btn-delete-electric:hover { background: #ef4444; color: white; }
        .btn-refresh { font-size: 1rem; background: #374151; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
        .btn-refresh:hover { background: #4b5563; }
      `}</style>
    </section>
  );
}