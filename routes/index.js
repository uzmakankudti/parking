import expressRouter from "express";
import userRouter from "./userRouter.js";
import slotRouter from "./slotRouter.js";
import vehicleRouter from "./vehicleRouter.js";
import ownerRouter from "./ownerRouter.js";
import bookingRouter from "./bookingRouter.js";


const router = expressRouter();

router.use("/user",userRouter);
router.use("/slot",slotRouter);
router.use("/vehicle",vehicleRouter);
router.use("/owner",ownerRouter);
router.use("/booking",bookingRouter);

export default router;