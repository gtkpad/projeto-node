import { Router } from "express";

import userRouter from "./user.routes";
import userAuthenticationRouter from "./userAuthentication.routes";
import userEmailRouter from "./userEmail.routes";
import userPasswordRouter from "./userPassword.routes";

const router = Router();

/**
 * User Routes
 * --User List
 * --Create User
 */
router.use("/", userRouter);

/*
 * User Email Routes
 * --Show User Email
 */
router.use("/", userEmailRouter);

/*
 * User Password Routes
 * --Update Password
 */
router.use("/", userPasswordRouter);

/*
 * User Authentication Routes
 * --Create Authentication
 */
router.use("/", userAuthenticationRouter);

export default router;
