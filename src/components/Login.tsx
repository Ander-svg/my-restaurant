// src/components/Login.tsx
import React, { useState } from 'react';
import logo from '../assets/Logo.png'

import AuthService from '../service/AuthService';
import { User } from '../types/Auth';


// Definición de las propiedades del componente Login
interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

// Componente funcional Login
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  // Estados para el nombre de usuario, contraseña y estado de carga
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Intenta iniciar sesión con las credenciales proporcionadas
      const user = await AuthService.login(username, password);
      if (user) {
        // Muestra un mensaje de éxito si el inicio de sesión es correcto
        alert('Login exitoso');
        // Llama a la función de éxito pasada como prop
        onLoginSuccess(user);
      }
    } catch (error) {
      // Muestra un mensaje de error si las credenciales son incorrectas
      alert('Error de autenticación: Usuario o contraseña incorrectos');
    } finally {
      // Desactiva el estado de carga
      setIsLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <section>
    <div className="login">
    <form action="" id="loginForm"
        onSubmit={handleSubmit}>
        <div className="logo-login">
            <img src={logo} alt="Logo" />
        </div>
        <div className="description">
            <p>Bienvenido al sistema de inicio de sesión del Restaurante Christian. Por favor, ingresa tus credenciales para acceder.</p>
        </div>
        <div className="box-text">
            <input
              id="nombreUsuario" 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className='bx bxs-user' ></i>
        </div>
        <div className="box-text">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              placeholder="Password" 
              id="contrasena" />
            <i className='bx bxs-lock-alt'></i>
        </div>
        <button type="submit" 
          className="btn"
          disabled={isLoading}
          > Iniciar Sesion
        </button>
    </form>
    </div>
</section>
  );
};

export default Login;