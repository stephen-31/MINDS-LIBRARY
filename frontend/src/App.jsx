import { useState } from 'react';
import AddBookForm from './components/AddBookForm';
import IssueBookForm from './components/IssueBookForm';
import ReturnBookForm from './components/ReturnBookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  const tabs = [
    { id: 'inventory', label: 'Inventory', icon: '📋' },
    { id: 'add-book', label: 'Add Book', icon: '📚' },
    { id: 'issue', label: 'Issue Book', icon: '📤' },
    { id: 'return', label: 'Return Book', icon: '📥' },
  ];

  return (
    <div className="app-layout">
      {/* MODERN SIDEBAR */}
      <aside className="sidebar">
        <img src="/Logo1.png" alt="Logo" className="brand-logo-img" />
        <div className="sidebar-brand">
           <div className="brand-text">
            <h1>MINDS</h1>
            <span>Library Management</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="system-status">
            <span className="status-dot"></span> Online
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT STAGE */}
      <main className="main-content">
        <div className="content-container animate-fade">
          {activeTab === 'inventory' && (
            <div className="view-wrapper">
              {/* <header className="view-header">
                <h2>Catalog Inventory</h2>
                <p>Manage and track all registered titles.</p>
              </header> */}
              <BookList key={refreshKey} />
            </div>
          )}

          {activeTab === 'add-book' && (
            <div className="view-wrapper narrow">
              <AddBookForm onSuccess={refresh} />
            </div>
          )}
          
          {activeTab === 'issue' && (
            <div className="view-wrapper narrow">
              <IssueBookForm onSuccess={refresh} key={refreshKey} />
            </div>
          )}

          {activeTab === 'return' && (
            <div className="view-wrapper narrow">
              <ReturnBookForm onSuccess={refresh} key={refreshKey} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;