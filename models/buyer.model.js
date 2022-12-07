const mongoose = require("mongoose");
const medecineSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("consumer", medecineSchema);
