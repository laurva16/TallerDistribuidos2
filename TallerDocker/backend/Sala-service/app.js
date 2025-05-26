const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SalaRoute = require("./routes/SalaRoute"); // Asegúrate que la ruta sea correcta

dotenv.config();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Rutas
app.use("/salas", SalaRoute);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)  // Asegúrate que MONGO_URI está en tu archivo .env
  .then(() => console.log("Sala DB conectada"))
  .catch((err) => console.error("Error conectando a DB:", err));

const PORT = process.env.PORT || 3002;  // Puerto diferente al de Estudiante-service
app.listen(PORT, () => console.log(`Sala-service escuchando en puerto ${PORT}`));
