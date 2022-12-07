const mongoose = require("mongoose");
const medecineSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
  expirationdate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("giver", medecineSchema);
