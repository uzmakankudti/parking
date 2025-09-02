import express from "express";
import Slot from "../schemas/slotSchema.js";
import {
    addSlot,
    deleteSlot,
    getAllSlot,
    getSlotById,
    updateSlot
} from "../controller/slotController.js";

const slotRouter = express.Router();

slotRouter.route("/addSlot").post(addSlot);
slotRouter.route("/getAllSlot").get(getAllSlot);
slotRouter.route("/getSlotById/:slotId").get(getSlotById);
slotRouter.route("/updateSlot/:slotId").put(updateSlot);
slotRouter.route("/deleteSlot/:slotId").delete(deleteSlot);

export default slotRouter;
