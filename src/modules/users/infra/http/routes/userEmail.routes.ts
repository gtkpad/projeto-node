import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UserEmailController from "../controllers/UserEmailController";

const userRouter = Router();

const userEmailController = new UserEmailController();

userRouter.post(
  "/",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userEmailController.show
);

export default userRouter;
