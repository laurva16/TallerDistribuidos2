const mongoose = require("mongoose");

const PrestamoSchema = new mongoose.Schema({
  estudianteId: { type: String, required: true },  // Solo guardas el ID, sin ref
  salaId: { type: String, required: true },        // Igual aquí
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Prestamo", PrestamoSchema);
