import { useState, useEffect } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = () => {
    fetch('https://minds-library-backend.onrender.com/api/books')
      .then((r) => r.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`https://minds-library-backend.onrender.com/api/books/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setBooks(prevBooks => prevBooks.filter(b => b._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Server rejected deletion");
      }
    } catch (err) {
      alert("Connection failed. Ensure Backend is running.");
    }
  };

  if (loading) return <div className="loading" style={{color:'white', padding:'20px'}}>Loading inventory...</div>;
  if (books.length === 0) return <div className="empty" style={{color:'white', padding:'20px'}}>No books in inventory yet.</div>;

  return (
    <section className="full-page-container">
      <div className="header-flex">
        <div>
          <h2 className="main-title">Book Inventory</h2>
          <p className="sub-title">Full catalog overview.</p>
        </div>
        <button onClick={fetchBooks} className="btn-refresh">Refresh List</button>
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
            {books.map((b) => (
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
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .full-page-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
        .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
        .main-title { color: white; font-size: 2.2rem; margin: 0; }
        .sub-title { color: #9ca3af; }
        .table-wrap { 
        // background: #111827; border-radius: 12px; padding: 15px;overflow-x: auto;
           width: 100%;
          border-collapse: collapse;
          font-size: 1.5rem;
          text-align: left;}
        .electric-table { width: 100%; border-collapse: collapse; color: #e5e7eb; }
        .electric-table th {background: #1f2937;
          color: #6366f1;
          padding: 12px 15px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 1.5rem;
          letter-spacing: 0.05em; 
        // color: #6366f1; text-transform: uppercase; font-size: 1.5rem; padding: 15px; border-bottom: 2px solid #374151; text-align: left; 
        }
        .electric-table td { padding: 15px; border-bottom: 1px solid #1f2937; }
        .bold-white { font-weight: bold; color: #fff; }
        .text-muted { color: #9ca3af; }
        .isbn-font { font-family: monospace; color: #818cf8; }
        .center-text { text-align: center; }
        .right-text { text-align: right; }
        .stock-count { color: #facc15; font-weight: bold; }
        .available-count { color: #10b981; font-weight: bold; }
        .badge { padding: 5px 10px; border-radius: 6px; font-size: 1.5rem; font-weight: bold; }
        .badge-available { background: #10b981; color: white; border: 1px solid #10b981; }
        .badge-unavailable { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; }
        .btn-delete-electric { background: transparent; color: #ef4444;font-size:1.5rem; border: 1px solid #ef4444; padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: 0.2s; }
        .btn-delete-electric:hover { background: #ef4444; color: white; }
        .btn-refresh {font-size:1.5rem;background: #374151; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
      `}</style>
    </section>
  );
}