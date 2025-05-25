const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Carga variables de entorno
dotenv.config();

const app = express();
app.use(express.json());

// Registrar modelos para que Mongoose los conozca
require("./models/Prestamo");                      // Modelo Prestamo local

// Importar rutas
const PrestamoRoute = require("./routes/PrestamoRoute");

// Conectar a MongoDB
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("Prestamo DB conectada"))
  .catch((err) => console.error("Error conectando a DB:", err));

// Usar rutas
app.use("/prestamos", PrestamoRoute);

// Puerto y servidor
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Prestamo-service escuchando en puerto ${PORT}`));
