import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import ModalConsultas from "../components/ModalConsultas";
import ModalCrearSala from "../components/ModalCrearSala";

function PanelProfesor() {
  const [showConsultas, setShowConsultas] = useState(false);
  const [showCrearSala, setShowCrearSala] = useState(false);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center">Panel del Profesor</h2>
        <p className="text-center">Bienvenido, AdminProfesor</p>
        <div className="text-center mt-4">
          <Button
            className="me-2"
            variant="primary"
            onClick={() => setShowConsultas(true)}
          >
            Consultas y Registros
          </Button>
          <Button
            variant="success"
            onClick={() => setShowCrearSala(true)}
          >
            Crear Sala
          </Button>
        </div>
        <ModalConsultas
          show={showConsultas}
          handleClose={() => setShowConsultas(false)}
        />
        <ModalCrearSala
          show={showCrearSala}
          handleClose={() => setShowCrearSala(false)}
        />
      </Card>
    </Container>
  );
}

export default PanelProfesor;