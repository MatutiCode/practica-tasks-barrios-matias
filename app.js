import express from "express";
import { startDB } from "./src/config/database.js";
import "./src/models/person.model.js";
import "./src/models/user.model.js";
import "./src/models/task.model.js";
import "./src/models/role.model.js";
import "./src/models/user_role.model.js";
import { userRouter } from "./src/routes/user.route.js";
import { taskRouter } from "./src/routes/task.route.js";
import personRouter from "./src/routes/person.route.js";
import roleRouter from "./src/routes/role.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/persons", personRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo http://localhost:${PORT}`);
});
