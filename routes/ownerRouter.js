import express from "express"
import {
    createOwner,
    deleteOwner,
    getAll,
    getById,
    getByName,
    updateOwner
} from "../controller/ownerController.js";

const ownerRouter = express.Router();

ownerRouter.route("/createOwner").post(createOwner);
ownerRouter.route("/updateOwner/:id").put(updateOwner);
ownerRouter.route("/deleteOwner/:id").delete(deleteOwner);
ownerRouter.route("/getAll").get(getAll);
ownerRouter.route("/getById/:id").get(getById);
ownerRouter.route("/getByName/:name").get(getByName);

export default ownerRouter;