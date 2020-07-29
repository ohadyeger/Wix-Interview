const mongoose = require("mongoose");
const ClassModel = require("./model/Class");
const TimeSlotModel = require("./model/TimeSlot");
const classesJson = require("./mock/classes.json");
const timeSlotsJson = require("./mock/timeslots.json");

mongoose.Promise = global.Promise;
const dbName = "wix";
const config = {
  mongoURL: process.env.MONGO_URL || "mongodb://localhost:27017/" + dbName,
  port: 8000,
};

mongoose.connect(config.mongoURL, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.error("Please make sure Mongodb is installed and running!");
    throw error;
  } else console.log("connected to database!");
});
classesJson.map((c, i) => {
  const new_class_id = new mongoose.Types.ObjectId();
  const new_class = {
    _id: new_class_id,
    name: c.name,
    description: c.description,
    price: c.price,
    max_participants: c.max_participants,
    instructor_name: c.instructor_name,
    duration_minutes: c.duration_minutes,
    time_slots: timeSlotsJson.map((ts) => {
      const new_time_Slot = {
        _id: new mongoose.Types.ObjectId(),
        start_time: ts.start_time,
        class: new_class_id,
        participants: ts.participants,
        waiting_list: ts.waiting_list,
      };

      new TimeSlotModel(new_time_Slot)
        .save()
        .then((result) => {
          console.log("new TimeSlotModel added");
        })
        .catch((err) => {
          console.log("new TimeSlotModel failed");
        });
      return new_time_Slot._id;
    }),
  };
  new ClassModel(new_class)
    .save()
    .then((result) => {
      console.log("new ClassModel added");
    })
    .catch((err) => {
      console.log("new ClassModel failed");
    });
  return new_class._id;
});
