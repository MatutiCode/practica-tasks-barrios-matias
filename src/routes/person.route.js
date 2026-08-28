import { Router } from "express";
import {
createPerson,
getPeople,
updatePerson,
deletePerson,
} from "../controllers/person.controller.js";
import {
createPersonValidation,
pdatePersonValidation,
personIdValidation,
} from "../middlewares/validations/person.validation.js";
import { validate } from "../middlewares/validate.js";

const personRouter = Router();

personRouter.post("/", createPersonValidation, validate, createPerson);
personRouter.get("/", getPeople);
personRouter.put("/:id", personIdValidation, updatePersonValidation, validate, updatePerson);
personRouter.delete("/:id", personIdValidation, validate, deletePerson);

export default personRouter;
