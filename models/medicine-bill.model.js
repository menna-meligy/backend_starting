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
});
module.exports = mongoose.model("buyer", medecineSchema);
