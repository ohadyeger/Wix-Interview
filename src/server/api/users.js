const MemberModel = require("../model/Member");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.get("/api/dev/allusers/", function (req, res) {
    MemberModel.find()
      .populate("bookings")
      .populate("notifications")
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
  app.get("/api/dev/users/logout", function (req, res) {
    res
      .cookie("name", "", { overwrite: true })
      .cookie("id", "", { overwrite: true })
      .send({ msg: "logout successful" })
      .end();
  });
  app.get("/api/dev/users/validate/:username", function (req, res) {
    MemberModel.find({ username: req.params.username }, (err, data) => {
      if (err) {
        res.status(500).send({
          error: err,
        });
      } else {
        res.send(data).end();
      }
    });
  });
  app.get("/api/dev/loaduser/:username", function (req, res, next) {
    MemberModel.findOne({ username: req.params.username })
      .populate("bookings")
      .populate("notifications")
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
  app.get("/api/dev/users/:username", function (req, res, next) {
    MemberModel.findOne({ username: req.params.username })
      .populate("bookings")
      .populate("notifications")
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err,
          });
        } else if (data) {
          res
            .cookie("name", data.username, { overwrite: true })
            .cookie("id", JSON.stringify(data._id), { overwrite: true })
            .send(data)
            .end();
        } else {
          res.status(500).send({
            error: "An error occured in the server",
          });
        }
      });
  });
  app.post("/api/dev/userschange/:username", function (req, res, next) {
    const clientName = req.cookies["name"];
    MemberModel.findOne({ username: req.params.username })
      .populate("bookings")
      .populate("notifications")
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err,
          });
        } else if (!data || err || clientName === "") {
          res.status(500).send({
            error: err,
          });
        } else {
          if (req.body.username) {
            data.username = req.body.username;
          }
          data.save();

          res
            .cookie("name", req.body.username, { overwrite: true })
            .cookie("id", JSON.stringify(data._id), { overwrite: true })
            .send(data)
            .end();
        }
      });
  });

  app.post("/api/dev/users", function (req, res, next) {
    console.log("attempting to add user");
    const { username } = req.body;
    const newUser = new MemberModel({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      bookings: [],
      notifications: [],
    });
    newUser
      .save()
      .then((result) => {
        console.log("new member added", newUser);
        res.send(result).end();
      })
      .catch((err) => {
        res.status(500).send({
          error: err,
        });
      });
  });
  app.delete("/api/dev/users/:username", function (req, res, next) {
    MemberModel.findOneAndDelete({ username: req.params.username }).exec(
      (err, data) => {
        if (err) {
          res.status(500).send({
            error: err,
          });
        } else {
          if (req.cookies["name"] == req.params.username) {
            res
              .cookie("name", "")
              .status(200)
              .send({ msg: "User was deleted" })
              .end();
          } else {
            res.status(200).send({ msg: "User was deleted" }).end();
          }
        }
      }
    );
  });
};
