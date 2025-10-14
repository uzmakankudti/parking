import express from "express";
import { 
    addBooking, 
    deleteBooking, 
    getAllBooking, 
    getBookingById, 
    updateBooking } from "../controller/bookingController.js";

const bookingRouter=express.Router();

bookingRouter.route("/addBooking").post(addBooking);
bookingRouter.route("/updateBooking").put(updateBooking);
bookingRouter.route("/deleteBooking").delete(deleteBooking);
bookingRouter.route("/getBookingById/:id").get(getBookingById);
bookingRouter.route("/getAllBooking").get(getAllBooking);

export default bookingRouter;