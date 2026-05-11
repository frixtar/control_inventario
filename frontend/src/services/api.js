import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });

export const inventarioService = {
  crearCategoria: (data) => api.post('/inventario/categorias', data),
  obtenerCategorias: () => api.get('/inventario/categorias'),
  crearMaterial: (data) => api.post('/inventario/materiales', data),
  obtenerMateriales: (params) => api.get('/inventario/materiales', { params }),
  obtenerMaterial: (id) => api.get(`/inventario/materiales/${id}`),
  actualizarMaterial: (id, data) => api.put(`/inventario/materiales/${id}`, data),
  eliminarMaterial: (id) => api.delete(`/inventario/materiales/${id}`),
  consultarDisponibilidad: (params) => api.get('/inventario/materiales/disponibilidad', { params })
};

export const movimientosService = {
  registrarEntrada: (data) => api.post('/movimientos/entradas', data),
  registrarSalida: (data) => api.post('/movimientos/salidas', data),
  obtenerHistorial: (params) => api.get('/movimientos/historial', { params }),
  obtenerResumen: () => api.get('/movimientos/resumen')
};

export const consumoService = {
  registrarConsumo: (data) => api.post('/consumo/registrar', data),
  validarDisponibilidad: (data) => api.post('/consumo/validar', data),
  obtenerPorTicket: (ticketId) => api.get(`/consumo/ticket/${ticketId}`),
  obtenerHistorial: (params) => api.get('/consumo/historial', { params })
};

export const integracionService = {
  webhook: (data) => api.post('/integracion/webhook', data),
  consultarDisponibilidadExterna: (data) => api.post('/integracion/consultar-disponibilidad', data),
  health: () => api.get('/integracion/health')
};

export default api;
