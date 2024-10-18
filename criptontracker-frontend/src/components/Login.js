import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Para redirigir después del login/registro
  
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Maneja errores en caso de que la respuesta no sea OK (status 4xx o 5xx)
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }

      const data = await response.json();

      // Guardar el token en el localStorage
      localStorage.setItem('token', data.access_token);

      // Disparar un evento de 'storage' para notificar el cambio
      window.dispatchEvent(new Event('storage'));

      // Redirigir a otra página (ej. página principal)
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Something went wrong during login');
    }
  };

  // Función para manejar el registro
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        // Maneja errores en el registro
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Signup failed');
      }

      const data = await response.json();
      alert('User created successfully');

      // Cambiar al formulario de login después de registro exitoso
      toggleForm();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Something went wrong during signup');
    }
  };

  return (
    <div className="form-container">
      <ul className="tabs-list">
        <li className={`tab-item ${isLogin ? 'active' : ''}`}>
          <button onClick={toggleForm}>Login</button>
        </li>
        <li className={`tab-item ${!isLogin ? 'active' : ''}`}>
          <button onClick={toggleForm}>Sign Up</button>
        </li>
      </ul>

      <div className="tab-content">
        {/* Login Form */}
        <div className={isLogin ? "active" : ""} id="login">
          <br />
          <br />
          <form onSubmit={handleLogin}>
            <div className="input-wrapper">
              <input
                type="email"
                className="mycolor"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="mycolor"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="forgot-password">
              <Link to="/ResetPassword">Forgot Password?</Link>
            </p>
            <input
              type="submit"
              className="submit-button button-block"
              value="Login"
            />
          </form>
        </div>

        {/* Signup Form */}
        <div className={isLogin ? "" : "active"} id="register">
          <br />
          <br />
          <form onSubmit={handleSignup}>
            <div className="input-wrapper">
              <input
                type="text"
                className="mycolor"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="email"
                className="mycolor"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="mycolor"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="mycolor"
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <input
              type="submit"
              className="submit-button button-block"
              value="Sign Up"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
