import { PAGINATION, RESPONSE_MESSAGE } from "../constants.js";
import { ChatThiOnline } from "../model/ChatThiOnline.js";
import { Information } from "../model/Information.js";

export const createChat = async (req, res) => {
  try {
    const newChat = new ChatThiOnline({
      nguoidung: Number(req.body.nguoidung),
      noidung: req.body.noidung,
      box: Number(req.body.box),
      time: new Date(new Date().toString()),
    });

    await newChat.save().then(async (data) => {
      const info = await Information.findOne({ uid: data.nguoidung });
      return res.status(200).json({
        status: RESPONSE_MESSAGE.SUCCESS,
        message: { ...data, info },
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE_MESSAGE.ERROR, message: err.message });
  }
};

// Luu thông tin user
export const createInfornation = async (Infornation) => {
  try {
    const info = await Information.findOne({ uid: Infornation.msv });
    if (!info) {
      const newInformation = new Information({
        image: "https://i.imgur.com/KAi3pm9.jpg",
        uid: Infornation.msv,
        fullname: Infornation.usename,
      });
      await newInformation.save();
    }
  } catch (err) {}
};

export const getChatOfBox = async (req, res) => {
  const page = Number(req.query.page);
  return await ChatThiOnline.find({ box: Number(req.params.box) })
    .sort({ uid: 1 })
    .skip(PAGINATION * page - PAGINATION)
    .limit(PAGINATION)
    .populate({ path: "info", model: Information })
    .then((data) =>
      res.status(200).json({ status: RESPONSE_MESSAGE.SUCCESS, message: data })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ status: RESPONSE_MESSAGE.ERROR, message: err.message })
    );
};

export const getChats = async (box, page) => {
  const date = new Date(Date.now());
  return await ChatThiOnline.find({
    box: Number(box),
    time: {
      $gte: new Date(
        date.getYear(),
        date.getMonth() + 1,
        date.getDate(),
        0,
        0,
        0
      ),
    },
  })
    .sort({ uid: -1 })
    // .skip(PAGINATION * page - PAGINATION)
    // .limit(PAGINATION)
    .limit(50);
};

export const addChat = async (message) => {
  try {
    const newChat = new ChatThiOnline({
      nguoidung: message.nguoidung,
      noidung: message.noidung,
      box: Number(message.box),
      time: new Date(new Date().toString()),
    });

    return await newChat.save().then(async (data) => {
      return { data: await data._doc };
    });
  } catch (err) {
    return undefined;
  }
};

export const clearChats = async (box) => {
  return await ChatThiOnline.deleteMany({ box: box })
    .then((data) => true)
    .catch((err) => false);
};
