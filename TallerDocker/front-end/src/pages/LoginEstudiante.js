import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";

function LoginEstudiante() {
  const [codigo, setCodigo] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Si el login es del profesor
if (codigo === "AdminProfesor" && correo === "Admin@12345") {
  localStorage.setItem("isAdmin", "true");
  navigate("/panel-profesor");
  return;
}

    try {
      const res = await fetch("http://localhost:3001/estudiantes"); // Asegúrate que el puerto sea correcto
      const data = await res.json();

      const estudiante = data.find(
        (est) => est.codigo === codigo && est.correo === correo
      );

      if (estudiante) {
        localStorage.setItem("estudiante", JSON.stringify(estudiante));
        navigate("/panel");
      } else {
        setError("Código o correo incorrecto");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Login Estudiante</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Ingresar
            </Button>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginEstudiante;
