import mongoose from "mongoose";
import Vehicle from "./vehicleSchema";
const bookingSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true,
    },
    slot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Slot",
        required:true,
    },
    totalAmt:{
        type:Number,
        required:true,
    },
    PaymentType:{
        type:String,
        enum:["CARD","CASH","UPI"],
        default:"CASH",
        required:true,
    },
    entryDate:{
        type:Date,
        default:Date.now,
        required:true,
    },
    exitDate:{
        type:Date,
        default:date,
        required:true,
    },
});
const Booking=mongoose.model("Booking",bookingSchema);
export default Booking;