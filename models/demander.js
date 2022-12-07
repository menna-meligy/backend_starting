const mongoose = require("mongoose");
const demanderSchema = mongoose.Schema({
  demandersName: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
  },
  Password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("demanders", demanderSchema);