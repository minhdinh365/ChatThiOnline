import mongoose from "mongoose";
import { Server } from "socket.io";
import express from "express";
import { getRoom } from "../controller/Room.js";
import { RESPONSE_MESSAGE } from "../constants.js";
import { addChat, getChats } from "../controller/ChatThiOnline.js";

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
            const msv = Number(message.msv);
            const box = Number(message.box);
            const page = Number(message.page);

            const room = await getRoom(box);
            if (!room) {
              io.emit("get-new-message", {
                room: null,
                chats: null,
                message: RESPONSE_MESSAGE.ROOM_INVALID,
              });

              return;
            }

            const isTeacher = msv === room.maGV;

            const listMessage = await getChats(box, page);

            //Tạo dùm mình thêm môt bàng Room (bên khách tự thêm mình chị tạo bảng cho nta thôi) bên trong đó có Uid (mãGv) và Box mục đich mình sẽ kiểm tra msv truyền xuống có phải là Giams thị coi thi hay không
            // để mình phân biệt user này có quyền xóa tin nhắn

            //Check Tìm Phong Của thông qua box mình đưa xuỗng tim sang bảng Room đk Room=Box mình đưa xuống
            //nếu có mode gom msv ,messager,tên phân biệt giảng viên dùm mình và trả ra dùm mình luôn msv connect vào phong này có là GV ko
            //
            //Trà về data tin nhắn  của phòng chỗ này bạn lấy tin nhắn trong ngày hiện lại đc rồi nhớ  giới hạng data nha dung lazy của bạn ấy   đó Cấu trúc model trả ra  {uid,time,nguoidung,noidung}

            //Nêu không thì tạo room mới cho sinh viên lưu
            //trả về data null kèm thông báo ko tồn tại phòng
            io.emit("get-new-message", {
              room: room,
              chats: listMessage,
              message: RESPONSE_MESSAGE.ROOM_INVALID,
            });
          } catch (error) {}
        });

        //Dùng để bắt use gửi tin nhắn xuỗng
        socket.on("add-new-message", async (message) => {
          const msv = message.msv;
          const box = message.box;
          const messager = message.messager;
          //Thêm vào bảng tin nhắn nhớ log thòi gian
          if (await addChat({ nguoidung: msv, box, noidung: messager })) {
            io.emit("get-new-message", message);

            return;
          }

          io.emit("get-new-message", null);
        });

        socket.on("disconnect", () => {});
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
