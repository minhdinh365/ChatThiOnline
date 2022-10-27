import { ChatThiOnline } from "../model/ChatThiOnline.js";

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
