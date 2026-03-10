import { useState, useEffect, useCallback } from 'react';

export default function ReturnBookForm({ onSuccess }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchIssued = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/transactions?status=issued');
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

  const handleReturn = async (id) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/transactions/return/${id}`, { method: 'PUT' });
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
        <h2>Issued Books Registry</h2>
        <p>Manage and clear active book loans</p>
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
        .traditional-container {
          // background: #111827;
          // border: 1px solid #1f2937;
          // border-radius: 8px;
          // padding: 24px;
          // color: #d1d5db;
        background: #1a2233; padding: 2rem; border-radius: 12px; color: white; }

        .table-header { margin-bottom: 20px; border-bottom: 1px solid #1f2937; padding-bottom: 15px; }
        .table-header h3 { margin: 0; color: #fff; font-size: 1.5rem; }
        .table-header p { margin: 5px 0 0; color: #6b7280; font-size: 1.5rem; }

        .table-viewport { overflow-x: auto; }

        .registry-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 1.5rem;
          text-align: left;
        }

        .registry-table th {
          background: #1f2937;
          color: #6366f1;
          padding: 12px 15px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 1.5rem;
          letter-spacing: 0.05em;
        }

        .registry-table td {
          padding: 14px 15px;
          border-bottom: 1px solid #1f2937;
          color: #9ca3af;
        }

        .registry-table tr:hover td { background: #1a2233; }

        .emp-text { color: #f3f4f6; font-weight: 500; }
        .sep { color: #374151; margin: 0 4px; }
        .action-col { text-align: right; width: 100px; }

        .reg-return-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 6px 14px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1.5rem;
          transition: all 0.2s;
        }

        .reg-return-btn:hover:not(:disabled) { background: #2563eb; }
        .reg-return-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .meta-row { text-align: center; padding: 40px !important; color: #6b7280; font-style: italic; }

        .status-banner {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-weight: 500;
          font-size: 1.5rem;
        }
        .success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; }
        .error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; }
      `}</style>
    </div>
  );
}