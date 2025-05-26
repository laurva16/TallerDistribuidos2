import React from "react";
import { Container, Card } from "react-bootstrap";

function PanelProfesor() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center">Panel del Profesor</h2>
        <p className="text-center">Bienvenido, AdminProfesor</p>
        {/* Aquí puedes agregar más componentes para administrar préstamos, estudiantes, etc */}
      </Card>
    </Container>
  );
}

export default PanelProfesor;
