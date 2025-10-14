import asyncHandler from "express-async-handler";
import Booking from "../schemas/bookingSchema.js";
import Slot from "../schemas/slotSchema.js"
import mongoose from "mongoose";

/* export const addBooking = asyncHandler(async (req, res) => {

  try {
    const { owner, vehicle, slot, exitDate, entryDate, totalAmt, PaymentType, PaymentStatus } = req.body;

    if (!owner || !vehicle || !slot || !exitDate || !entryDate || !PaymentStatus) {
      return res.status(400).json({
        success: false,
        message: "all fields are required"
      });
    }

    // ✅ fix: use findOne with query
    const existingSlot = await Booking.findOne({ slot });
    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: "slot is already in use"
      });
    }

    const createBooking = await Booking.create({
      owner,
      Vehicle: vehicle,         // map lowercase incoming to schema's capitalized field
      Slot:slot,
      exitDate,
      entryDate,
      totalAmt,
      PaymentType,
      PaymentStatus
    });

    return res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: createBooking
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}); */

export const addBooking = asyncHandler(async (req, res) => {
  try {
    const { User, Vehicle, Slot, exitDate, entryDate, totalAmt, PaymentType, PaymentStatus } = req.body;

    if(!User){
      return res.status(400).json({ success: false, message: "user is required" });
    }

    if(!Vehicle){
      return res.status(400).json({ success: false, message: "vehicle is required" });
    }

    if(!Slot){
      return res.status(400).json({ success: false, message: "slot is required" });
    }

    if(!exitDate){
      return res.status(400).json({ success: false, message: "exit date is required" });
    }

    if(!entryDate){
      return res.status(400).json({ success: false, message: "entry date is required" });
    }

    if(!PaymentStatus){
      return res.status(400).json({ success: false, message: "payment status is required" });
    }
    
    // ====== Check for slot conflict ======
    const overlappingBooking = await Booking.findOne({
      Slot,
      $or: [
        {
          entryDate: { $lt: new Date(exitDate) },
          exitDate: { $gt: new Date(entryDate) }
        }
      ],
      PaymentStatus: { $ne: "CANCELLED" } // Optional: skip cancelled bookings
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked during the selected time range"
      });
    }

    // create booking
    const createBooking = await Booking.create({
      User,
      Vehicle,
      Slot,
      exitDate,
      entryDate,
      totalAmt,
      PaymentType,
      PaymentStatus
    });

    return res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: createBooking
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

export const updateBooking=asyncHandler(async(req,res)=>{
  try{
    const{id}=req.params;
    const {owner}=req.body;
    const updateBooking=await Booking.findByIdAndUpdate(id,{owner},{new:true});
    return res.status(200).json({
      success:false,
      message:"user Updated successfully",
      data:updateBooking
    });
  }catch(error){
    return res.status(500).json({
      success:false,
      error:error.message
    });
  }
});

export const deleteBooking=asyncHandler(async(req,res)=>{
  try{
    const {id}=req.params;
    const deleteBooking=await Booking.findByIdAndDelete(id);
    return res.status(200).json({
      success:false,
      message:"booking deleted successfully",
      data:deleteBooking
    });
  }catch(error){
    return res.status(500).json({
      success:false,
      error:error.message
    });
  }
});

export const getAllBooking=asyncHandler(async(req,res)=>{
  try{
    const allBooking=await Booking.find({});
    return res.status(200).json({
      success:true,
      message:"all booking",
      data:allBooking
    });
  }catch(error){
    return res.status(500).json({
      success:false,
      error:error.message
    });
  }
});

export const getBookingById=asyncHandler(async(req,res)=>{
  try{
    const {id}=req.params;
    const booking=await Booking.findById(id);
    return res.status(200).json({
      success:true,
      message:"booking by id",
      data:booking
    });
  }catch(err){
    return res.status(500).json({
      success:false,
      error:err.message
    });
  }
})

