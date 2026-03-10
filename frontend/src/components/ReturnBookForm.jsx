// import { useState, useEffect, useCallback } from 'react';

// // Define the backend URL to match your server configuration
// const API_BASE_URL = 'http://localhost:5000';

// export default function ReturnBookForm({ onSuccess }) {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [message, setMessage] = useState(null);

//   const fetchIssued = useCallback(async () => {
//     setFetching(true);
//     try {
//       // Updated with API_BASE_URL
//       const res = await fetch(`${API_BASE_URL}/api/transactions?status=issued`);
//       if (!res.ok) throw new Error("Could not sync with server");
//       const data = await res.json();
//       setTransactions(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setMessage({ type: 'error', text: "Connection error: Check if backend is running." });
//     } finally {
//       setFetching(false);
//     }
//   }, []);

//   useEffect(() => { fetchIssued(); }, [fetchIssued]);

//   const handleReturn = async (id) => {
//     setLoading(true);
//     setMessage(null);
//     try {
//       // Updated with API_BASE_URL
//       const res = await fetch(`${API_BASE_URL}/api/transactions/return/${id}`, { method: 'PUT' });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Failed to process return');

//       setMessage({ type: 'success', text: "Transaction cleared successfully!" });
//       fetchIssued(); 
//       onSuccess?.();
//     } catch (err) {
//       setMessage({ type: 'error', text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="traditional-container">
//       <div className="table-header">
//         <h1>Issued Books Registry</h1>
//         <h5 class="sub-title">Manage and clear active book loans</h5>
//       </div>

//       {message && (
//         <div className={`status-banner ${message.type}`}>
//           {message.text}
//         </div>
//       )}

//       <div className="table-viewport">
//         <table className="registry-table">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Grade / Hostel</th>
//               <th>Book Title</th>
//               <th>Issue Date</th>
//               <th className="action-col">Control</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fetching ? (
//               <tr><td colSpan="5" className="meta-row">Loading registry records...</td></tr>
//             ) : transactions.length === 0 ? (
//               <tr><td colSpan="5" className="meta-row">No active transactions found.</td></tr>
//             ) : (
//               transactions.map((t) => (
//                 <tr key={t._id}>
//                   <td className="emp-text">{t.studentId?.name || 'N/A'}</td>
//                   <td>{t.studentId?.grade} <span className="sep">|</span> {t.studentId?.hostelNumber}</td>
//                   <td className="emp-text">{t.bookId?.title || 'Unknown Book'}</td>
//                   <td>{new Date(t.issueDate).toLocaleDateString()}</td>
//                   <td className="action-col">
//                     <button 
//                       className="reg-return-btn"
//                       disabled={loading} 
//                       onClick={() => handleReturn(t._id)}
//                     >
//                       {loading ? '...' : 'Return'}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//       h1{font-size: 2rem;}
//       .sub-title{color: #9ca3af;}
//         .traditional-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
//         .table-header { margin-bottom: 20px; border-bottom: 1px solid #1f2937; padding-bottom: 15px; }
//         .table-header h2 { margin: 0; color: #fff; font-size: 1.2rem; }
//         .table-header p { margin: 5px 0 0; color: #6b7280; font-size: 1.1rem; }
//         .table-viewport { overflow-x: auto; }
//         .registry-table { width: 100%; border-collapse: collapse; text-align: left; }
//         .registry-table th { background: #1f2937; color: #6366f1; padding: 12px 15px; font-weight: 600; text-transform: uppercase; font-size: 1.2rem; letter-spacing: 0.05em; }
//         .registry-table td { padding: 14px 15px; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 1rem; }
//         .registry-table tr:hover td { background: #1e293b; }
//         .emp-text { color: #f3f4f6; font-weight: 500; }
//         .sep { color: #374151; margin: 0 4px; }
//         .action-col { text-align: right; width: 100px; }
//         .reg-return-btn { background: #3b82f6; color: white; border: none; padding: 6px 14px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.2s;font-size: 1rem; }
//         .reg-return-btn:hover:not(:disabled) { background: #2563eb; }
//         .reg-return-btn:disabled { opacity: 0.4; cursor: not-allowed; }
//         .meta-row { text-align: center; padding: 40px !important; color: #6b7280; font-style: italic; }
//         .status-banner { padding: 12px; border-radius: 4px; margin-bottom: 20px; font-weight: 500; }
//         .success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; }
//         .error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; }
//       `}</style>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx'; // Import the library

const API_BASE_URL = 'http://localhost:5000';

export default function ReturnBookForm({ onSuccess }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchIssued = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/transactions?status=issued`);
      if (!res.ok) throw new Error("Could not sync with server");
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage({ type: 'error', text: "Connection error: Check if backend is running." });
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchIssued(); }, [fetchIssued]);

  // --- NEW: Download Logic ---
  const downloadExcel = () => {
    if (transactions.length === 0) return;

    // Map data to a clean format for Excel
    const dataToExport = transactions.map(t => ({
      "Student Name": t.studentId?.name || 'N/A',
      "Grade": t.studentId?.grade || 'N/A',
      "Hostel Number": t.studentId?.hostelNumber || 'N/A',
      "Book Title": t.bookId?.title || 'Unknown',
      "Issue Date": new Date(t.issueDate).toLocaleDateString(),
      "Status": t.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Issued Books");
    
    // Generate file and trigger download
    XLSX.writeFile(workbook, `Issued_Books_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  const handleReturn = async (id) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/transactions/return/${id}`, { method: 'PUT' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to process return');

      setMessage({ type: 'success', text: "Transaction cleared successfully!" });
      fetchIssued(); 
      onSuccess?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="traditional-container">
      <div className="table-header">
        <h1>Issued Books Registry</h1>
        <h5 className="sub-title">Manage and clear active book loans</h5>
      </div>

      {/* NEW: Top Bar with Download Action */}
      <div className="registry-controls">
        <div className="search-placeholder">
          {/* You could add a search input here later to match your BookList */}
        </div>
        <button 
          className="download-btn" 
          onClick={downloadExcel}
          disabled={transactions.length === 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export to Excel
        </button>
      </div>

      {message && (
        <div className={`status-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="table-viewport">
        <table className="registry-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade / Hostel</th>
              <th>Book Title</th>
              <th>Issue Date</th>
              <th className="action-col">Control</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan="5" className="meta-row">Loading registry records...</td></tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan="5" className="meta-row">No active transactions found.</td></tr>
            ) : (
              transactions.map((t) => (
                <tr key={t._id}>
                  <td className="emp-text">{t.studentId?.name || 'N/A'}</td>
                  <td>{t.studentId?.grade} <span className="sep">|</span> {t.studentId?.hostelNumber}</td>
                  <td className="emp-text">{t.bookId?.title || 'Unknown Book'}</td>
                  <td>{new Date(t.issueDate).toLocaleDateString()}</td>
                  <td className="action-col">
                    <button 
                      className="reg-return-btn"
                      disabled={loading} 
                      onClick={() => handleReturn(t._id)}
                    >
                      {loading ? '...' : 'Return'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        h1 { font-size: 2rem; margin-bottom: 5px; }
        .sub-title { color: #9ca3af; margin-top: 0; margin-bottom: 20px; }
        .traditional-container { background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }
        
        /* NEW: Control Bar Styles */
        .registry-controls { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 20px; 
          gap: 15px;
        }
        
        .download-btn {
          display: flex;
          align-items: center;
          background: #10b981; /* Green color for Excel */
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          font-size: 0.95rem;
        }
        .download-btn:hover:not(:disabled) { background: #059669; transform: translateY(-1px); }
        .download-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .table-viewport { overflow-x: auto; }
        .registry-table { width: 100%; border-collapse: collapse; text-align: left; }
        .registry-table th { background: #1f2937; color: #6366f1; padding: 12px 15px; font-weight: 600; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em; }
        .registry-table td { padding: 14px 15px; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 1rem; }
        .registry-table tr:hover td { background: #1e293b; }
        .emp-text { color: #f3f4f6; font-weight: 500; }
        .sep { color: #374151; margin: 0 4px; }
        .action-col { text-align: right; width: 100px; }
        .reg-return-btn { background: #3b82f6; color: white; border: none; padding: 6px 14px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .reg-return-btn:hover:not(:disabled) { background: #2563eb; }
        .status-banner { padding: 12px; border-radius: 4px; margin-bottom: 20px; font-weight: 500; }
        .success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; }
        .error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; }
        .meta-row { text-align: center; padding: 40px !important; color: #6b7280; font-style: italic; }
      `}</style>
    </div>
  );
}