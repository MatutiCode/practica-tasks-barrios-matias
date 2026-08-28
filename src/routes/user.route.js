import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { createUserValidation, updateUserValidation, userIdValidation } from "../middlewares/validations/user.validation.js";
import {validate } from "../middlewares/validate.js"

export const userRouter = Router();

userRouter.post("/", createUserValidation, validate,createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", userIdValidation, validate, getUserById);
userRouter.put("/:id", userIdValidation, updateUserValidation, validate, updateUser);
userRouter.delete("/:id", userIdValidation, validate, deleteUser);

export default userRouter;
