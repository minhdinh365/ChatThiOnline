import mongoose from "mongoose";
import { Server } from "socket.io";
import express from "express";
import { getRoom } from "../controller/Room.js";
import { RESPONSE_MESSAGE } from "../constants.js";
import { addChat, getChats, createInfornation } from "../controller/ChatThiOnline.js";

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
            console.log("Sss")
            const msv = Number(message.msv);

            const box = Number(message.box);
            const page = Number(message.page);

            const room = await getRoom(box);
            if (!room) {
              io.emit("get-list-message", {
                room: null,
                chats: null,
                msv: msv,
                message: RESPONSE_MESSAGE.ROOM_INVALID,
              });

              return;
            }
            if (room.maGV == msv) {
              message.usename = "Giám thị"
            }


            await createInfornation(message)





            const listMessage = await getChats(box, page);
            listMessage.sort((a, b) => a.uid - b.uid);
            console.log(listMessage)
            io.emit("get-list-message", {
              room: room,
              chats: listMessage,
              msv: msv,
              message: RESPONSE_MESSAGE.SUCCESS,
            });
            const newMessage = await addChat({
              nguoidung: msv,
              box,
              noidung: "Đã vào phòng",
            });
            if (newMessage) {
              io.emit("get-new-message", newMessage);

              //    return;
            }
          } catch (error) {

            console.log(error)
          }
        });

        //Dùng để bắt use gửi tin nhắn xuỗng
        socket.on("add-new-message", async (message) => {
          const msv = message.msv;
          const box = message.box;
          const messager = message.messager;
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

        socket.on("disconnect", () => { });
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
