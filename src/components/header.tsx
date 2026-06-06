import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-placeholder">📋</span>
        <h1>TaskFlow</h1>
      </div>
      <button className="btn logout-btn">Logout</button>
    </header>
  );
};