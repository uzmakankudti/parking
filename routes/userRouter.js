import express from "express";
import {
    addUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    genderCount,
    genderCount1,
    genderCount2,
    genderCountWithInfo
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/addUser").post(addUser);
userRouter.route("/updateUser/:userId").put(updateUser);
userRouter.route("/getUserById/:userId").get(getUserById);
userRouter.route("/getAllUser").get(getAllUser);
userRouter.route("/deleteUser/:userId").delete(deleteUser);


userRouter.route("/genderCount/:gender").get(genderCount);
userRouter.route("/genderCount1/:gender").get(genderCount1);
userRouter.route("/genderCount2").get(genderCount2);
userRouter.route("/genderCountWithInfo").get(genderCountWithInfo);

export default userRouter;