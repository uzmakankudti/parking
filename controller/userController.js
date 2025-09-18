import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";


export const addUser = asyncHandler(async (req, res) => {
    try {
        const { username, address, email, phoneNumber, hobbies, gender } = req.body;
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
            hobbies,
            gender
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
        // 1. Read page & pageSize from query, set defaults
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;

        // 2. Calculate how many docs to skip
        const skip = (page - 1) * pageSize;
        
        const totalDocuments = await User.countDocuments();

        const user = await User.find({})
            .sort({ username: -1 })
            .skip(skip)
            .limit(pageSize);

         const totalPages = Math.ceil(totalDocuments / pageSize);

        return res.status(200).json({
            success: true,
            message: "all user",
            data: user,
            meta:{
                page,
                pageSize,
                totalPages
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
});

/* export const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    username: 1,
                    email: 1,
                    phoneNumber: 1,
                    address: 1,
                    hobbies: 1,
                    _id: 0   // hide _id if you don’t want it
                }
            },
            {
                $sort: { username: 1 }  // sort A → Z by username
            }
        ]);

        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}); */


export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        } return res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

export const genderCount = asyncHandler(async (req, res) => {
    try {
        const { gender } = req.params;
        const users = await User.find({ gender });
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

/* {
    "success": true,
    "users": [
        {
            "_id": "68c94ce78ba5af9c1e4e7a0e",
            "username": "priyanka",
            "gender": "FEMALE",
            "address": "oni oni oni",
            "email": "priyanka@gmail.com",
            "phoneNumber": "0987654321",
            "hobbies": [],
            "__v": 0
        },
        {
            "_id": "68c94d088ba5af9c1e4e7a11",
            "username": "chitra",
            "gender": "FEMALE",
            "address": "oni oni oni",
            "email": "chitra@gmail.com",
            "phoneNumber": "0987654321",
            "hobbies": [],
            "__v": 0
        }
    ]
} */

export const genderCount1 = asyncHandler(async (req, res) => {
    try {
        const { gender } = req.params;
        const count = await User.countDocuments({ gender });
        return res.status(200).json({
            success: true,
            count
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

export const genderCount2 = asyncHandler(async (req, res) => {
    try {
        const male = await User.countDocuments({ gender: "MALE" });
        const female = await User.countDocuments({ gender: "FEMALE" });
        const other = await User.countDocuments({ gender: "OTHER" });
        return res.status(200).json({
            success: true,
            message: "total male and female count",
            male,
            female,
            other
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
})

/* {
    "success": true,
    "message": "total male and female count",
    "male": 1,
    "female": 2,
    "other": 0
}
  */

export const genderCountWithInfo = asyncHandler(async (req, res) => {
    try {
        const maleUser = await User.find({ gender: "MALE" });
        const femaleUser = await User.find({ gender: "FEMALE" });
        const otherUser = await User.find({ gender: "OTHER" });
        return res.status(200).json({
            success: true,
            message: "all users with count and information",
            data: {
                maleUser,
                femaleUser: { count: femaleUser.length, user: femaleUser },
                otherUser: { count: otherUser.length, user: otherUser }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

/* 
{
    "success": true,
    "message": "all users with count and information",
    "data": {
        "maleUser": [
            {
                "_id": "68c94d2a8ba5af9c1e4e7a14",
                "username": "chetan",
                "gender": "MALE",
                "address": "oni oni oni",
                "email": "chetan@gmail.com",
                "phoneNumber": "5643654321",
                "hobbies": [],
                "__v": 0
            }
        ],
        "femaleUser": {
            "count": 2,
            "user": [
                {
                    "_id": "68c94ce78ba5af9c1e4e7a0e",
                    "username": "priyanka",
                    "gender": "FEMALE",
                    "address": "oni oni oni",
                    "email": "priyanka@gmail.com",
                    "phoneNumber": "0987654321",
                    "hobbies": [],
                    "__v": 0
                },
                {
                    "_id": "68c94d088ba5af9c1e4e7a11",
                    "username": "chitra",
                    "gender": "FEMALE",
                    "address": "oni oni oni",
                    "email": "chitra@gmail.com",
                    "phoneNumber": "0987654321",
                    "hobbies": [],
                    "__v": 0
                }
            ]
        },
        "otherUser": {
            "count": 0,
            "user": []
        }
    }
} */
