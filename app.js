import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});
