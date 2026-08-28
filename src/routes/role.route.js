import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controller.js";
import { createRoleValidation } from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validate.js";

const roleRouter = Router();

roleRouter.post("/", createRoleValidation, validate, createRole);
roleRouter.get("/", getRoles);

export default roleRouter;
