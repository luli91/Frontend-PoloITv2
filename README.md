# 📦 PoloIT — Sistema de Donaciones

Aplicación web desarrollada con **React**, **Redux Toolkit** y **Vite**, enfocada en la autenticación de usuarios, gestión de donaciones, y organización de publicaciones. Diseñada con una arquitectura modular, escalable y mantenible, ideal para contextos institucionales o comunitarios.

---

## 🚀 Tecnologías utilizadas

- **React 19** + **Vite**
- **Redux Toolkit** para manejo de estado global
- **React Router DOM v7** para navegación
- **PrimeReact** + **PrimeFlex** + **PrimeIcons**
- **Tailwind CSS** para estilos y utilidades
- **localStorage** para persistencia de sesión
- **Fetch API** para llamadas asincrónicas

---

## 🗂️ Estructura del proyecto

```txt
src/
│
├── components/             # Componentes visuales reutilizables
├── config/                 # Configuraciones globales
├── context/
│   └── AuthContext.jsx     # Lógica de autenticación
├── hooks/
│   └── useToast.jsx        # Hook para notificaciones
├── layouts/                # Estructuras base de navegación
├── pages/                  
│   ├── landing/            # Página de inicio pública
│   ├── portal/             # Login, registro, donaciones, publicaciones
│   ├── dashboard/          # Vistas privadas del usuario
│   └── admin/              # Gestión de usuarios para admin
├── redux/
│   ├── store.js
│   └── slices/             # Slices de Redux (auth, donaciones, publicaciones)
├── routes/
│   ├── AppRouter.jsx       # Rutas de la aplicación
│   └── PrivateRoute.jsx    # Rutas protegidas por autenticación
├── services/               # Servicios para conexión con la API
├── App.jsx
└── main.jsx

🔐 Autenticación: arquitectura y flujo

El sistema de autenticación combina:

AuthContext con la lógica central (login, logout, checkAuth)
Redux como fuente única de estado (user, authToken)
localStorage para persistir la sesión incluso tras recargar

Características:

Restauración automática de la sesión desde localStorage
Sincronización entre Redux, Context y almacenamiento local
Validación del token antes de acceder a datos protegidos


🔗 Comunicación con la API

apiService.js

Centraliza todas las llamadas HTTP
Recupera el token desde localStorage
Manejo de errores personalizado
Headers configurados automáticamente

authService.js

Operaciones de login, registro, perfil y verificación
Guarda token y usuario en localStorage
Despacha acciones de Redux al autenticar


🧩 Redux Toolkit: authSlice.js

Estado global de usuario, token, loading y errores
Thunks para login y registro
Acciones: setAuthToken, setUser, logout
extraReducers para feedback visual (cargando/éxito/error)


📦 Donaciones: arquitectura modular

Donaciones.jsx: presentación y acciones
donacionesSlice.js: lista, loading, errores, selección
donacionesService.js: API para obtener, crear y eliminar


🧭 Rutas de la aplicación

txt
# Públicas (AuthLayout)
- /login
- /register
- /home

# Privadas (DashboardLayout + PrivateRoute)
- /dashboard
- /dashboard/profile
- /dashboard/settings
- /dashboard/user-admin
- /dashboard/donations
- /dashboard/publicaciones

# Fallback
- * → Redirección a /dashboard


🛠️ Instrucciones de instalación

bash
# Clonar el repositorio
git clone https://github.com/luli91/Frontend-PoloITv2.git
cd Frontend-PoloITv2

# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev


✅ Buenas prácticas implementadas

Principio de responsabilidad única por archivo
Persistencia de sesión automática y coherente
Autenticación combinando Context y Redux
Arquitectura desacoplada con servicios reutilizables
Rutas protegidas a través de PrivateRoute.jsx