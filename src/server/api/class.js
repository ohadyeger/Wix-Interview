const ClassModel = require("../model/Class");
// const TimeSlotModel = require("../model/TimeSlot")
const mongoose = require("mongoose");

module.exports = (app) => {
  app.get("/api/class/:id", function (req, res) {
    ClassModel.findOne({ _id: req.params.id })
      .populate("time_slots")
      .populate("waiting_list")
      .populate("participants")
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err,
          });
        } else {
          res.send(data).end();
        }
      });
  });
  app.get("/api/class", function (req, res) {
    ClassModel.find()
      .populate("time_slots")
      .populate("waiting_list")
      .populate("participants")
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err,
          });
        } else {
          // console.log(data);
          res.send(data).end();
        }
      });
  });
};
