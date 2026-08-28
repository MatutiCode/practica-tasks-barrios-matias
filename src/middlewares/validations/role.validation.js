import { body, param  } from "express-validator"
import { RoleModel } from "../../models/role.model.js"
import { PersonModel } from "../../models/person.model.js";

export const createRoleValidation = [
    body("rolename").notEmpty().withMessage("el rolename no debe ser vacio").custom(async(value) => {
        const existente = await RoleModel.findOne({ where: { rolename: value}});
        if (existente) throw new Error("ya existe un rol con ese nombre");
        return true;
    }),
];

export const updateRoleValidation = [
    body("rolename").optional().notEmpty().withMessage("el rolename no debe ser vacio").custom(async(value, { req}) => {
        const existente = await RoleModel.findOne({ where: { rolename: value }});
        if (existente && existente.id !== Number(req.params.id)) {
            throw new Error("ya existe un rol con ese nombre");
        }
        return true;
    }),
];

export const personIdValidation = [
    param("id").isInt({ min: 1 }).withMessage("el id debe ser un numero positivo").custom(async(value) => {
        const persona = await PersonModel.findByPk(value);
        if (!persona) throw new Error("la persona no existe");
            return true;
    }),
];