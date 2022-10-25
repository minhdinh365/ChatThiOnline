import mongoose from "mongoose";
import { Server } from "socket.io";
import express from "express";

/**
 * this function is listen and create a new connection to the Mongoose server
 * @param {express} app
 */
export const mongooseConnection = (app) => {
  const PORT = process.env.PORT || 5000;
  const URI = process.env.DATABASE_URL;

  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info("Connected to DB");

      var server = app.listen(PORT, () => {
        console.info(`Server is running on port ${PORT}`);
      });

      const io = new Server(server, {
        cors: {
          origin: "*",
          credentials: true,
        },
      });

      io.on("connection", (socket) => {
        socket.on("add-new-message", (message) => {
          io.emit("get-new-message", message);
        });

        socket.on("disconnect", () => {});
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
