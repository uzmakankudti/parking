import expressRouter from "express";
import userRouter from "./userRouter.js";
import slotRouter from "./slotRouter.js";
import vehicleRouter from "./vehicleRouter.js";


const router = expressRouter();

router.use("/user",userRouter);
router.use("/slot",slotRouter);
router.use("/vehicle",vehicleRouter);

export default router;