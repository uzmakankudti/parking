import express from "express"
import { addVehicle } from "../controller/vehicleController.js";

const vehicleRouter=express.Router();

vehicleRouter.route("/addVehicle").post(addVehicle);

export default vehicleRouter;