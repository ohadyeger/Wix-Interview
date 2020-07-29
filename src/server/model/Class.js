const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const classSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  max_participants: Number,
  instructor_name: String,
  duration_minutes: Number,
  time_slots: [{ type: Schema.Types.ObjectId, ref: "TimeSlotModel" }],
});
module.exports = mongoose.model("ClassModel", classSchema);
