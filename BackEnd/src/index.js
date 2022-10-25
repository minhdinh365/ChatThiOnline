import methodOverride from "method-override";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ChatThiOnline from "./router/ChatThiOnline.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));

const URI = process.env.DATABASE_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");

    var server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const io = new Server(server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      socket.on("add-new-message", (message) => {
        console.log(message);
        io.emit("get-new-message", message);
      });

      socket.on("disconnect", () => {});
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

app.use("/", ChatThiOnline);
