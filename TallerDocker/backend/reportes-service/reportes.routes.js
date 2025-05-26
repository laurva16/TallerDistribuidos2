const express = require("express");
const mongoose = require("mongoose");
const reportesRoutes = require("./reportes/reportes.routes");

const app = express();
app.use(express.json());

// Rutas
app.use("/api/reportes", reportesRoutes);

// Conexión y arranque
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(3000, () => console.log("Servidor en puerto 3000"));
  })
  .catch(err => console.error(err));
