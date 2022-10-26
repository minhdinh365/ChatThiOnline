import mongoose from "mongoose";
import { DATABASE_TABLE } from "../constants.js";

/**
 * Defines the Information model
 */
const schema = mongoose.Schema({
  uid: {
    type: Number,
    unique: true,
    require: true,
    // ref: DATABASE_TABLE.CHAT_THI_ONLINE,
  },
  image: {
    type: String,
    trim: true,
  },
  fullname: {
    type: String,
    trim: true,
  },
});

// // foreign key
// schema.virtual("chats", {
//   ref: DATABASE_TABLE.CHAT_THI_ONLINE,
//   localField: "uid",
//   foreignField: "nguoidung",
//   justOne: false,
// });

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Information = mongoose.model(
  DATABASE_TABLE.INFORMATION,
  schema,
  DATABASE_TABLE.INFORMATION
);
