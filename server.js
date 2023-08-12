import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConfig from "./config/dbConfig.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

dbConfig()

app.post("/", (req, res) => {
  console.log(req.body);
  res.end("fairs");
});

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userTwo"] });
});

app.listen(5000, () => {
  console.log("server Listening on port 5000");
});
