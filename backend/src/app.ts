import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/Users-routes";
import friendRoutes from "./routes/friends-routes";
import postRoutes from "./routes/posts-routes";
import profileRoutes from "./routes/profile-routes";
import imgRoutes from "./routes/Images-routes";
import commentRoutes from "./routes/comment-routes";
import albumRoutes from "./routes/Album-routes";
import likeRoutes from "./routes/like-routes";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTION"],
    credentials: true,
  })
);
// app.use(cors());
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
  console.log("hello world");
  res.send("Hello there, world");
});

app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/images", imgRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/likes", likeRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  return res.status(500).json({ error: errorMessage });
});

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

const http = require("http")

const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})



io.on("connection", (socket:any) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data:any) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data:any) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

export default server;
