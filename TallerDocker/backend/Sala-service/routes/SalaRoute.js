const express = require("express");
const router = express.Router();
const axios = require("axios");
const Sala = require("../models/Sala"); // Asegúrate de importar tu modelo de Sala

router.get("/", ctrl.obtenerTodas);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);

// Ruta para obtener salas disponibles en un rango de tiempo
router.get("/salas-disponibles", async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  try {
    const prestamos = await axios.get("http://localhost:3003/prestamos");

    const ocupadas = prestamos.data.filter(prestamo =>
      (new Date(prestamo.fechaInicio) < new Date(fechaFin)) &&
      (new Date(prestamo.fechaFin) > new Date(fechaInicio))
    ).map(p => p.sala._id); // Asegúrate de usar sala._id si estás devolviendo detalles

    const salasDisponibles = await Sala.find({ _id: { $nin: ocupadas } });
    res.json(salasDisponibles);
  } catch (error) {
    console.error("Error al consultar salas disponibles:", error.message);
    res.status(500).json({ mensaje: "Error buscando salas disponibles" });
  }
});

module.exports = router;
