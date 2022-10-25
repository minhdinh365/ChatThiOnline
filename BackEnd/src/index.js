import methodOverride from "method-override";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ChatThiOnline from "./router/ChatThiOnline.js";
import path from 'path';


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

      //Lây ra phòng chat của User
      socket.on("join-room", (message) => {
        try {
          // console.log(message.MSV);
          let msv = message.msv;
          let box = message.box;
          console.log(msv);
          console.log(box);

          //Tạo dùm mình thêm môt bàng Room (bên khách tự thêm mình chị tạo bảng cho nta thôi) bên trong đó có Uid (mãGv) và Box mục đich mình sẽ kiểm tra msv truyền xuống có phải là Giams thị coi thi hay không
          // để mình phân biệt user này có quyền xóa tin nhắn 

          //Check Tìm Phong Của thông qua box mình đưa xuỗng tim sang bảng Room đk Room=Box mình đưa xuống 
          //nếu có mode gom msv ,messager,tên phân biệt giảng viên dùm mình và trả ra dùm mình luôn msv connect vào phong này có là GV ko 
          // 
          //Trà về data tin nhắn  của phòng chỗ này bạn lấy tin nhắn trong ngày hiện lại đc rồi nhớ  giới hạng data nha dung lazy của bạn ấy   đó Cấu trúc model trả ra  {uid,time,nguoidung,noidung} 

          //Nêu không thì tạo room mới cho sinh viên lưu 
          //trả về data null kèm thông báo ko tồn tại phòng 

          io.emit("get-new-message", message);
        } catch (error) {

        }
      });


      //Dùng để bắt use gửi tin nhắn xuỗng
      socket.on("add-new-message", (message) => {
        let msv = message.msv;
        let box = message.box;
        let messager = message.messager;
        //Thêm vào bảng tin nhắn nhớ log thòi gian 

        console.log(message);


        io.emit("get-new-message", message);
      });

      //Dùng để bắt use gửi tin nhắn xuỗng
      socket.on("add-new-message", (message) => {
        let msv = message.msv;
        let box = message.box;
        let messager = message.messager;
        //Thêm vào bảng tin nhắn nhớ log thòi gian 

        console.log(message);


        io.emit("get-new-message", message);
      });

      socket.on("disconnect", () => { });
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
// Without middleware
app.get('/Home', function (req, res) {
  var options = {
    root: path.resolve(path.dirname(''))
  };

  console.log(path.resolve())
  var fileName = 'src/index.html';

  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err)
      // next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.use("/", ChatThiOnline);


