import Slot from "../schemas/slotSchema.js";
import asyncHandler from "express-async-handler";

export const addSlot = asyncHandler(async (req, res) => {
    try {
        const { slotNumber, level, isOccupied } = req.body;
        if (!slotNumber || !level || !isOccupied) {
            return res.status(400).json({
                success: false,
                message: "all feilds are required"
            });
        } const existingSlot = await Slot.findOne({ slotNumber });
        if (existingSlot) {
            return res.status(404).json({
                success: true,
                message: "slot booked"
            });
        }
        const slot = await Slot.create({
            slotNumber,
            level,
            isOccupied
        });
        return res.status(200).json({
            success: true,
            message: "slot created successfully",
            data: slot
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
});

export const getAllSlot = asyncHandler(async (req, res) => {
    try {
        const slot = await Slot.find({});
        if (slot.length === 0) {
            return res.status(200).json({
                success: false,
                message: "no slots added",
                data: []
            });
        } return res.status(200).json({
            success: true,
            message: "all available slots",
            data: slot
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
});

export const getSlotById = asyncHandler(async (req, res) => {
    try {
        const { slotId } = req.params;
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(400).json({
                success: true,
                message: "not slots id",
            });
        } return res.status(200).json({
            success: true,
            message: "slots",
            data: slot
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message

        });
    }
})

export const updateSlot = asyncHandler(async (req, res) => {
    try {
        const { slotId } = req.params;                       // 📝 get slotId from URL
        const { slotNumber, level, isOccupied } = req.body;  // 📝 get new data from body
        if (!slotId) {
            return res.status(400).json({
                success: false,
                message: "slot Id required "
            });
        }
        const slot = await Slot.findByIdAndUpdate(
            slotId,                                         //which slot to update
            { slotNumber, level, isOccupied },             //what to change
            { new: true }                                 //return the updated slot, not the old one
        );
        if (!slot) {
            return res.status(400).json({
                success: false,
                message: "slot not found "
            });
        } return res.status(200).json({
            success: true,
            message: "slot updated",
            data: slot
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error "
        });
    }
});

export const deleteSlot = asyncHandler(async (req, res) => {
    try {
        const { slotId } = req.params;
        /* if (!slotId) {
            return res.status(400).json({
                success: false,
                message: "slot id required"
            });
        } */
        const slot = await Slot.findByIdAndDelete(slotId);
        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "invalid id"
            });
        } return res.status(200).json({
            success: false,
            message: "slot deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error "
        });
    }
})