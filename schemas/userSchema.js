import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
});
const User=mongoose.model("User",userSchema);
export default User;