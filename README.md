# 📦 Sistema de Control de Inventarios para Mantenimiento de Equipos de Cómputo y Redes

![MERN Stack](https://img.shields.io/badge/stack-MERN-green)  
![Node.js](https://img.shields.io/badge/Node.js-v16+-339933)  
![React](https://img.shields.io/badge/React-18-61DAFB)  
![MongoDB](https://img.shields.io/badge/MongoDB-7+-4EA94B)  
![Express](https://img.shields.io/badge/Express-4.x-000000)

Sistema **web completo** desarrollado con la pila **MERN** (MongoDB, Express, React, Node.js) para la gestión de inventarios de materiales y herramientas utilizados en mantenimiento de equipos de cómputo y redes.  
Incluye integración con un sistema de tickets de soporte mediante **API REST** y **Webhooks**, cumpliendo con todos los requisitos del proyecto integrador.

---

## 🎯 Problemática que resuelve

- ❌ Falta de registro claro de materiales disponibles.
- ❌ Desconocimiento del consumo real de insumos.
- ❌ Sin control de entradas y salidas de inventario.
- ❌ Faltantes inesperados y nula trazabilidad.
- ❌ Sistema de tickets aislado, sin integración con inventario.

---

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
