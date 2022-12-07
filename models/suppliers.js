const mongoose = require("mongoose");
const SupplierSchema = mongoose.Schema({
  SupplierName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  MedicineName: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  ExpirationDate: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("supplier", SupplierSchema);