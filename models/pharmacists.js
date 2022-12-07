const mongoose = require("mongoose");
const pharmacistSchema = mongoose.Schema({
  pharmacistName: {
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
  PharmacyName: {
    type: String,
    required: true,
  },
  SupervisorName: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("pharmacists", pharmacistSchema);