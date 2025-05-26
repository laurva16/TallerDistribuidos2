// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("estudiante") || localStorage.getItem("isAdmin");
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-dark text-white p-3 mb-0">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">Sistema de Reservas DTIC’s</h1>
        
        {isLoggedIn && (
          <Button variant="outline-light" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
