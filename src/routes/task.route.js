import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { createTaskValidation, updateTaskValidation, taskIdValidation } from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validate.js";

export const taskRouter = Router();

taskRouter.post("/", createTaskValidation, validate, createTask);
taskRouter.get("/", getTasks);
taskRouter.get("/:id", taskIdValidation, validate, getTaskById);
taskRouter.put("/:id", taskIdValidation, updateTaskValidation, validate, updateTask);
taskRouter.delete("/:id", taskIdValidation, validate, deleteTask);

export default taskRouter;
