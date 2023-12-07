import express from "express";
import "./database/connection";

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
  res.send("Hello there world");
});

app.listen(port, () => {
  console.log(`server running on post ${port}`);
});
