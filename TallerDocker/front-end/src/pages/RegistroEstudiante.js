import React, { useState } from 'react';
import axios from 'axios';

function RegistroEstudiante() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    codigo: '',
    programa: '',
    correo: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const response = await axios.post('http://localhost:3001/estudiantes', formulario);
      setMensaje('✅ Estudiante registrado exitosamente');
      setFormulario({ nombre: '', codigo: '', programa: '', correo: '' });
    } catch (error) {
      setMensaje('❌ Error al registrar estudiante');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Registro de Estudiante</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formulario.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Código</label>
          <input type="text" name="codigo" className="form-control" value={formulario.codigo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Programa</label>
          <input type="text" name="programa" className="form-control" value={formulario.programa} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" name="correo" className="form-control" value={formulario.correo} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Registrar</button>
      </form>
      {mensaje && <div className="alert alert-info mt-4">{mensaje}</div>}
    </div>
  );
}

export default RegistroEstudiante;
