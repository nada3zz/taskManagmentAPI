import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { apiBaseRouter } from "./app/api/routes";
import { errorHandler } from "./app/middlewares/errorHandler";
import { notFoundHandler } from "./app/middlewares/notFoundHandler";
//dotenv.config();

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

app.use("**", notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
