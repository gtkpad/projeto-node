import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UserPasswordController from "../controllers/UserPasswordController";

const userRouter = Router();

const userPasswordController = new UserPasswordController();

userRouter.post(
  "/",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      password: Joi.string().min(8).max(32).required(),
      newPassword: Joi.string().min(8).max(32).required(),
    },
  }),
  userPasswordController.update
);

userRouter.get("/", userPasswordController.update);

export default userRouter;
