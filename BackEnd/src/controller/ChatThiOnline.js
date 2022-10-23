import { RESPONSE_MESSAGE } from "../constants.js";
import { ChatThiOnline } from "../model/ChatThiOnline.js";

export const createChat = async (req, res) => {
  try {
    const newChat = new ChatThiOnline({
      nguoidung: req.body.nguoidung,
      noidung: req.body.noidung,
      box: req.body.box,
    });

    await newChat
      .save()
      .then((data) =>
        res.status(200).json({ status: RESPONSE_MESSAGE.SUCCESS })
      );
  } catch (err) {
    return res
      .status(500)
      .json({ status: RESPONSE_MESSAGE.ERROR, message: err.message });
  }
};

export const getChatOfBox = async (req, res) => {
  return await ChatThiOnline.find({ box: Number(req.params.box) })
    .then((data) =>
      res.status(200).json({ status: RESPONSE_MESSAGE.SUCCESS, message: data })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ status: RESPONSE_MESSAGE.ERROR, message: err.message })
    );
};
