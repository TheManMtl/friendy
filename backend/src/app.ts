import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/Users-routes";
import friendRoutes from "./routes/friends-routes";
import postRoutes from "./routes/posts-routes";
import session from "express-session";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  session({
    name: "id",
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    },
  })
);

app.get("/", async (req, res) => {
  res.send("Hello there, world");
});

app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/posts", postRoutes);
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
