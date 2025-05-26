import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import LoginEstudiante from "./pages/LoginEstudiante";
import PanelEstudiante from "./pages/PanelEstudiante";
import RegistroEstudiante from './pages/RegistroEstudiante';
import PanelProfesor from "./pages/PanelProfesor";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
        <Route path="/login" element={<LoginEstudiante />} />
        <Route path="/panel" element={<PanelEstudiante />} />
        <Route path="/panel-profesor" element={<PanelProfesor />} />
      </Routes>
    </>
  );
}



export default App;

