import { Router } from "express";

import userRouter from "./user.routes";
import userEmailRouter from "./userEmail.routes";

const router = Router();

/**
 * User List and Create Routes
 *
 */
router.use("/", userRouter);

/*
 * Show User Email
 */
router.use("/", userEmailRouter);

export default router;
