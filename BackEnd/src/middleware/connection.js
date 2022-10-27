import mongoose from "mongoose";
import { Server } from "socket.io";
import express from "express";
import { RESPONSE_MESSAGE } from "../constants.js";
import { addChat, getChats, clearChats } from "../controller/ChatThiOnline.js";

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
        //Lây ra phòng chat của User
        socket.on("join-room", async (message) => {
          try {
            const msv = message.msv;
            const box = Number(message.box);
            const page = Number(message.page);

            const listMessage = await getChats(box, page);
            listMessage.sort((a, b) => a.uid - b.uid);
            io.emit("get-list-message", {
              chats: listMessage,
              msv: msv,
              box: box,
              message: RESPONSE_MESSAGE.SUCCESS,
            });
          } catch (error) {
            console.log(error);
          }
        });

        //Dùng để bắt use gửi tin nhắn xuỗng
        socket.on("add-new-message", async (message) => {
          let msv = message.msv;
          const box = message.box;
          const messager = message.messager;
          if (msv.includes("giamthi")) {
            msv = "Giám Thị Box " + box;
          }

          //Thêm vào bảng tin nhắn nhớ log thòi gian
          const newMessage = await addChat({
            nguoidung: msv,
            box,
            noidung: messager,
          });

          if (newMessage) {
            io.emit("get-new-message", newMessage);

            return;
          }

          io.emit("get-new-message", null);
        });

        socket.on("clear-message", async (message) => {
          if (message.msv.includes("giamthi")) {
            if (await clearChats(message.box)) {
              socket.emit("clear-message", {
                msv: message.msv,
                box: message.box,
                message: RESPONSE_MESSAGE.SUCCESS,
              });
            } else {
              socket.emit("clear-message", {
                msv: message.msv,
                box: message.box,
                message: RESPONSE_MESSAGE.ERROR,
              });
            }
          }
        });

        socket.on("disconnect", () => {});
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
