import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UserPasswordController from "../controllers/UserPasswordController";

const userRouter = Router();

const userPasswordController = new UserPasswordController();

userRouter.patch(
  "/:id/password",
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

export default userRouter;
