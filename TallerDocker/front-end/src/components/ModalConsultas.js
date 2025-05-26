import React, { useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function ModalConsultas({ show, handleClose }) {
  const [frecuenciaSala, setFrecuenciaSala] = useState(null);
  const [frecuenciaEstudiante, setFrecuenciaEstudiante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:3003";

  const consultarFrecuenciaSala = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/prestamos/frecuencia-sala`);
      setFrecuenciaSala(res.data);
    } catch (e) {
      setError("No se pudo obtener la frecuencia de salas.");
      setFrecuenciaSala(null);
    }
    setLoading(false);
  };

  const consultarFrecuenciaEstudiante = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/prestamos/frecuencia-estudiante`);
      setFrecuenciaEstudiante(res.data);
    } catch (e) {
      setError("No se pudo obtener la frecuencia de estudiantes.");
      setFrecuenciaEstudiante(null);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Consultas y Registros</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          className="mb-2"
          variant="info"
          onClick={consultarFrecuenciaSala}
          disabled={loading}
          block
        >
          Frecuencia de Sala
        </Button>
        {frecuenciaSala && (
          <Alert variant="success" className="mt-2">
            Sala más usada: <strong>{frecuenciaSala.salaId}</strong> <br />
            Veces usada: <strong>{frecuenciaSala.cantidad}</strong>
          </Alert>
        )}

        <Button
          className="mb-2"
          variant="info"
          onClick={consultarFrecuenciaEstudiante}
          disabled={loading}
          block
        >
          Frecuencia de Estudiante
        </Button>
        {frecuenciaEstudiante && (
          <Alert variant="success" className="mt-2">
            Estudiante más activo: <strong>{frecuenciaEstudiante.estudianteId}</strong> <br />
            Préstamos realizados: <strong>{frecuenciaEstudiante.cantidad}</strong>
          </Alert>
        )}

        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalConsultas;