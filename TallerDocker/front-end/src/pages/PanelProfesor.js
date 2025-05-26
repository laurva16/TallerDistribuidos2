import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import ModalConsultas from "../components/ModalConsultas";

function PanelProfesor() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center">Panel del Profesor</h2>
        <p className="text-center">Bienvenido, AdminProfesor</p>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Consultas y Registros
          </Button>
        </div>
        <ModalConsultas show={showModal} handleClose={() => setShowModal(false)} />
      </Card>
    </Container>
  );
}
export default PanelProfesor;