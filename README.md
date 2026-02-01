# 🍔 Burger Cloud - Frontend

Una aplicación web moderna de React para gestionar pedidos de hamburguesas con diferentes roles de usuario (Cliente, Cocinero, Repartidor, Gerente).

## 🚀 Características

### 👤 Cliente
- Explorar productos con búsqueda
- Agregar productos al carrito
- Realizar pedidos
- Ver historial de pedidos
- Seguimiento de estado de pedidos

### 👨‍🍳 Cocinero
- Ver pedidos en cocina
- Actualizar estado de preparación
- Auto-actualización cada 30 segundos

### 🚚 Repartidor
- Ver pedidos para entrega
- Actualizar estado de entrega
- Auto-actualización cada 30 segundos

### 📊 Gerente
- Dashboard con estadísticas
- Ver todos los pedidos
- Filtrar por estado
- Análisis de ventas

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilos

## 📦 Instalación

1. **Clonar el repositorio**
```bash
cd taller-serverless-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia `.env.example` a `.env` y actualiza las URLs de tu API:

```bash
cp .env.example .env
```

Edita `.env` con tus endpoints:
```env
VITE_API_USER_URL=https://tu-api-url.execute-api.us-east-1.amazonaws.com
VITE_API_PRODUCTO_URL=https://tu-api-url.execute-api.us-east-1.amazonaws.com
VITE_API_ORDER_URL=https://tu-api-url.execute-api.us-east-1.amazonaws.com
VITE_API_COCINA_URL=https://tu-api-url.execute-api.us-east-1.amazonaws.com
VITE_API_DELIVERY_URL=https://tu-api-url.execute-api.us-east-1.amazonaws.com
VITE_API_WORK_URL=https://tu-api-url.execute-api.us-east-1.amazonaws.com
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Cart.jsx        # Carrito de compras
│   ├── ErrorMessage.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── contexts/           # Contextos de React
│   └── AuthContext.jsx
├── pages/              # Páginas principales
│   ├── DeliveryDashboard.jsx
│   ├── KitchenDashboard.jsx
│   ├── Login.jsx
│   ├── ManagerDashboard.jsx
│   ├── OrderHistory.jsx
│   ├── Products.jsx
│   └── Register.jsx
├── services/           # Servicios API
│   ├── api.js
│   ├── authService.js
│   ├── orderService.js
│   └── productService.js
├── utils/              # Utilidades
│   ├── constants.js
│   └── helpers.js
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎨 Diseño

La aplicación utiliza un tema moderno de hamburguesas con:
- Paleta de colores vibrantes (naranja, amarillo, turquesa)
- Modo oscuro por defecto
- Animaciones suaves
- Diseño responsive
- Fuentes personalizadas (Poppins, Bebas Neue)

## 🔐 Autenticación

### Tipos de Login

1. **Cliente** - Endpoint: `/login`
   - Puede registrarse
   - Acceso a productos y pedidos

2. **Empleado** - Endpoint: `/login/empleado`
   - Cocinero: Acceso a dashboard de cocina
   - Repartidor: Acceso a dashboard de entregas
   - Gerente: Acceso completo

## 📱 Rutas

| Ruta | Rol | Descripción |
|------|-----|-------------|
| `/login` | Público | Página de inicio de sesión |
| `/register` | Público | Registro de clientes |
| `/productos` | Cliente, Gerente | Catálogo de productos |
| `/mis-pedidos` | Cliente | Historial de pedidos |
| `/cocina` | Cocinero | Dashboard de cocina |
| `/delivery` | Repartidor | Dashboard de entregas |
| `/manager` | Gerente | Dashboard gerencial |

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 🌐 Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_API_USER_URL` | URL del servicio de usuarios |
| `VITE_API_PRODUCTO_URL` | URL del servicio de productos |
| `VITE_API_ORDER_URL` | URL del servicio de pedidos |
| `VITE_API_COCINA_URL` | URL del servicio de cocina |
| `VITE_API_DELIVERY_URL` | URL del servicio de delivery |
| `VITE_API_WORK_URL` | URL del servicio de workflow |

## 🎯 Características Técnicas

- **Autenticación JWT** - Tokens almacenados en localStorage
- **Interceptores Axios** - Manejo automático de tokens y errores
- **Protected Routes** - Control de acceso basado en roles
- **Auto-refresh** - Dashboards se actualizan automáticamente
- **Manejo de errores** - Mensajes de error amigables
- **Loading states** - Indicadores de carga personalizados
- **Responsive design** - Funciona en móvil, tablet y desktop

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Desplegar en Vercel/Netlify

1. Conecta tu repositorio
2. Configura las variables de entorno
3. El comando de build es: `npm run build`
4. El directorio de salida es: `dist`

## 📝 Notas Importantes

1. **Configuración de API**: Asegúrate de actualizar el archivo `.env` con tus URLs de API reales antes de usar la aplicación.

2. **CORS**: Tu backend debe estar configurado para aceptar peticiones desde el dominio del frontend.

3. **Tokens**: Los tokens JWT se almacenan en localStorage. Para mayor seguridad en producción, considera usar httpOnly cookies.

4. **Auto-refresh**: Los dashboards de cocina y delivery se actualizan cada 30 segundos automáticamente.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del taller de Serverless.

## 👥 Autores

Desarrollado para el curso de Arquitectura Serverless - UTEC

---

**¡Disfruta de tus hamburguesas! 🍔**
