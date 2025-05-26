const express = require("express");
const router = express.Router();
const ctrl = require("../controller/SalaController");

router.get("/", ctrl.obtenerTodas);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);
router.get("/salas-disponibles", ctrl.obtenerDisponibles);


module.exports = router;
