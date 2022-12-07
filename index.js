const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const authRoute = require("./routes/auth.route");
const medicineRoute = require("./routes/medicine.route");
const giverRoute = require("./routes/giver.route");
const buyerRoute = require("./routes/buyer.route");

const medicine = require("./models/medecine");

const app = express();

require("mongoose").set("debug", true);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./connection/connection");

// Cron will run every night and delete rejected medicine
cron.schedule("0 0 * * *", async () => {
  await medicine.deleteMany({
    status: "rejected",
  });
});

//Routes
app.use("/api/auth", authRoute);
app.use("/api/medicine", medicineRoute);

app.use("/api/giver", giverRoute);
app.use("/api/buyer", buyerRoute);

module.exports = app;
