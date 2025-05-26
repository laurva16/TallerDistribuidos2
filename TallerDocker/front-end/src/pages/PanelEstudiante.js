// src/pages/PanelEstudiante.js
import React from "react";
import { Button, Container, Card } from "react-bootstrap";

function PanelEstudiante() {
  const estudiante = JSON.parse(localStorage.getItem("estudiante"));

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
          <Button variant="primary" onClick={handlePedirPrestamo}>
            Pedir un préstamo
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PanelEstudiante;
