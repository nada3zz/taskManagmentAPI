import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import { apiBaseRouter } from './app/api/routes';
//import { NotFoundException } from './utils/exceptions';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    maxAge: 86400
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// API routes
// app.use("/api", apiBaseRouter);

// // Not Found route handler
// app.use("**", (req: Request, res: Response, next: NextFunction) => {
//     next(new NotFoundException(`Cannot ${req.method} ${req.originalUrl}`));
// });

// // Error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     err.statusCode = err.statusCode ?? 500;
//     if (err.statusCode === 500) console.log(err);

//     res.status(err.statusCode).json({
//         status: err.statusCode,
//         message: err.statusCode === 500 ? "Internal server error" : err.message,
//         data: null
//     });
// });


