const MemberModel = require("../model/Member");
const NotificationModel = require("../model/Notification");
const TimeSlotModel = require("../model/TimeSlot");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.post("/api/timeslot/wait/:id", function (req, res) {
    const { member } = req.body;
    MemberModel.findOne({ _id: member._id }).exec((err, member) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        TimeSlotModel.findOne({ _id: req.params.id })
          .populate("waiting_list")
          .populate("participants")
          .populate("class")
          .exec((err, timeSlot) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            } else {
              if (
                timeSlot.participants.length >=
                  timeSlot.class.max_participants &&
                timeSlot.participants
                  .map((part) => part._id)
                  .filter((id) => id.toString() === member._id.toString())
                  .length == 0 &&
                timeSlot.waiting_list
                  .map((part) => part._id)
                  .filter((id) => id.toString() === member._id.toString())
                  .length == 0
              ) {
                timeSlot.waiting_list.push(member);

                timeSlot.save().then((result) => {
                  // console.log(timeSlot.participants);
                  // TODO: Fix Notifications
                  res.send({
                    status: 1,
                    msg: "waiting for time slot succeeded.",
                    result: result,
                  });

                  console.log("Added to waitlist!");
                });
                // .catch((err) => {
                //   res.status(500).json({
                //     error: err,
                //   });
                // });
                res
                  .send({
                    status: 1,
                    msg: "adding to waiting list succeeded.",
                  })
                  .end();
              }
            }
          });
      }
    });
  });
  // JOIN A CLASS
  app.post("/api/timeslot/:id", function (req, res) {
    const { member } = req.body;

    // console.log("/api/timeslot/:id", member);
    MemberModel.findOne({ _id: member._id }).exec((err, member) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        TimeSlotModel.findOne({ _id: req.params.id })
          .populate("class")
          .populate("participants")
          .exec((err, timeSlot) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            } else {
              if (
                timeSlot.participants.length >=
                  timeSlot.class.max_participants ||
                timeSlot.participants
                  .map((part) => part._id)
                  .filter((id) => id.toString() === member._id.toString())
                  .length > 0
              ) {
                console.log("Cannot add participan", timeSlot.participants);
                res.status(500).json({
                  error: err,
                });
              } else {
                timeSlot.participants.push(member._id);
                member.bookings.push(timeSlot);
                member.save();

                timeSlot
                  .save()
                  .then((result) => {
                    res.send({
                      status: 1,
                      msg: "booking succeeded.",
                      result: result,
                    });

                    console.log("Booked a class!");
                  })
                  .catch((err) => {
                    res.status(500).json({
                      error: err,
                    });
                  });
              }
            }
          });
      }
    });
  });
  app.delete("/api/timeslot/:id", function (req, res) {
    // console.log(" req.body", req.body);
    const { member } = req.body;
    MemberModel.findOne({ _id: member })
      .populate("bookings")
      .exec((err, member) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          TimeSlotModel.findOne({ _id: req.params.id })
            .populate("participants")
            .populate("waiting_list")
            .populate("class")
            .exec((err, timeSlot) => {
              if (err) {
                console.log("problem with the timeslot", req.params);
                res.status(500).json({
                  error: err,
                });
              } else {
                const toRemove = timeSlot.participants
                  .map((part) => part._id)
                  .filter((id) => id.toString() === member._id.toString());
                const toRemoveFromMember = member.bookings
                  .map((booking) => booking._id)
                  .filter((id) => id.toString() === timeSlot._id.toString());
                // .indexOf(timeSlot._id);
                if (!toRemove || !toRemoveFromMember) {
                  console.log("problem finding the timeslot");

                  res.status(200).send({
                    status: -1,
                    msg: "Member not enrolled in the class",
                  });
                } else {
                  console.log("no problem finding the timeslot");
                  timeSlot.participants.splice(toRemove, 1);
                  member.bookings.splice(toRemoveFromMember, 1);
                  timeSlot.save();
                  member.save();
                  timeSlot.waiting_list.forEach((member) => {
                    MemberModel.findOne({ _id: member._id }).exec(
                      (err, member) => {
                        if (member) {
                          const notification = new NotificationModel({
                            _id: new mongoose.Types.ObjectId(),
                            timestamp: new Date(),
                            content:
                              "A new slot had opened up for the class " +
                              timeSlot.class.name +
                              "!",
                          });
                          notification
                            .save()
                            .then((notification) => {
                              // console.log(
                              //   "new notification added with the content: " +
                              //     notification.content
                              // );
                              member.notifications.push(notification);
                              member
                                .save()
                                .then((member) => {
                                  console.log(
                                    "successfully added new notification"
                                  );
                                })
                                .catch((err) => {
                                  console.log(
                                    "failed to add notification for member!",
                                    member
                                  );
                                  console.log("error:", err);
                                });
                            })
                            .catch((err) => {
                              console.log(
                                "failed to add notification! notification: ",
                                notification
                              );
                              console.log("error:", err);
                            });
                        }
                      }
                    );
                  });
                  res
                    .send({
                      status: 1,
                      msg: "Booking cancellation succeeded.",
                    })
                    .end();
                  console.log("Booking cancellation succeeded");
                }
              }
            });
        }
      });
  });
};
