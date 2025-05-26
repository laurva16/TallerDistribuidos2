// src/pages/PanelEstudiante.js
import { Button, Container, Card } from "react-bootstrap";
import ModalPrestamo from "../components/ModalPrestamo";
import React, { useState, useEffect } from "react";



function PanelEstudiante() {
  const estudiante = JSON.parse(localStorage.getItem("estudiante"));
const [showModal, setShowModal] = useState(false);
  const handlePedirPrestamo = () => {
    // Aquí puedes redirigir o abrir un modal (depende de tu lógica)
    alert("Función para pedir un préstamo aún no implementada.");
  };

  return (
    <Container className="mt-5">
      <Card className="text-center shadow">
        <Card.Body>
          <Card.Title>Bienvenido/a, {estudiante?.nombre}</Card.Title>
          <Card.Text>
            <strong>Programa:</strong> {estudiante?.programa} <br />
            <strong>Correo:</strong> {estudiante?.correo}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
                Pedir un préstamo
                </Button>
            <ModalPrestamo show={showModal} handleClose={() => setShowModal(false)} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PanelEstudiante;
