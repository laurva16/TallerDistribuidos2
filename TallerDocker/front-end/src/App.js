import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RegistroEstudiante from './pages/RegistroEstudiante';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
      </Routes>
    </>
  );
}

export default App;
