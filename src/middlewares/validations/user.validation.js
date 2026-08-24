import { body } from "express-validator";
import { UserModel } from "../../models/user.model";

export const createUserValidation = [
  body("name").notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido")
    .custom(async (value) => {
      const existente = await UserModel.findOne({ where: { email: value } });
      if (existente) throw new Error("ya existe un usuario con ese email");
      return true;
    }),
  body("password").notEmpty().withMessage("La password no debe ser vacia"),
  body("person_id").notEmpty().withMessage("El person_id no debe ser vacio"),
];

export const updateUserValidation = [
  body("name").optional().notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La password no debe ser vacia"),
  body("person_id")
    .optional()
    .notEmpty()
    .withMessage("El person_id no debe ser vacio"),
];

export const userIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el numero tiene que ser positivo")
    .custom(async (value) => {
      const usuario = await UserModel.findByPk(value);
      if (!usuario) throw new Error("el usuario no existe");
      return true;
    }),
];
