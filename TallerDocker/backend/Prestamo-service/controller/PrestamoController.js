const Prestamo = require("../models/Prestamo");
const axios = require("axios");

const ESTUDIANTE_SERVICE_URL = "http://localhost:3001/estudiantes";
const SALA_SERVICE_URL = "http://localhost:3002/salas";

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
    const nuevo = new Prestamo({ estudianteId, salaId, fechaInicio, fechaFin });
    await nuevo.save();
    const prestamosSolapados = await Prestamo.find({
  salaId,
  $or: [
    {
      fechaInicio: { $lt: fechaFin },
      fechaFin: { $gt: fechaInicio }
    }
  ]
});

if (prestamosSolapados.length > 0) {
  return res.status(400).json({ mensaje: "La sala ya está ocupada en ese horario" });
}

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

exports.frecuenciaSala = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      {
        $group: {
          _id: '$salaId',
          cantidad: { $sum: 1 }
        }
      },
      { $sort: { cantidad: -1 } },
      { $limit: 1 }
    ]);

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No hay préstamos registrados' });
    }

    res.json({
      salaId: resultado[0]._id,
      cantidad: resultado[0].cantidad
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
}

exports.frecuenciaEstudiante = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      {
        $group: {
          _id: '$estudianteId',
          cantidad: { $sum: 1 }
        }
      },
      { $sort: { cantidad: -1 } },
      { $limit: 1 }
    ]);

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No hay préstamos registrados' });
    }

    res.json({
      estudianteId: resultado[0]._id,
      cantidad: resultado[0].cantidad
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
}


exports.reporteSemanal = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      {
        $group: {
          _id: {
            $isoWeek: "$createdAt"  // Agrupa por número de semana del año
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al generar reporte semanal" });
  }
};

exports.reporteMensual = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      {
        $group: {
          _id: {
            año: { $year: "$createdAt" },
            mes: { $month: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.año": 1, "_id.mes": 1 } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al generar reporte mensual" });
  }
};
