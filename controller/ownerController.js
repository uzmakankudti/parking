import Owner from "../scemas/ownerSchema.js";
import asyncHandler from "express-async-handler";

const createOwner = asyncHandler(async (req, req) => {
    try {
        const { firstName, lastName, user, vehicle } = req.body;
        if (!firstName || !lastName || !user || !vehicle) {
            return res.status(400).json({
                success: false,
                message: "bad requiest please fill all the detailes"
            });
        } const existingOwner = await Owner.findOne({ vehicle });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "owner exits for this vehicle ${vehicle}"
            });
        }const addOwner=await Owner.create({
            firstName, lastName, user, vehicle
        });
        return res.status(201).json({
            success:true,
            message:"user created successfully",
            data:addOwner
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
})