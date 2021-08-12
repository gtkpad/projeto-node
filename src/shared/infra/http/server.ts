import "reflect-metadata";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "dotenv/config";
import AppError from "@shared/errors/AppError";

import routes from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

app.listen(3333);
