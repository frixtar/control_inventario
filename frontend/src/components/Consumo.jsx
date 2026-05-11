import React, { useState, useEffect } from 'react';
import { consumoService } from '../services/api';

function Consumo() {
  const [consumos, setConsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [buscarTicket, setBuscarTicket] = useState('');
  const [consumoBuscado, setConsumoBuscado] = useState(null);

  useEffect(() => { cargarHistorial(); }, []);
  const cargarHistorial = async () => {
    try { setLoading(true); const res = await consumoService.obtenerHistorial(); setConsumos(res.data.data); }
    catch { mostrarMensaje('error','Error al cargar'); } finally { setLoading(false); }
  };
  const mostrarMensaje = (tipo, texto) => { setMensaje({tipo,texto}); setTimeout(()=>setMensaje(null),3000); };
  const buscarPorTicket = async () => {
    if (!buscarTicket.trim()) return;
    try { setLoading(true); const res = await consumoService.obtenerPorTicket(buscarTicket.trim()); setConsumoBuscado(res.data.data); }
    catch { setConsumoBuscado(null); mostrarMensaje('error','No encontrado'); } finally { setLoading(false); }
  };

  if (loading) return <div className="loading">⏳ Cargando...</div>;
  return (
    <div>
      <h2>🎫 Consumo por Tickets</h2>
      {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}
      <div className="card">
        <div className="card-title">🔍 Buscar Consumo por Ticket</div>
        <div style={{display:'flex', gap:'0.5rem'}}>
          <input type="text" placeholder="TCK-1001" value={buscarTicket} onChange={e=>setBuscarTicket(e.target.value)} style={{flex:1}} className="form-control" />
          <button className="btn btn-primary" onClick={buscarPorTicket}>Buscar</button>
        </div>
        {consumoBuscado && (
          <div style={{marginTop:'1rem', background:'#f8f9fa', padding:'1rem', borderRadius:'8px'}}>
            <h4>Ticket: {consumoBuscado.ticketId}</h4>
            <p><strong>Técnico:</strong> {consumoBuscado.tecnico}</p>
            <p><strong>Estado:</strong> <span className="badge badge-success">{consumoBuscado.estado}</span></p>
            <p><strong>Fecha:</strong> {new Date(consumoBuscado.createdAt).toLocaleString()}</p>
            <h5>Materiales:</h5>
            <ul>{consumoBuscado.materiales.map((item,idx)=><li key={idx}>{item.material?.nombre||'N/A'} - {item.cantidad} {item.material?.unidadMedida||''}</li>)}</ul>
          </div>
        )}
      </div>
      <div className="card">
        <div className="card-title">📋 Historial ({consumos.length})</div>
        <div className="table-container">
          <table><thead><tr><th>Ticket</th><th>Técnico</th><th>Materiales</th><th>Estado</th><th>Fecha</th></tr></thead>
            <tbody>
              {consumos.map(c=>(
                <tr key={c._id}>
                  <td><strong>{c.ticketId}</strong></td><td>{c.tecnico}</td>
                  <td>{c.materiales.map((item,i)=><span key={i} className="badge badge-info" style={{marginRight:'0.25rem'}}>{item.material?.nombre||'N/A'} x{item.cantidad}</span>)}</td>
                  <td><span className={`badge ${c.estado==='completado'?'badge-success':'badge-warning'}`}>{c.estado}</span></td>
                  <td>{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {consumos.length===0 && <tr><td colSpan="5">Sin registros</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Consumo;
