import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    gender:{
        type:String,
        enum:["MALE","FEMALE","OTHER"]
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    hobbies: [
        {
            type: String
        }
    ]
});

const User = mongoose.model("User", userSchema);
export default User;
