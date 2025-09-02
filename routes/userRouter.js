import express from "express";
import {
    addUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/addUser").post(addUser);
userRouter.route("/updateUser/:userId").put(updateUser);
userRouter.route("/getUserById/:userId").get(getUserById);
userRouter.route("/getAllUser").get(getAllUser);
userRouter.route("/deleteUser/:userId").delete(deleteUser);

export default userRouter;