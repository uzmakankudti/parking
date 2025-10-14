import mongoose from "mongoose";
const slotSchema=new mongoose.Schema({
    slotNumber:{
        type:String,
        unique:true,
        required:true,
    },
    isOccupied:{
        type:Boolean,
        default:false,
    },
});
const Slot=mongoose.model("Slot",slotSchema);
export default Slot;