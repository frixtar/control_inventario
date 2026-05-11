import React, { useState, useEffect } from 'react';
import { inventarioService } from '../services/api';

function Inventario() {
  const [materiales, setMateriales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', categoria: '', unidadMedida: 'pieza', stockActual: 0, stockMinimo: 5, precioUnitario: 0 });

  useEffect(() => { cargarDatos(); }, []);
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [matRes, catRes] = await Promise.all([inventarioService.obtenerMateriales(), inventarioService.obtenerCategorias()]);
      setMateriales(matRes.data.data);
      setCategorias(catRes.data.data);
    } catch (error) { mostrarMensaje('error', 'Error al cargar datos'); }
    finally { setLoading(false); }
  };
  const mostrarMensaje = (tipo, texto) => { setMensaje({ tipo, texto }); setTimeout(() => setMensaje(null), 3000); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inventarioService.crearMaterial(formData);
      mostrarMensaje('success', 'Material creado exitosamente');
      setShowForm(false);
      setFormData({ nombre: '', descripcion: '', categoria: '', unidadMedida: 'pieza', stockActual: 0, stockMinimo: 5, precioUnitario: 0 });
      cargarDatos();
    } catch (error) { mostrarMensaje('error', error.response?.data?.message || 'Error al crear material'); }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Desactivar material?')) {
      try { await inventarioService.eliminarMaterial(id); mostrarMensaje('success', 'Material desactivado'); cargarDatos(); }
      catch { mostrarMensaje('error', 'Error al desactivar'); }
    }
  };

  if (loading) return <div className="loading">⏳ Cargando inventario...</div>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>📦 Inventario de Materiales</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? '❌ Cancelar' : '➕ Nuevo Material'}</button>
      </div>
      {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}
      {showForm && (
        <div className="card">
          <div className="card-title">Registrar Nuevo Material</div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>Nombre *</label><input required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder="Ej: Cable UTP Cat6" /></div>
              <div className="form-group"><label>Categoría *</label><select required value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}><option value="">Seleccionar</option>{categorias.map(cat => <option key={cat._id} value={cat._id}>{cat.nombre}</option>)}</select></div>
            </div>
            <div className="form-group"><label>Descripción</label><textarea value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} rows="2" /></div>
            <div className="form-row">
              <div className="form-group"><label>Unidad Medida</label><select value={formData.unidadMedida} onChange={e => setFormData({...formData, unidadMedida: e.target.value})}><option value="pieza">Pieza</option><option value="metro">Metro</option><option value="kilogramo">Kilogramo</option><option value="litro">Litro</option><option value="caja">Caja</option><option value="paquete">Paquete</option></select></div>
              <div className="form-group"><label>Stock Mínimo</label><input type="number" min="0" value={formData.stockMinimo} onChange={e => setFormData({...formData, stockMinimo: Number(e.target.value)})} /></div>
            </div>
            <button type="submit" className="btn btn-success">💾 Guardar Material</button>
          </form>
        </div>
      )}
      <div className="card">
        <div className="card-title">Materiales Registrados ({materiales.length})</div>
        <div className="table-container">
          <table><thead><tr><th>Nombre</th><th>Categoría</th><th>Stock</th><th>Mínimo</th><th>Unidad</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {materiales.map(mat => (
                <tr key={mat._id}>
                  <td><strong>{mat.nombre}</strong></td><td>{mat.categoria?.nombre || 'N/A'}</td><td>{mat.stockActual}</td><td>{mat.stockMinimo}</td><td>{mat.unidadMedida}</td>
                  <td>{mat.stockActual <= mat.stockMinimo ? <span className="badge badge-warning">Stock Bajo</span> : <span className="badge badge-success">OK</span>}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleEliminar(mat._id)}>🗑️</button></td>
                </tr>
              ))}
              {materiales.length === 0 && <tr><td colSpan="7" style={{textAlign:'center'}}>No hay materiales</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Inventario;
