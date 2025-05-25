const express = require("express");
const router = express.Router();
const ctrl = require("../Sala-service/SalaController");

router.get("/", ctrl.obtenerTodas);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);

module.exports = router;
