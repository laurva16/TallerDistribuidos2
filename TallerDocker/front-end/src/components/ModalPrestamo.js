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

  const fetchSalas = async () => {
    try {
      const res = await axios.get("http://localhost:3002/salas");
      console.log("Respuesta completa:", res); // ← Verifica estructura de respuesta
      
      if (!res.data || !Array.isArray(res.data)) {
        throw new Error("Formato de respuesta inválido");
      }
      
      const salasValidas = res.data.filter(sala => sala?._id && sala?.nombre);
      console.log("Salas válidas filtradas:", salasValidas); // ← Verifica el filtrado
      
      setSalas(salasValidas);
    } catch (err) {
      console.error("Error completo:", err);
      console.error("Error en respuesta:", err.response?.data); // ← Verifica respuesta de error
      alert(`Error al cargar salas: ${err.message}`);
    }
  };
  
  useEffect(() => {
    if (show) fetchSalas(); // solo cuando se abre el modal
  }, [show]);

  const handleSubmit = async () => {
    try {
      if (!salaId || !fechaInicio || !fechaFin) {
        alert("Completa todos los campos antes de confirmar.");
        return;
      }

      const nuevoPrestamo = {
        estudianteId: estudiante._id,
        salaId,
        fechaInicio,
        fechaFin,
      };

      await axios.post("http://localhost:3003/prestamos", nuevoPrestamo);
      alert("Préstamo solicitado exitosamente");
      handleClose();
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error al crear préstamo");
    }
  };

  console.log("Salas para mostrar:", salas);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitar Préstamo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="datetime-local"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="datetime-local"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salas Disponibles</Form.Label>
            <Form.Select
              value={salaId}
              onChange={(e) => setSalaId(e.target.value)}
              disabled={salas.length === 0}
            >
              <option value="">
                {salas.length === 0 ? "Cargando salas..." : "Seleccione una sala"}
              </option>
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
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPrestamo;
