const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  timestamp: Date,
  receiver: { type: Schema.Types.ObjectId, ref: "MemberModel" },
  content: String,
});
module.exports = mongoose.model("NotificationModel", notificationSchema);
