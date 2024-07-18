const express = require("express");
const auth = require("../../middlewares/auth");
const patientController = require("../../controllers/patient.controller");

const router = express.Router();

router.post("/", auth("managePatients"), patientController.createPatient);
router.get("/", auth("getPatients"), patientController.getPatients);
router.get("/:patientId", auth("getPatients"), patientController.getPatient);
router.put(
  "/:patientId",
  auth("managePatients"),
  patientController.updatePatient
);
router.delete(
  "/:patientId",
  auth("managePatients"),
  patientController.deletePatient
);

module.exports = router;
