const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  bookings: [{ type: Schema.Types.ObjectId, ref: "TimeSlotModel" }],
  notifications: [{ type: Schema.Types.ObjectId, ref: "NotificationModel" }],
});
module.exports = mongoose.model("MemberModel", memberSchema);
