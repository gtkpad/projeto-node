import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UserAuthenticationController from "../controllers/UserAuthenticationController";

const userRouter = Router();

const userAuthenticationController = new UserAuthenticationController();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    },
  }),
  userAuthenticationController.create
);

export default userRouter;
