import mongoose from "mongoose";
const bookingSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true,
    },
    Slot:{
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
    PaymentStatus:{
        type:String,
        enum:["COMPLETED","PENDING"]
    },
    entryDate:{
        type:Date,
        default:Date.now,
        required:true,
    },
    exitDate:{
        type:Date,
        default:Date.now,
        required:true,
    },
});
const Booking=mongoose.model("Booking",bookingSchema);
export default Booking;