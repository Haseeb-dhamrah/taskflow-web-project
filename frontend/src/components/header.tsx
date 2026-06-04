import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. User ko feedback denay ke liye alert
    alert("Logging out from TaskFlow... 🔒");
    
    // 2. Clear session/state (agar future mein storage use karein)
    localStorage.clear(); 
    sessionStorage.clear();

    // 3. Wapas main route par redirect kar dena
    navigate('/');
    
    // Page ko reload karna taake state bilkul fresh ho jaye
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-placeholder">📋</span>
        <h1>TaskFlow</h1>
      </div>
      
      {/* Click event handler add kar diya */}
      <button className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};