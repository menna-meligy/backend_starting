const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  addMedicine,
  medicineList,
  medicineListForPharmacist,
  medecineForDemander,
  updateStock,
  updateStatus,
  updateMedicine,
  deleteMedicine,
  userMedicineList,
} = require("../controllers/medicine.controller");

//Add Medicine
router.post("/add", authMiddleware, addMedicine);

//Get Medicine
router.post("/getMedicine", authMiddleware, medicineList);

//Get Medicine For  Pharmacist
router.get(
  "/getMedicineForPharmacist",
  authMiddleware,
  medicineListForPharmacist
);

//Get Medicine For Demanders
router.get("/getMedicineForDemanders", authMiddleware, medecineForDemander);

//Update Medicine Stock
router.put("/updateStock", authMiddleware, updateStock);


//Update Medicine Status
router.put("/updateStatus/:name", authMiddleware, updateStatus);

//Delete Medicine
router.delete("/deleteMedicine/:id", authMiddleware, deleteMedicine);

//Update Medicince
router.put("/updateMedicine/:id", authMiddleware, updateMedicine);

//User Medicince List
router.get("/userMedicine", authMiddleware, userMedicineList);

module.exports = router;
