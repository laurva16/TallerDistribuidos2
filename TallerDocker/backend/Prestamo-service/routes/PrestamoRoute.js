const express = require("express");
const router = express.Router();
const ctrl = require("../controller/PrestamoController");

// Rutas de frecuencia
router.get("/frecuencia/sala", ctrl.frecuenciaSala);
router.get("/frecuencia/estudiante", ctrl.frecuenciaEstudiante);

// Rutas de reporte
router.get("/reporte/semanal", ctrl.reporteSemanal);
router.get("/reporte/mensual", ctrl.reporteMensual);

// Operaciones CRUD
router.get("/", ctrl.obtenerTodos);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);



module.exports = router;
