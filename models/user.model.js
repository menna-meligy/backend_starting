const mongoose = require("mongoose");
const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", schema);
