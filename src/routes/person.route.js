import { Router } from "express";
import { createPerson, getPeople } from "../controllers/person.controller.js";
import { createPersonValidation } from "../middlewares/validations/person.validation.js";
import { validate } from "../middlewares/validate.js";

const personRouter = Router();

personRouter.post("/", createPersonValidation, validate, createPerson);
personRouter.get("/", getPeople);

export default personRouter;
