require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const reportesRoutes = require("./reportes/reportes.routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Rutas
app.use("/api/reportes", reportesRoutes);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Conectado a MongoDB Atlas");
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ Error al conectar a MongoDB:", err);
});
