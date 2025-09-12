import Vehicle from "../schemas/vehicleSchema.js";
import asyncHandler from "express-async-handler";

export const addVehicle = asyncHandler(async (req, res) => {
    try {
        const { name, number, type } = req.body;
        if (!name || !number || !type) {
            return res.status(400).json({
                success: false,
                message: "all feilds are required"
            });
        } const existingVehicle = await Vehicle.findOne({
            $or: [{ name }, { number }]
        }); if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: "vehicle already exists"
            });
        } const vehicle = await Vehicle.create({
            name,
            number,
            type
        });
        return res.status(201).json({
            success: true,
            message: "vehicle created"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

export const getVehicle = asyncHandler(async (req, res) => {
    try {
        const vehicle = await Vehicle.find({});
        return res.status(200).json({
            success: true,
            count: vehicle.length,
            message: "list of all vehicle",
            data: vehicle
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

export const getVehicleById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        /* if (!id) {
            return res.status(400).json({
                success: false,
                message: "vehicle id required"
            });
        }  */

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "vehicle not found"
            });
        } return res.status(200).json({
            success: true,
            message: "vehicle with this id",
            data: vehicle
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

export const updateVehicleById = asyncHandler(async (req, res) => {
    try {
        const { vehicleID } = req.params;
        const { name, number, type } = req.body;
        if (!vehicleID) {
            return res.status(404).json({
                success: false,
                message: "vehicle Id is required",
            });
        }
        const vehicle = await Vehicle.findByIdAndUpdate(vehicleID, { name, number, type }, { new: true });
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found with this ID"
            });
        } return res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: vehicle
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error ",
        });
    }
});

export const deleteVehicleById = asyncHandler(async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicleDoc = await Vehicle.findByIdAndDelete(vehicleId);
        if (!vehicleDoc) {
            return res.status(404).json({
                success: false,
                message: "vehicle not found with this Id"
            });
        } return res.status(200).json({
            success: true,
            message: "vehical removed successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
});