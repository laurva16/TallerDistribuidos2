import React, { useState } from "react";
import { Modal, Button, Spinner, Alert, Table } from "react-bootstrap";
import axios from "axios";

function ModalConsultas({ show, handleClose }) {
  const [frecuenciaSala, setFrecuenciaSala] = useState(null);
  const [frecuenciaEstudiante, setFrecuenciaEstudiante] = useState(null);
  const [reporteSemanal, setReporteSemanal] = useState(null);
  const [reporteMensual, setReporteMensual] = useState(null);
  const [prestamos, setPrestamos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:3003";

  const consultarFrecuenciaSala = async () => {
    setLoading(true);
    setError("");
    setFrecuenciaSala(null);
    try {
      const res = await axios.get(`${BASE_URL}/prestamos/frecuencia/sala`);
      setFrecuenciaSala(res.data);
    } catch (e) {
      setError("No se pudo obtener la frecuencia de salas.");
    }
    setLoading(false);
  };

  const consultarFrecuenciaEstudiante = async () => {
    setLoading(true);
    setError("");
    setFrecuenciaEstudiante(null);
    try {
      const res = await axios.get(`${BASE_URL}/prestamos/frecuencia/estudiante`);
      setFrecuenciaEstudiante(res.data);
    } catch (e) {
      setError("No se pudo obtener la frecuencia de estudiantes.");
    }
    setLoading(false);
  };

  const consultarReporteSemanal = async () => {
    setLoading(true);
    setError("");
    setReporteSemanal(null);
    try {
      const res = await axios.get(`${BASE_URL}/prestamos/reporte/semanal`);
      setReporteSemanal(res.data);
    } catch (e) {
      setError("No se pudo obtener el reporte semanal.");
    }
    setLoading(false);
  };

  const consultarReporteMensual = async () => {
    setLoading(true);
    setError("");
    setReporteMensual(null);
    try {
      const res = await axios.get(`${BASE_URL}/prestamos/reporte/mensual`);
      setReporteMensual(res.data);
    } catch (e) {
      setError("No se pudo obtener el reporte mensual.");
    }
    setLoading(false);
  };

  const consultarPrestamos = async () => {
    setLoading(true);
    setError("");
    setPrestamos(null);
    try {
      const res = await axios.get(`${BASE_URL}/prestamos`);
      setPrestamos(res.data);
    } catch (e) {
      setError("No se pudo obtener el listado de préstamos.");
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
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
            Sala más usada: <strong>{frecuenciaSala.salaNombre || frecuenciaSala.salaId}</strong> <br />
            Ubicación: <strong>{frecuenciaSala.salaUbicacion}</strong><br />
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
            Estudiante más activo: <strong>{frecuenciaEstudiante.estudianteNombre || frecuenciaEstudiante.estudianteId}</strong> <br />
            Correo: <strong>{frecuenciaEstudiante.estudianteCorreo}</strong><br />
            Préstamos realizados: <strong>{frecuenciaEstudiante.cantidad}</strong>
          </Alert>
        )}

        <Button
          className="mb-2"
          variant="secondary"
          onClick={consultarReporteSemanal}
          disabled={loading}
          block
        >
          Reporte Semanal
        </Button>
        {reporteSemanal && (
          <div className="mt-2">
            <strong>Préstamos por semana:</strong>
            <Table striped bordered hover size="sm" className="mt-1">
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Total Préstamos</th>
                </tr>
              </thead>
              <tbody>
                {reporteSemanal.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item._id}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Button
          className="mb-2"
          variant="secondary"
          onClick={consultarReporteMensual}
          disabled={loading}
          block
        >
          Reporte Mensual
        </Button>
        {reporteMensual && (
          <div className="mt-2">
            <strong>Préstamos por mes:</strong>
            <Table striped bordered hover size="sm" className="mt-1">
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Mes</th>
                  <th>Total Préstamos</th>
                </tr>
              </thead>
              <tbody>
                {reporteMensual.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item._id.año}</td>
                    <td>{item._id.mes}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Button
          className="mb-2"
          variant="success"
          onClick={consultarPrestamos}
          disabled={loading}
          block
        >
          Listar todos los Préstamos
        </Button>
        {prestamos && (
          <div className="mt-2" style={{maxHeight: "300px", overflowY: "auto"}}>
            <strong>Préstamos registrados:</strong>
            <Table striped bordered hover size="sm" className="mt-1">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Correo</th>
                  <th>Programa</th>
                  <th>Sala</th>
                  <th>Ubicación</th>
                  <th>Capacidad</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {prestamos.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.estudiante?.nombre || p.estudiante?.error || p.estudianteId}</td>
                    <td>{p.estudiante?.correo || ""}</td>
                    <td>{p.estudiante?.programa || ""}</td>
                    <td>{p.sala?.nombre || p.sala?.error || p.salaId}</td>
                    <td>{p.sala?.ubicacion || ""}</td>
                    <td>{p.sala?.capacidad || ""}</td>
                    <td>{(new Date(p.fechaInicio)).toLocaleString()}</td>
                    <td>{(new Date(p.fechaFin)).toLocaleString()}</td>
                    <td>{p.estado || ""}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
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
