const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experimentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  incubator: { type: Schema.Types.ObjectId, ref: "IncubatorModel" },
  exp_info: {
    type: {
      start_time: Date,
      end_time: Date
    },
    default: null
  },
  preCycle: {
    type: Schema.Types.ObjectId,
    ref: "PreCycleModel",
    default: null
  },
  inCycle: { type: Schema.Types.ObjectId, ref: "InCycleModel", default: null },
  postCycle: {
    type: Schema.Types.ObjectId,
    ref: "PostCycleModel",
    default: null
  }
});
module.exports = mongoose.model("ExperimentModel", experimentSchema);
