const Prestamo = require("./Prestamo");
const axios = require("axios");

const ESTUDIANTE_SERVICE_URL = "http://estudiante-service/api/estudiantes";
const SALA_SERVICE_URL = "http://sala-service/api/salas";

exports.obtenerTodos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find();

    const prestamosConDetalles = await Promise.all(prestamos.map(async (p) => {
      let estudiante = null;
      let sala = null;

      try {
        const resEst = await axios.get(`${ESTUDIANTE_SERVICE_URL}/${p.estudianteId}`);
        estudiante = resEst.data;
      } catch {
        estudiante = { error: "Estudiante no encontrado" };
      }

      try {
        const resSala = await axios.get(`${SALA_SERVICE_URL}/${p.salaId}`);
        sala = resSala.data;
      } catch {
        sala = { error: "Sala no encontrada" };
      }

      return {
        _id: p._id,
        fechaInicio: p.fechaInicio,
        fechaFin: p.fechaFin,
        estado: p.estado,
        estudiante,
        sala,
      };
    }));

    res.json(prestamosConDetalles);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    res.status(500).json({ mensaje: "Error al obtener préstamos", error: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const p = await Prestamo.findById(req.params.id);
    if (!p) return res.status(404).json({ mensaje: "Préstamo no encontrado" });

    let estudiante = null;
    let sala = null;

    try {
      const resEst = await axios.get(`${ESTUDIANTE_SERVICE_URL}/${p.estudianteId}`);
      estudiante = resEst.data;
    } catch {
      estudiante = { error: "Estudiante no encontrado" };
    }

    try {
      const resSala = await axios.get(`${SALA_SERVICE_URL}/${p.salaId}`);
      sala = resSala.data;
    } catch {
      sala = { error: "Sala no encontrada" };
    }

    res.json({
      _id: p._id,
      fechaInicio: p.fechaInicio,
      fechaFin: p.fechaFin,
      estado: p.estado,
      estudiante,
      sala,
    });
  } catch (error) {
    console.error("Error al obtener préstamo:", error);
    res.status(500).json({ mensaje: "Error al obtener préstamo", error: error.message });
  }
};

exports.crear = async (req, res) => {
  const { estudianteId, salaId, fechaInicio, fechaFin } = req.body;

  try {
    // Validar existencia Estudiante
    await axios.get(`${ESTUDIANTE_SERVICE_URL}/${estudianteId}`);

    // Validar existencia Sala
    await axios.get(`${SALA_SERVICE_URL}/${salaId}`);

    const nuevo = new Prestamo({ estudianteId, salaId, fechaInicio, fechaFin });
    await nuevo.save();

    res.status(201).json({ mensaje: "Préstamo creado", prestamo: nuevo });
  } catch (error) {
    console.error("Error al crear préstamo:", error);
    if (error.response && error.response.status === 404) {
      return res.status(400).json({ mensaje: "Estudiante o Sala no existen" });
    }
    res.status(400).json({ mensaje: "Error al crear préstamo", error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  const { estudianteId, salaId } = req.body;

  try {
    if (estudianteId) {
      await axios.get(`${ESTUDIANTE_SERVICE_URL}/${estudianteId}`);
    }

    if (salaId) {
      await axios.get(`${SALA_SERVICE_URL}/${salaId}`);
    }

    const prestamoActualizado = await Prestamo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prestamoActualizado) return res.status(404).json({ mensaje: "Préstamo no encontrado" });

    res.json({ mensaje: "Préstamo actualizado", prestamo: prestamoActualizado });
  } catch (error) {
    console.error("Error al actualizar préstamo:", error);
    if (error.response && error.response.status === 404) {
      return res.status(400).json({ mensaje: "Estudiante o Sala no existen" });
    }
    res.status(400).json({ mensaje: "Error al actualizar préstamo", error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Prestamo.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    res.json({ mensaje: "Préstamo eliminado", prestamo: eliminado });
  } catch (error) {
    console.error("Error al eliminar préstamo:", error);
    res.status(500).json({ mensaje: "Error al eliminar préstamo", error: error.message });
  }
};
