import React, { useState, useEffect } from 'react';
import './App.css'
import Login from './components/Login';
import MenuTable from './components/MenuTable';
import PedidoTable from './components/PedidoTable';
import AuthService from './service/AuthService';
import { User } from './types/Auth';
import './util/axiosConfig';

const App: React.FC = () => {
  // Estados para manejar la autenticación y el nombre de usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');

  // Efecto para verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
    }
  }, []);

  // Manejador para cuando el inicio de sesión es exitoso
  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setUsername(user.username);
  };

  // Manejador para cerrar sesión
  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess}/>
      ):(
        <div>
          <span>Bienvenidos, {username}</span>
          <button onClick={handleLogout}>Cerrar Sesion</button>
          <MenuTable/>
          <PedidoTable/>
        </div>
      )
    }
    </div>
  )
}

export default App
