import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello there, world");
});

//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

export default app;
