import { body } from "express-validator"
import { PersonModel } from "../../models/person.model"

export const createPersonValidation = [
    body("name").notEmpty().withMessage("el nombre de la persona no debe ser vacio"),
    body("Lastname").withMessage("el lastname no debe ser vacio").custom(async(value) => {
        const existente = await PersonModel.findOne({ where: { Lastname: value }});
        if (existente) throw new Error("ya existe una persona con ese apellido")
            return true;
    }),
];