# 📦 Sistema de Control de Inventarios para Mantenimiento de Equipos de Cómputo y Redes

![MERN Stack](https://img.shields.io/badge/stack-MERN-green)  
![Node.js](https://img.shields.io/badge/Node.js-v16+-339933)  
![React](https://img.shields.io/badge/React-18-61DAFB)  
![MongoDB](https://img.shields.io/badge/MongoDB-7+-4EA94B)  
![Express](https://img.shields.io/badge/Express-4.x-000000)

Sistema **web completo** desarrollado con la pila **MERN** (MongoDB, Express, React, Node.js) para la gestión de inventarios de materiales y herramientas utilizados en mantenimiento de equipos de cómputo y redes.  
Incluye integración con un sistema de tickets de soporte mediante **API REST** y **Webhooks**, cumpliendo con todos los requisitos del proyecto integrador.


## 🧱 Arquitectura del Sistema

El sistema se divide en **4 servicios lógicos** (implementados en un solo backend modular):

1. **Servicio de Inventario** – CRUD de materiales, categorías y consulta de stock.
2. **Servicio de Movimientos** – Registro de entradas/salidas e historial.
3. **Servicio de Consumo** – Asociación de materiales a tickets de soporte, validación y descuento.
4. **Servicio de Integración** – Webhooks y endpoints para comunicación con sistema de tickets externo.

![Arquitectura](https://via.placeholder.com/800x300?text=Diagrama+de+Arquitectura) *(puedes agregar aquí tu diagrama)*

---

## 🛠️ Tecnologías utilizadas

| Capa        | Tecnología                     |
|-------------|--------------------------------|
| Backend     | Node.js + Express              |
| Base de Datos | MongoDB + Mongoose           |
| Frontend    | React + Vite                   |
| Comunicación| REST API JSON, Fetch/Axios     |
| Control de versiones | Git + GitHub            |
| Pruebas     | Postman                        |

---

## 📁 Estructura del proyecto

inventario/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── inventarioController.js
│ │ ├── movimientosController.js
│ │ ├── consumoController.js
│ │ └── integracionController.js
│ ├── models/
│ │ ├── Material.js
│ │ ├── CategoriaMaterial.js
│ │ ├── Movimiento.js
│ │ ├── Consumo.js
│ │ └── Usuario.js
│ ├── middleware/
│ │ └── validarStock.js
│ ├── routes/
│ │ ├── inventarioRoutes.js
│ │ ├── movimientosRoutes.js
│ │ ├── consumoRoutes.js
│ │ └── integracionRoutes.js
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Inventario.jsx
│ │ │ ├── Movimientos.jsx
│ │ │ ├── Consumo.jsx
│ │ │ ├── TicketSimulador.jsx
│ │ │ └── Navbar.jsx
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── .gitignore
└── README.md
## ⚙️ Requisitos previos

- **Node.js** v16 o superior
- **MongoDB** corriendo en `mongodb://localhost:27017`
- **Git** (opcional, para clonar)
- **Navegador web** moderno

---

## 🔧 Instalación y ejecución

### 🔙 Backend (API REST)

```bash
# 1. Clonar repositorio (si no lo tienes local)
git clone https://github.com/TU_USUARIO/inventario-mern.git
cd materiales/backend

# 2. Instalar dependencias
como instalar el backend node.js:

npm install express mongoose dotenv
npm install --save-dev nodemon
npm install cors
Ejecutar con:
npm run dev

# 3. Configurar variables de entorno (crear archivo .env)
echo 'PORT=5000 o 5001' > .env
echo 'MONGODB_URI=mongodb://localhost:27017/inventario_mantenimiento' >> .env

# 4. Ejecutar en modo desarrollo (con reinicio automático)
npm run dev

Instalación del frontend:
cd materiales/frontend

#2 instalación de dependencias
npm init -y
npm install react react-dom axios
npm install -D vite @vitejs/plugin-react

# 3 Configuración de api.js:
const API_URL = 'http://localhost:5001/api';

# 4 Ejecutar para iniciar el dasboard:
npm run dev
