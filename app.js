import express from "express";
import { sequelize } from "./src/config/database.js";
import userRoutes from "./src/routes/user.route.js";
import taskRoutes from "./src/routes/task.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito");

    await sequelize.sync();
    console.log("Modelos sincronizados con la base de datos");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error al iniciar el servidor", error.message);
  }
};

iniciarServidor();
