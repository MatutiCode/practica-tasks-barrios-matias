import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("el titulo no tiene que estar vacio")
    .custom(async (value) => {
      const existente = await TaskModel.findOne({ where: { title: value } });
      if (existente) throw new Error("el titulo ya existe");
      return true;
    }),
  body("description")
    .notEmpty()
    .withMessage("la descripcion no debe estar vacia"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser un valor booleano"),
  body("user_id")
    .notEmpty()
    .withMessage("el user_id no debe ser vacio")
    .custom(async (value) => {
      const usuario = await UserModel.findByPk(value);
      if (!usuario) throw new Error("el usuario no existe");
      return true;
    }),
];

export const updateTaskValidation = [
  body("title").optional().notEmpty().withMessage("El title no debe ser vacio"),
  body("description").optional().notEmpty().withMessage("La descripción no debe ser vacio"),
  body("isComplete").optional().notEmpty().withMessage("isComplete debe ser un valor booleano "),
];

export const taskIdValidation = [
  param("id").isInt({ min: 1 }).withMessage("El id debe ser un numero positivo").custom(async (value) => {
    const tarea = await TaskModel.findByPk(value);
    if (!tarea) throw new Error("la tarea no existe");
    return true;
  }),
];