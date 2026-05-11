import React, { useState } from 'react';
import { integracionService } from '../services/api';

function TicketSimulador() {
  const [ticketData, setTicketData] = useState({
    ticket_id: 'TCK-1001',
    tecnico: 'Juan Pérez',
    materiales: [{ nombre: 'Cable UTP', cantidad: 5 }, { nombre: 'Conector RJ45', cantidad: 10 }]
  });
  const [respuesta, setRespuesta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventoTipo, setEventoTipo] = useState('ticket_creado');
  const [consultaNombres, setConsultaNombres] = useState('');
  const [disponibilidadResult, setDisponibilidadResult] = useState(null);

  const handleWebhook = async () => {
    setLoading(true); setRespuesta(null);
    try {
      const mats = ticketData.materiales.map(m=>({nombre:m.nombre.trim(), cantidad:parseInt(m.cantidad)}));
      const res = await integracionService.webhook({ evento: eventoTipo, ticket_id: ticketData.ticket_id, tecnico: ticketData.tecnico, materiales: mats });
      setRespuesta({ tipo: 'success', data: res.data });
    } catch(err) { setRespuesta({ tipo: 'error', data: err.response?.data || {message:err.message} }); }
    finally { setLoading(false); }
  };

  const handleConsultar = async () => {
    setLoading(true); setDisponibilidadResult(null);
    try {
      const nombres = consultaNombres.split(',').map(n=>n.trim()).filter(n=>n);
      const res = await integracionService.consultarDisponibilidadExterna({ nombres });
      setDisponibilidadResult(res.data.data);
    } catch(err) { setDisponibilidadResult({error: err.message}); }
    finally { setLoading(false); }
  };

  const agregarMaterial = () => setTicketData({...ticketData, materiales: [...ticketData.materiales, {nombre:'', cantidad:1}]});
  const actualizarMaterial = (index, campo, valor) => {
    const nuevos = [...ticketData.materiales];
    nuevos[index][campo] = campo==='cantidad' ? parseInt(valor)||1 : valor;
    setTicketData({...ticketData, materiales: nuevos});
  };

  return (
    <div>
      <h2>🔗 Simulador de Integración con Tickets</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
        <div className="card">
          <div className="card-title">📩 Simular Webhook</div>
          <div className="form-group"><label>Evento</label><select value={eventoTipo} onChange={e=>setEventoTipo(e.target.value)}><option value="ticket_creado">Ticket Creado (Validar)</option><option value="ticket_completado">Ticket Completado (Consumir)</option></select></div>
          <div className="form-group"><label>Ticket ID</label><input type="text" value={ticketData.ticket_id} onChange={e=>setTicketData({...ticketData, ticket_id:e.target.value})} /></div>
          <div className="form-group"><label>Técnico</label><input type="text" value={ticketData.tecnico} onChange={e=>setTicketData({...ticketData, tecnico:e.target.value})} /></div>
          <div className="form-group"><label>Materiales</label>
            {ticketData.materiales.map((mat,idx)=>(
              <div key={idx} style={{display:'flex', gap:'0.5rem', marginBottom:'0.5rem'}}>
                <input type="text" placeholder="Nombre" value={mat.nombre} onChange={e=>actualizarMaterial(idx,'nombre',e.target.value)} style={{flex:2}} />
                <input type="number" min="1" value={mat.cantidad} onChange={e=>actualizarMaterial(idx,'cantidad',e.target.value)} style={{width:'80px'}} />
              </div>
            ))}
            <button className="btn btn-sm btn-secondary" onClick={agregarMaterial}>+ Agregar</button>
          </div>
          <button className="btn btn-primary" onClick={handleWebhook} disabled={loading}>{loading?'⏳ Enviando...':'🚀 Enviar Webhook'}</button>
          {respuesta && (
            <div style={{marginTop:'1rem'}} className={`alert alert-${respuesta.tipo==='success'?'success':'error'}`}>
              <strong>Respuesta:</strong>
              <pre style={{whiteSpace:'pre-wrap', fontSize:'0.8rem'}}>{JSON.stringify(respuesta.data, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title">🔍 Consultar Disponibilidad</div>
          <div className="form-group"><label>Materiales (separados por coma)</label><input type="text" placeholder="Cable UTP, Conector RJ45" value={consultaNombres} onChange={e=>setConsultaNombres(e.target.value)} /></div>
          <button className="btn btn-primary" onClick={handleConsultar} disabled={loading}>🔍 Consultar</button>
          {disponibilidadResult && !disponibilidadResult.error && (
            <div style={{marginTop:'1rem'}}>
              <table><thead><tr><th>Material</th><th>Stock</th><th>Disponible</th></tr></thead>
                <tbody>{disponibilidadResult.map((item,idx)=><tr key={idx}><td>{item.nombre}</td><td>{item.stockActual} {item.unidadMedida}</td><td><span className={`badge ${item.disponible?'badge-success':'badge-danger'}`}>{item.disponible?'Sí':'No'}</span></td></tr>)}</tbody>
              </table>
            </div>
          )}
          {disponibilidadResult?.error && <div className="alert alert-error">{disponibilidadResult.error}</div>}
        </div>
      </div>
    </div>
  );
}
export default TicketSimulador;
