import mongoose from "mongoose";
import { DATABASE_TABLE } from "../constants.js";
import autoIncrementModelID from "../utils/GeneratedId.js";

/**
 * Defines the ChatThiOnline model
 */
const schema = mongoose.Schema(
  {
    uid: {
      type: Number,
      unique: true,
      require: true,
    },
    time: {
      type: Date,
      trim: true,
      require: true,
    },
    nguoidung: {
      type: String,
      // ref: DATABASE_TABLE.INFORMATION,
    },

    noidung: {
      type: String,
      require: true,
      trim: true,
    },
    box: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// // foreign key
// schema.virtual("info", {
//   ref: DATABASE_TABLE.INFORMATION,
//   localField: "nguoidung",
//   foreignField: "uid",
//   justOne: true,
// });

// method will be called when the new chat is created
schema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("activities", this, next);
});

export const ChatThiOnline = mongoose.model(
  DATABASE_TABLE.CHAT_THI_ONLINE,
  schema,
  DATABASE_TABLE.CHAT_THI_ONLINE
);
