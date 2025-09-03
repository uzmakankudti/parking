import express from "express"
import {
    addVehicle,
    getVehicle,
    getVehicleById
} from "../controller/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.route("/addVehicle").post(addVehicle);
vehicleRouter.route("/getVehicle").get(getVehicle);
vehicleRouter.route("/getVehicleById/:id").get(getVehicleById);

export default vehicleRouter;