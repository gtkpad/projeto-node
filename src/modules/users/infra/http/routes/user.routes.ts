import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UserController from "../controllers/UserController";

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    },
  }),
  userController.create
);

userRouter.get("/", userController.index);

export default userRouter;
