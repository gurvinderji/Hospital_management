import { Router } from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointment.controller.js";

const appointmentRouter = Router();

appointmentRouter.post("/post", isPatientAuthenticated, postAppointment);
appointmentRouter.get("/getall", isAdminAuthenticated, getAllAppointments);
appointmentRouter.put(
  "/update/:id",
  isAdminAuthenticated,
  updateAppointmentStatus
);
appointmentRouter.delete(
  "/delete/:id",
  isAdminAuthenticated,
  deleteAppointment
);

export default appointmentRouter;
