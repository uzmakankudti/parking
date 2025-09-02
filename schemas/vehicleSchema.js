import mongoose from "mongoose";
const vehicleSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        unique:true,
        required:true,
    },
    type:{
        type:String,
        enum:["CAR","BIKE"],
        required:true,
    },
});
const Vehicle=mongoose.model("Vehicle",vehicleSchema);
export default Vehicle;