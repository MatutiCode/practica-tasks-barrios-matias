import { body, param  } from "express-validator"
import { RoleModel } from "../../models/role.model.js"

export const createRoleValidation = [
    body("rolename").notEmpty().withMessage("el rolename no debe ser vacio").custom(async(value) => {
        const existente = await RoleModel.findOne({ where: { rolename: value}});
        if (existente) throw new Error("ya existe un rol con ese nombre");
        return true;
    }),
]