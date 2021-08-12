import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UserEmailController from "../controllers/UserEmailController";

const userRouter = Router();

const userEmailController = new UserEmailController();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    },
  }),
  userEmailController.show
);

export default userRouter;
