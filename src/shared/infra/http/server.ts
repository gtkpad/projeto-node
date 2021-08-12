import "reflect-metadata";
import "express-async-errors";

import { errors } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "dotenv/config";
import AppError from "@shared/errors/AppError";

import routes from "./routes";
import swaggerDocs from "./swagger.json";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(cors());

app.use(express.json());

// Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Api Routes
app.use(routes);

// Celebrate Errors
app.use(errors());

// API Error handler
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => console.log("Server is running on port 3333!"));
