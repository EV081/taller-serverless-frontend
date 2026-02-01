import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import OrderHistory from './pages/OrderHistory';
import KitchenDashboard from './pages/KitchenDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import { ROLES } from './utils/constants';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with Navbar */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="app-layout">
                    <Navbar />
                    <main className="app-main">
                      <Routes>
                        {/* Client routes */}
                        <Route
                          path="/productos"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.CLIENTE, ROLES.GERENTE]}>
                              <Products />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/mis-pedidos"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.CLIENTE]}>
                              <OrderHistory />
                            </ProtectedRoute>
                          }
                        />

                        {/* Kitchen routes */}
                        <Route
                          path="/cocina"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.COCINERO]}>
                              <KitchenDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/cocina/pendientes"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.COCINERO]}>
                              <KitchenDashboard section="pendientes" />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/cocina/en-curso"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.COCINERO]}>
                              <KitchenDashboard section="en-curso" />
                            </ProtectedRoute>
                          }
                        />

                        {/* Delivery routes */}
                        <Route
                          path="/delivery"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.REPARTIDOR]}>
                              <DeliveryDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/delivery/disponibles"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.REPARTIDOR]}>
                              <DeliveryDashboard section="disponibles" />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/delivery/mis-pedidos"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.REPARTIDOR]}>
                              <DeliveryDashboard section="mis-pedidos" />
                            </ProtectedRoute>
                          }
                        />

                        {/* Manager route */}
                        <Route
                          path="/manager"
                          element={
                            <ProtectedRoute allowedRoles={[ROLES.GERENTE]}>
                              <ManagerDashboard />
                            </ProtectedRoute>
                          }
                        />


                        {/* Default redirect based on role */}
                        <Route
                          path="/"
                          element={
                            <ProtectedRoute>
                              <RoleBasedRedirect />
                            </ProtectedRoute>
                          }
                        />

                        {/* 404 */}
                        <Route path="*" element={<div className="container" style={{ padding: '2rem', textAlign: 'center' }}><h2>404 - Página no encontrada</h2></div>} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Role-based redirect component
const RoleBasedRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.rol) {
    case ROLES.CLIENTE:
      return <Navigate to="/productos" replace />;
    case ROLES.COCINERO:
      return <Navigate to="/cocina" replace />;
    case ROLES.REPARTIDOR:
      return <Navigate to="/delivery" replace />;
    case ROLES.GERENTE:
      return <Navigate to="/manager" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default App;
