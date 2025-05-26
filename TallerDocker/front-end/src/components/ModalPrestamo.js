// src/components/ModalPrestamo.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function ModalPrestamo({ show, handleClose }) {
  const estudiante = JSON.parse(localStorage.getItem("estudiante"));
  const [salas, setSalas] = useState([]);
  const [salaId, setSalaId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const fetchSalasDisponibles = async () => {
    if (fechaInicio && fechaFin) {
      try {
        const res = await axios.get(`http://localhost:3002/salas/salas-disponibles`, {
          params: { fechaInicio, fechaFin }
        });
        setSalas(res.data);
      } catch (err) {
        console.error("Error cargando salas disponibles", err);
      }
    }
  };

  useEffect(() => {
    fetchSalasDisponibles();
  }, [fechaInicio, fechaFin]);

  const handleSubmit = async () => {
    try {
      const nuevoPrestamo = {
        estudianteId: estudiante._id,
        salaId,
        fechaInicio,
        fechaFin
      };

      await axios.post("http://localhost:3003/prestamos", nuevoPrestamo);
      alert("Préstamo solicitado exitosamente");
      handleClose();
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error al crear préstamo");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitar Préstamo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="datetime-local"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="datetime-local"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salas Disponibles</Form.Label>
            <Form.Select value={salaId} onChange={(e) => setSalaId(e.target.value)}>
              <option value="">Seleccione una sala</option>
              {salas.map((sala) => (
                <option key={sala._id} value={sala._id}>
                  {sala.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPrestamo;
