const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // <--- Agrega esta línea

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost" })); // <--- Agrega esta línea justo después de crear `app`
app.use(express.json());

// Registrar modelos
require("./models/Prestamo");

// Rutas
const PrestamoRoute = require("./routes/PrestamoRoute");

// Conexión a MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("Prestamo DB conectada"))
  .catch((err) => console.error("Error conectando a DB:", err));

// Usar rutas
app.use("/prestamos", PrestamoRoute);

// Puerto
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Prestamo-service escuchando en puerto ${PORT}`));
