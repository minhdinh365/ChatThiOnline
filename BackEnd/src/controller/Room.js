import { Room } from "../model/Room.js";
import { Information } from "../model/Information.js";

export const getRoom = async (boxId) => {
  return await Room.findOne({ box: boxId }).populate({
    path: "infoGV",
    model: Information,
  });
};
