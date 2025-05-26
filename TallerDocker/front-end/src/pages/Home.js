import React from 'react';
import './Home.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  return (
    <>
      <main className="app-background">
        <div className="welcome-card">
          <h2>Bienvenido</h2>
          <h5>Prestamo de Aulas a un solo click!</h5>
          <p>Selecciona una opción para ingresar al sistema:</p>
          <div className="button-group">
            <button className="btn btn-primary"
            onClick={() => navigate('/LoginEstudiante')}
            >
              <i className="fas fa-user-graduate"></i>
              Entrar como Estudiante
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-chalkboard-teacher"></i>
              Entrar como Profesor
            </button>
            <button
            className="btn btn-primary"
            onClick={() => navigate('/registro-estudiante')}
            >
            <i className="fas fa-user-plus"></i>
            Registrarse
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;