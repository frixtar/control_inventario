import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Inventario from './components/Inventario';
import Movimientos from './components/Movimientos';
import Consumo from './components/Consumo';
import TicketSimulador from './components/TicketSimulador';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'inventario': return <Inventario />;
      case 'movimientos': return <Movimientos />;
      case 'consumo': return <Consumo />;
      case 'tickets': return <TicketSimulador />;
      default: return <Dashboard />;
    }
  };
  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}
export default App;
