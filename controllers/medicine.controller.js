const medicine = require("../models/medecine");
const medicineBill = require("../models/medicine-bill.model");
const user = require("../models/user.model");
const mongoose = require("mongoose");
const Mailer = require("nodemailer");

const addMedicine = async (req, res) => {
  const obj = {
    name: req.body.name,
    price: req.body.price,
    medicineType: req.body.medicineType,
    status: req.body.status,
    expirationdate: req.body.expirationdate,
    dosage: req.body.dosage,
    userId: mongoose.Types.ObjectId(req.userData.userId),
  };
  const medicineMatch = await medicine.findOne({ name: req.body.name });
  if (medicineMatch) {
    console.log(medicineMatch);

    const resp = await medicine.updateOne(
      { name: medicineMatch.name },
      {
        $set: {
          dosage: medicineMatch.dosage + req.body.dosage,
        },
      }
    );
    return res.status(201).json({
      message: "Medicine Added Successfully",
    });
  }
  const resp = await medicine.insertMany([obj]);
  if (!resp) {
    return res.status(500).json({
      message: "Can't Add Medicine",
    });
  }
  res.status(200).json({
    message: "Medicine Added Successfully",
  });
};

const medicineList = async (req, res) => {
  const { skip = 0, limit = 10, search } = req.body;
  const condition = {
    status: { $ne: "rejected" },
    dosage: { $gt: 0 },
  };
  if (search) {
    condition["$or"] = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }
  const resp = await medicine.find(condition).skip(skip).limit(limit);
  const totalCount = await medicine.countDocuments();
  return res.status(200).json({
    resp,
    totalCount,
    message: "Medicine get successfully",
  });
};

const medicineListForPharmacist = async (req, res) => {
  const resp = await medicine.aggregate([
    {
      $match: { status: { $ne: "rejected" }, dosage: { $gt: 0 } },
    },
    {
      $group: {
        _id: "$name",
        name: { $first: "$name" },
        totalCount: { $sum: { $toInt: "$dosage" } },
        expirationdate: { $first: "$expirationdate" },
        status: { $first: "$status" },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        totalCount: 1,
        expirationdate: 1,
        status: 1,
      },
    },
  ]);

  return res.status(200).json({
    resp,
    message: "Medicine get successfully",
  });
};

const medecineForDemander = async (req, res) => {
  const resp = await medicine.aggregate([
    {
      $match: { status: { $eq: "accepted" }, dosage: { $gt: 0 } },
    },
    {
      $group: {
        _id: "$name",
        name: { $first: "$name" },
        totalCount: { $sum: { $toInt: "$dosage" } },
        expirationdate: { $first: "$expirationdate" },
        status: { $first: "$status" },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        totalCount: 1,
        expirationdate: 1,
        status: 1,
      },
    },
    {
      $sort: { name: 1 },
    },
  ]);

  return res.status(200).json({
    resp,
    message: "Medicine get successfully",
  });
};

const updateStock = async (req, res) => {
  await medicine.updateOne(
    { name: req.body.name },
    { $inc: { dosage: -1 * Number(req.body.quantity) } }
  );

  const currentUser = await user.findOne({
    _id: mongoose.Types.ObjectId(req.userData.userId),
  });


  // Initialize the Authentication of Gmail Options
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
    subject: "Medicine Order Place Successfully", // Mail Subject
    text: `Your ${req.body.quantity} ${req.body.name}  medicines will be delievered shortly`,
  };

  // Send an Email
  transportar.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log(info);
  });
  const obj = {
    name: req.body.name,
    quantity: req.body.quantity,
    expirationdate: req.body.expirationdate,
    userId: mongoose.Types.ObjectId(req.userData.userId),
  };
  await medicineBill.insertMany([obj]);
  return res.status(200).json({
    message: "Medicine Buy Successfully",
  });
};

const updateStatus = async (req, res) => {
  const resp = await medicine.updateOne(
    { name: req.params.name },
    { $set: { status: req.body.status } }
  );
  return res.status(200).json({
    resp,
    message: "Medicine Status Updated Successfully",
  });
};

const deleteMedicine = async (req, res) => {
  const resp = await medicine.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    resp,
    message: "Medicine Deleted Successfully",
  });
};

const updateMedicine = async (req, res) => {
  const obj = {
    name: req.body.name,
    price: req.body.price,
    medicineType: req.body.medicineType,
    status: req.body.status,
    expirationdate: req.body.expirationdate,
    dosage: req.body.dosage,
    userId: mongoose.Types.ObjectId(req.userData.userId),
  };
  const resp = await medicine.updateOne({ _id: req.params.id }, { $set: obj });
  return res.status(200).json({
    resp,
    message: "Medicine Updated Successfully",
  });
};

const userMedicineList = async (req, res) => {
  console.log(req.userData.userId);
  const list = await medicineBill
    .find({ userId: mongoose.Types.ObjectId(req.userData.userId) })
    .sort({ name: 1 });
  return res.status(200).json({
    list,
    message: "List Fetch Successfully",
  });
};

module.exports = {
  addMedicine,
  medicineList,
  medicineListForPharmacist,
  medecineForDemander,
  updateStock,
  updateStatus,
  deleteMedicine,
  updateMedicine,
  userMedicineList,
};
