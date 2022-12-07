const mongoose = require("mongoose");
const medecineSchema = mongoose.Schema({
  medicineType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: Number,
    required: true,
  },
  expirationdate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default:''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
module.exports = mongoose.model("medecines", medecineSchema);
