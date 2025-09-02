import mongoose from "mongoose";
const ownerSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{type:String
    },
    licence:{
        type:String,
        unique:true,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true,
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true,
    },
});
const Owner=mongoose.model("Owner",ownerSchema);
export default Owner;