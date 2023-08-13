import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConfig from "./config/dbConfig.js";
import olxRouter from "./router/olxRouter.js";
import cookieParser from "cookie-parser";
const app = express();

app.use("/", olxRouter);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

dbConfig();

app.use("/", olxRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server Listening on port ${port}`);
});
