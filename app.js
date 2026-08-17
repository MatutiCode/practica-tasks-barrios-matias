import express from "express";
import { startDB } from "./src/config/database.js";
import userRouter from "./src/routes/user.route.js";
import taskRouter from "./src/routes/task.route.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo http://localhost:${PORT}`);
});
