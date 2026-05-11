import React, { useState, useEffect } from 'react';
import { movimientosService, inventarioService } from '../services/api';

function Movimientos() {
  const [historial, setHistorial] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [showEntrada, setShowEntrada] = useState(false);
  const [showSalida, setShowSalida] = useState(false);
  const [formData, setFormData] = useState({ material: '', cantidad: 1, motivo: 'compra', observaciones: '' });
  const [filtro, setFiltro] = useState({ tipo: '', material: '' });

  useEffect(() => { cargarDatos(); }, []);
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [histRes, matRes] = await Promise.all([movimientosService.obtenerHistorial({limit:100}), inventarioService.obtenerMateriales({activo:'true'})]);
      setHistorial(histRes.data.data);
      setMateriales(matRes.data.data);
    } catch { mostrarMensaje('error','Error al cargar'); } finally { setLoading(false); }
  };
  const mostrarMensaje = (tipo, texto) => { setMensaje({tipo,texto}); setTimeout(()=>setMensaje(null),3000); };

  const handleEntrada = async (e) => {
    e.preventDefault();
    try {
      await movimientosService.registrarEntrada({...formData, usuario: '65a1b2c3d4e5f6a7b8c9d0e1'});
      mostrarMensaje('success','Entrada registrada');
      setShowEntrada(false);
      cargarDatos();
    } catch(err) { mostrarMensaje('error', err.response?.data?.message || 'Error'); }
  };
  const handleSalida = async (e) => {
    e.preventDefault();
    try {
      await movimientosService.registrarSalida({...formData, usuario: '65a1b2c3d4e5f6a7b8c9d0e1'});
      mostrarMensaje('success','Salida registrada');
      setShowSalida(false);
      cargarDatos();
    } catch(err) { mostrarMensaje('error', err.response?.data?.message || 'Error'); }
  };

  if (loading) return <div className="loading">⏳ Cargando movimientos...</div>;
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.5rem' }}>
        <h2>🔄 Movimientos</h2>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          <button className="btn btn-success" onClick={()=>{setShowEntrada(true);setShowSalida(false);}}>📥 Entrada</button>
          <button className="btn btn-danger" onClick={()=>{setShowSalida(true);setShowEntrada(false);}}>📤 Salida</button>
        </div>
      </div>
      {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}

      {showEntrada && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setShowEntrada(false)}>
          <div className="modal">
            <h3>📥 Registrar Entrada</h3>
            <form onSubmit={handleEntrada}>
              <div className="form-group"><label>Material *</label><select required value={formData.material} onChange={e=>setFormData({...formData, material:e.target.value})}><option value="">Seleccionar</option>{materiales.map(m=><option key={m._id} value={m._id}>{m.nombre} (Stock:{m.stockActual})</option>)}</select></div>
              <div className="form-row">
                <div className="form-group"><label>Cantidad *</label><input type="number" min="1" required value={formData.cantidad} onChange={e=>setFormData({...formData, cantidad:Number(e.target.value)})} /></div>
                <div className="form-group"><label>Motivo</label><select value={formData.motivo} onChange={e=>setFormData({...formData, motivo:e.target.value})}><option value="compra">Compra</option><option value="devolucion">Devolución</option><option value="ajuste">Ajuste</option><option value="entrada_inicial">Entrada Inicial</option></select></div>
              </div>
              <div className="form-group"><label>Observaciones</label><textarea value={formData.observaciones} onChange={e=>setFormData({...formData, observaciones:e.target.value})} rows="2" /></div>
              <button type="submit" className="btn btn-success">✅ Registrar Entrada</button>
              <button type="button" className="btn btn-secondary" onClick={()=>setShowEntrada(false)} style={{marginLeft:'0.5rem'}}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {showSalida && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setShowSalida(false)}>
          <div className="modal">
            <h3>📤 Registrar Salida</h3>
            <form onSubmit={handleSalida}>
              <div className="form-group"><label>Material *</label><select required value={formData.material} onChange={e=>setFormData({...formData, material:e.target.value})}><option value="">Seleccionar</option>{materiales.map(m=><option key={m._id} value={m._id}>{m.nombre} (Stock:{m.stockActual})</option>)}</select></div>
              <div className="form-row">
                <div className="form-group"><label>Cantidad *</label><input type="number" min="1" required value={formData.cantidad} onChange={e=>setFormData({...formData, cantidad:Number(e.target.value)})} /></div>
                <div className="form-group"><label>Motivo</label><select value={formData.motivo} onChange={e=>setFormData({...formData, motivo:e.target.value})}><option value="salida_manual">Salida Manual</option><option value="consumo_ticket">Consumo por Ticket</option></select></div>
              </div>
              <div className="form-group"><label>Observaciones</label><textarea value={formData.observaciones} onChange={e=>setFormData({...formData, observaciones:e.target.value})} rows="2" /></div>
              <button type="submit" className="btn btn-danger">✅ Registrar Salida</button>
              <button type="button" className="btn btn-secondary" onClick={()=>setShowSalida(false)} style={{marginLeft:'0.5rem'}}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      <div className="card" style={{marginBottom:'1rem'}}>
        <div style={{display:'flex', gap:'1rem', alignItems:'flex-end'}}>
          <div className="form-group" style={{marginBottom:0}}><label>Tipo</label><select value={filtro.tipo} onChange={e=>setFiltro({...filtro, tipo:e.target.value})}><option value="">Todos</option><option value="entrada">Entradas</option><option value="salida">Salidas</option></select></div>
          <button className="btn btn-primary" onClick={async()=>{ const res = await movimientosService.obtenerHistorial(filtro); setHistorial(res.data.data); }}>🔍 Filtrar</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">📋 Historial ({historial.length})</div>
        <div className="table-container">
          <table><thead><tr><th>Fecha</th><th>Tipo</th><th>Material</th><th>Cantidad</th><th>Motivo</th><th>Stock Resultante</th></tr></thead>
            <tbody>
              {historial.map(mov => (
                <tr key={mov._id}>
                  <td>{new Date(mov.createdAt).toLocaleString()}</td>
                  <td><span className={`badge ${mov.tipo==='entrada'?'badge-success':'badge-danger'}`}>{mov.tipo.toUpperCase()}</span></td>
                  <td>{mov.material?.nombre || 'N/A'}</td><td>{mov.cantidad}</td><td>{mov.motivo}</td><td>{mov.stockResultante}</td>
                </tr>
              ))}
              {historial.length===0 && <tr><td colSpan="6">Sin movimientos</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Movimientos;
