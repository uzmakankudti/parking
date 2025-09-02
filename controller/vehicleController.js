import Vehicle from "../schemas/vehicleSchema.js";
import asyncHandler from "express-async-handler";

export const  addVehicle = asyncHandler(async (req, res) => {
    try {
        const { name, number, type } = req.body;
        if (!name || !number || !type) {
            return res.status(404).json({
                success: false,
                message: "all feilds are required"
            });
        } const existingVehicle = await Vehicle.findOne({
            $or: [{ name }, { number }]
        });
        if (existingVehicle) {
            return res.status(404).json({
                success: false,
                message: "vehicle already registered with name and number"
            });
        } 
        const vehicle = await Vehicle.create({
            name, number, type
        }); return res.status(201).json({
            success: true,
            message: "created",
            data:vehicle
        });
    
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error:error.message
        });
    }
});