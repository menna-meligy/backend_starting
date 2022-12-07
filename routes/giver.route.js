const express = require("express");
const router = express.Router();
const giver = require("../models/giver.model");
const authMiddleware = require("../middleware/auth.middleware");
const mongoose = require("mongoose");
const Mailer = require("nodemailer");
const user = require("../models/user.model");
//Add Medicine
router.post("/addRequest", authMiddleware, async (req, res) => {
  const obj = {
    name: req.body.name,
    quantity: req.body.quantity,
    expirationdate: req.body.expirationdate,
    userId: mongoose.Types.ObjectId(req.userData.userId),
    status: "",
  };
  const currentUser = await user.findOne({
    _id: mongoose.Types.ObjectId(req.userData.userId),
  });
  const resp = await giver.insertMany([obj]);
  const transportar = Mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL, // Your Gmail ID
      pass: process.env.PASSWORD, // Your Gmail Password
    },
  });
  const mailOptions = {
    from: process.env.SENDER_MAIL, // Sender ID
    to: currentUser.email, // Reciever ID
    subject: "Request Placed Successfully", // Mail Subject
    text: `Request has sent to the pharmacist and please
    wait for pharmacist permission`,
  };

  // Send an Email
  transportar.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log(info);
  });
  res.status(200).json({
    message: "Request Send Sucessfully",
    resp,
  });
});

router.get("/getList", async (req, res) => {
  const resp = await giver
    .find({ })
    .sort({ name: -1 });

  res.status(200).json({
    resp,
  });
});

router.put("/updateStatus",authMiddleware, async (req, res) => {
  const resp = await giver.updateOne(
    {
      _id: mongoose.Types.ObjectId(req.body._id),
    },
    {
      $set: {
        status: req.body.status,
      },
    }
  );
  let message =
    req.body.status === "rejected"
      ? "medicine cannot be reused from a doctor point of view"
      : "medicine is accepted please make a delivery request from the nearest pharmacy";
  const currentUser = await user.findOne({
    _id: mongoose.Types.ObjectId(req.body.userId),
  });
  const transportar = Mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL, // Your Gmail ID
      pass: process.env.PASSWORD, // Your Gmail Password
    },
  });
  const mailOptions = {
    from: process.env.SENDER_MAIL, // Sender ID
    to: currentUser.email, // Reciever ID
    subject: `Request has been ${req.body.status}`, // Mail Subject
    text: message,
  };

  // Send an Email
  transportar.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log(info);
  });
  res.status(200).json({
    message: "Request Send Sucessfully",
    resp,
  });
});

module.exports = router;
