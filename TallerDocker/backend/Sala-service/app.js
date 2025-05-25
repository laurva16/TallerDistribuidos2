const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SalaRoute = require("./SalaRoute");

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api/Salas", SalaRoute);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("Sala DB conectada"))
.catch((err) => console.error("Error conectando a DB:", err));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Sala-service escuchando en puerto ${PORT}`));
