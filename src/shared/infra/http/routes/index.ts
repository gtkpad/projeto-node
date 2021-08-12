import usersModuleRoutes from "@modules/users/infra/http/routes";
import { Router } from "express";

const routes = Router();

/**
 * Users Module HTTP Routes
 */
routes.use("/users", usersModuleRoutes);

export default routes;
