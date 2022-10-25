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
  },
  box: {
    type: Number,
  },
  maGV: {
    type: Number,
    unique: true,
    require: true,
    ref: DATABASE_TABLE.INFORMATION,
  },
});

// foreign key
schema.virtual("infoGV", {
  ref: DATABASE_TABLE.INFORMATION,
  localField: "maGV",
  foreignField: "uid",
  justOne: false,
});

// method will be called when the new chat is created
schema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("rooms", this, next);
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Room = mongoose.model(
  DATABASE_TABLE.ROOM,
  schema,
  DATABASE_TABLE.ROOM
);
