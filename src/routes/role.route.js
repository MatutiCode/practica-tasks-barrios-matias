import { Router } from "express";
import {
createRole,
getRoles,
updateRole,
deleteRole,
} from "../controllers/role.controller.js";
import {
createRoleValidation,
updateRoleValidation,
roleIdValidation,
} from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validate.js";

const roleRouter = Router();

roleRouter.post("/", createRoleValidation, validate, createRole);
roleRouter.get("/", getRoles);
roleRouter.put("/:id", roleIdValidation, updateRoleValidation, validate, updateRole);
roleRouter.delete("/:id", roleIdValidation, validate, deleteRole);

export default roleRouter;
