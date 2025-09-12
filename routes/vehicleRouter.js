import express from "express"
import {
    addVehicle,
    deleteVehicleById,
    getVehicle,
    getVehicleById,
    updateVehicleById
} from "../controller/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.route("/addVehicle").post(addVehicle);
vehicleRouter.route("/getVehicle").get(getVehicle);
vehicleRouter.route("/getVehicleById/:id").get(getVehicleById);
vehicleRouter.route("/updateVehicleById/:vehicleId").post(updateVehicleById);
vehicleRouter.route("/deleteVehicleById/:vehicleId").delete(deleteVehicleById);

export default vehicleRouter;