import express from "express";
import cors from "cors";
import { apiBaseRouter } from "./app/api/api.routes";
import { errorHandler } from "./app/middlewares/errorHandler.middleware";
import { notFound } from "./app/middlewares/notFound.middleware";
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

export const app = express();

app.use(
  cors({
    origin: "*",
    maxAge: 86400,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiBaseRouter);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../swagger.json'), 'utf-8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("**", notFound);

app.use(errorHandler);

