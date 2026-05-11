import React, { useState, useEffect } from 'react';
import { inventarioService, movimientosService, integracionService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({ totalMateriales: 0, stockBajo: 0, totalEntradas: 0, totalSalidas: 0 });
  const [salud, setSalud] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { cargarDatos(); }, []);
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [matRes, resumenRes, saludRes] = await Promise.all([
        inventarioService.obtenerMateriales(),
        movimientosService.obtenerResumen(),
        integracionService.health()
      ]);
      const materiales = matRes.data.data;
      const stockBajo = materiales.filter(m => m.stockActual <= m.stockMinimo).length;
      setStats({
        totalMateriales: matRes.data.count,
        stockBajo,
        totalEntradas: resumenRes.data.data.entradas.count,
        totalSalidas: resumenRes.data.data.salidas.count
      });
      setSalud(saludRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="loading">⏳ Cargando dashboard...</div>;
  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>📊 Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-value">{stats.totalMateriales}</div><div className="stat-label">Materiales Registrados</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: stats.stockBajo > 0 ? '#dc3545' : '#0d9488' }}>{stats.stockBajo}</div><div className="stat-label">Materiales con Stock Bajo</div></div>
        <div className="stat-card"><div className="stat-value">{stats.totalEntradas}</div><div className="stat-label">Entradas Registradas</div></div>
        <div className="stat-card"><div className="stat-value">{stats.totalSalidas}</div><div className="stat-label">Salidas Registradas</div></div>
      </div>
      {salud && (
        <div className="card">
          <div className="card-title">🟢 Estado del Sistema</div>
          <p><strong>Servicio:</strong> {salud.servicio}</p>
          <p><strong>Versión:</strong> {salud.version}</p>
          <p><strong>Base de Datos:</strong> {salud.baseDatos}</p>
          <p><strong>Última verificación:</strong> {new Date(salud.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
