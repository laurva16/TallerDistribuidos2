import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

function ModalCrearSala({ show, handleClose, onSalaCreada }) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCrearSala = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3002/salas", {
        nombre,
        ubicacion,
        capacidad: Number(capacidad)
      });
      setExito("Sala creada correctamente");
      setNombre("");
      setUbicacion("");
      setCapacidad("");
      if (onSalaCreada) onSalaCreada(res.data.sala);
    } catch (err) {
      setError(err?.response?.data?.mensaje || "Error al crear sala");
    }
    setLoading(false);
  };

  const handleModalClose = () => {
    setError("");
    setExito("");
    setNombre("");
    setUbicacion("");
    setCapacidad("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Sala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCrearSala}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="ubicacion" className="mt-2">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="capacidad" className="mt-2">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              value={capacidad}
              min="1"
              onChange={(e) => setCapacidad(e.target.value)}
              required
            />
          </Form.Group>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {exito && <Alert variant="success" className="mt-3">{exito}</Alert>}
          <div className="mt-3 d-flex justify-content-between">
            <Button variant="secondary" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Crear Sala"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCrearSala;