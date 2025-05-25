const express = require("express");
const router = express.Router();
const ctrl = require("../Prestamo-service/PrestamoController");

router.get("/", ctrl.obtenerTodos);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.delete("/:id", ctrl.eliminar);

router.put("/:id",ctrl.actualizar);

module.exports = router;
