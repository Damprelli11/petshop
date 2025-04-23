const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/", verifyToken, appointmentController.createAppointment);
router.get("/", verifyToken, appointmentController.getAppointments);
router.put("/:id", verifyToken, appointmentController.updateAppointment);
router.delete("/:id", verifyToken, appointmentController.deleteAppointment);

module.exports = router;
