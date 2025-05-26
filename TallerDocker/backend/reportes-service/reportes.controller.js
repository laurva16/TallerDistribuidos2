const Prestamo = require("../models/Prestamo");

// 1. Sala con mayor frecuencia de préstamo
const salaMasUsada = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      { $group: { _id: "$salaId", totalPrestamos: { $sum: 1 } } },
      { $sort: { totalPrestamos: -1 } },
      { $limit: 1 }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la sala más usada" });
  }
};

// 2. Reporte semanal
const reporteSemanal = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      {
        $group: {
          _id: { semana: { $isoWeek: "$fechaInicio" }, año: { $year: "$fechaInicio" } },
          totalPrestamos: { $sum: 1 }
        }
      },
      { $sort: { "_id.año": 1, "_id.semana": 1 } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al generar el reporte semanal" });
  }
};

// 3. Reporte mensual
const reporteMensual = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      {
        $group: {
          _id: {
            año: { $year: "$fechaInicio" },
            mes: { $month: "$fechaInicio" }
          },
          totalPrestamos: { $sum: 1 }
        }
      },
      { $sort: { "_id.año": 1, "_id.mes": 1 } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al generar el reporte mensual" });
  }
};

// 4. Estudiantes con mayor uso
const estudiantesTop = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      { $group: { _id: "$estudianteId", totalPrestamos: { $sum: 1 } } },
      { $sort: { totalPrestamos: -1 } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes top" });
  }
};

// 5. Horas pico de uso de salas
const horasPico = async (req, res) => {
  try {
    const resultado = await Prestamo.aggregate([
      { $project: { hora: { $hour: "$fechaInicio" } } },
      { $group: { _id: "$hora", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener horas pico" });
  }
};

module.exports = {
  salaMasUsada,
  reporteSemanal,
  reporteMensual,
  estudiantesTop,
  horasPico
};
