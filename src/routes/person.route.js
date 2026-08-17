import { Router } from "express";
import { createPerson, getPeople } from "../controllers/person.controller.js";

const personRouter = Router();

personRouter.post("/", createPerson);
personRouter.get("/", getPeople);

export default personRouter;
