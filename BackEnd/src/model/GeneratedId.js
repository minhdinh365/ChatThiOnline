import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model("counter", counterSchema);

/**
 * Auto Increment id for model
 * This Function is used to increment counter in the database
 * This function will create a new table was used for count
 * @param {*} modelName The new table will be created
 * @param {*} doc The information about the new records
 * @param {*} next the function to execute
 */
const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    // ** Method call begins **
    modelName, // The ID to find for in counters model
    { $inc: { seq: 1 } }, // The update
    { new: true, upsert: true }, // The options
    function (error, counter) {
      // The callback
      if (error) return next(error);

      doc.uid = counter.seq;
      next();
    }
  ); // ** Method call ends **
};

export default autoIncrementModelID;
