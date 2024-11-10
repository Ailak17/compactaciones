import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Inicio from './pages/inicio';
import Busqueda from './pages/busqueda';
import Carga from './pages/carga';
import './App.css'
import Nav from './components/nav';
import Header from './components/header';
import React, { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado de autenticación

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Cambiar el estado cuando el login es exitoso
  };

  return (
    <div>
      <Header />
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />} // Pasar la función de éxito al componente Login 
          />
          <Route
            path="/inicio"
            element={isAuthenticated ? <Inicio /> : <Navigate to="/login" />} // Proteger la ruta
          />
          <Route
            path="/busqueda"
            element={isAuthenticated ? <Busqueda /> : <Navigate to="/login" />} // Proteger la ruta
          />
          <Route
            path="/carga"
            element={isAuthenticated ? <Carga /> : <Navigate to="/login" />} // Proteger la ruta
          />


        </Routes>
      </Router>
    </div>
  );
}

export default App;