const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Nombre del contador, ej. "estudianteid", "salaid"
  seq: { type: Number, default: 1000 }   // Valor inicial (por defecto comienza en 1000)
});

// Prevenir error de sobreescritura al importar en varios archivos
module.exports = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);
