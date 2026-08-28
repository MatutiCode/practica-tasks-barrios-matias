import { body, param  } from "express-validator"
import { PersonModel } from "../../models/person.model.js"

export const createPersonValidation = [
    body("name").notEmpty().withMessage("el nombre de la persona no debe ser vacio"),
    body("Lastname").notEmpty().withMessage("el lastname no debe ser vacio").custom(async (value) => {
    const existente = await PersonModel.findOne({ where: { Lastname: value } });
    if (existente) throw new Error("ya existe una persona con ese apellido");
    return true;
    }),
];

export const updatePersonValidation = [
body("name").optional().notEmpty().withMessage("el nombre no debe ser vacio"),
body("Lastname")
    .optional()
    .notEmpty()
    .withMessage("el lastname no debe ser vacio")
    .custom(async (value, { req }) => {
    const existente = await PersonModel.findOne({ where: { Lastname: value } });
    if (existente && existente.id !== Number(req.params.id)) {
        throw new Error("ya existe una persona con ese apellido");
    }
    return true;
    }),
];

export const personIdValidation = [
param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .custom(async (value) => {
    const persona = await PersonModel.findByPk(value);
    if (!persona) throw new Error("la persona no existe");
    return true;
    }),
];