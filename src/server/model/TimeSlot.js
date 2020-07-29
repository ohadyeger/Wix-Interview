const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
  _id: Schema.Types.ObjectId,
  start_time: Date,
  class: { type: Schema.Types.ObjectId, ref: "ClassModel" },
  participants: [{ type: Schema.Types.ObjectId, ref: "MemberModel" }],
  waiting_list: [{ type: Schema.Types.ObjectId, ref: "MemberModel" }],
});
module.exports = mongoose.model("TimeSlotModel", timeSlotSchema);
