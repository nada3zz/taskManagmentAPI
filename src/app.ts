import express from "express";
import cors from "cors";
import { apiBaseRouter } from "./app/api/routes";
import { errorHandler } from "./app/middlewares/errorHandler";
import { notFoundHandler } from "./app/middlewares/notFoundHandler";
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 3000;

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
  fs.readFileSync(path.resolve(__dirname, './utils/swagger.json'), 'utf-8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("**", notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
