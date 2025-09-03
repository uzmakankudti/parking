import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";


export const addUser = asyncHandler(async (req, res) => {
    try {
        const { username, address, email, phoneNumber, hobbies } = req.body;
        if (!username || !address || !email || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "all feilds are required"
            });
        } const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists with email"
            });
        } const newUser = await User.create({
            username,
            address,
            email,
            phoneNumber,
            hobbies
        });
        return res.status(200).json({
            success: true,
            message: "user created successfully",
            data: newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
});

export const updateUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        const user = await User.findByIdAndUpdate(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        }
        user.username = updateData.username || user.username;
        user.email = updateData.email || user.email;
        user.phoneNumber = updateData.phoneNumber || user.phoneNumber;

        const updateUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: updateUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
});

export const getUserById = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "all users",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
});

export const getAllUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({});
        return res.status(400).json({
            success: true,
            message: "all user",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"server error"
        });
    }
});