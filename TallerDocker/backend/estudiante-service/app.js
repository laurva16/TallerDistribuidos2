const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const EstudianteRoute = require("./routes/EstudianteRoute");

dotenv.config();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Rutas
app.use("/estudiantes", EstudianteRoute);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)  // Asegúrate que tu URI esté en .env bajo MONGO_URI
  .then(() => console.log("Estudiante DB conectada"))
  .catch((err) => console.error("Error conectando a DB:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Estudiante-service escuchando en puerto ${PORT}`));
