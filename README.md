# Corralon de Materiales - E-commerce PWA

Este es un e-commerce moderno y premium para venta de materiales de construcción (Arena, Piedra Partida, Ladrillos).

## Características
- **React + Tailwind CSS**: Interfaz moderna, rápida y responsiva.
- **Node.js + Express + Sequelize**: Backend robusto con base de datos SQLite.
- **Autenticación JWT**: Inicio de sesión seguro para clientes y administradores.
- **PWA (Progressive Web App)**: Instalable en dispositivos móviles y funcional sin conexión.
- **Cálculo de Flete Inteligente**: 
  - Envío **SIN CARGO** dentro de los 10km.
  - Costo adicional por km fuera del radio inicial.
- **Panel Administrativo (ABM)**: Gestión completa de materiales, stock y precios.

## Requisitos
- Node.js (v18 o superior)
- npm

## Instalación y Ejecución Local

### 1. Clonar y configurar
```bash
git clone https://github.com/arielbulacio-coder/corralondemateriales.git
cd corralondemateriales
```

### 2. Iniciar el Backend
```bash
cd server
npm install
node seed.js # Poblar base de datos inicial
npm start # O node index.js
```
El servidor correrá en `http://localhost:5000`.

### 3. Iniciar el Frontend
```bash
cd client
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

## Usuarios de Prueba
- **Administrador**: `admin@corralon.com` / `admin123`
- **Cliente**: `juan@gmail.com` / `user123`

## Despliegue en GitHub Pages (PWA)
Para desplegar la versión estática PWA:
1. Asegúrate de que el repositorio en GitHub esté configurado.
2. En la carpeta `client`, ejecuta:
```bash
npm run deploy
```

## Estructura del Proyecto
- `/client`: Aplicación React, Tailwind, PWA.
- `/server`: Node.js, Sequelize, Autenticación.
