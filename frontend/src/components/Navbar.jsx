import React from 'react';
function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'inventario', label: '📦 Inventario' },
    { id: 'movimientos', label: '🔄 Movimientos' },
    { id: 'consumo', label: '🎫 Consumo' },
    { id: 'tickets', label: '🔗 Tickets' }
  ];
  return (
    <nav className="navbar">
      <div className="navbar-brand">🔧 Control de Inventarios TI</div>
      <div className="navbar-links">
        {tabs.map(tab => (
          <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
export default Navbar;
