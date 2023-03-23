import mongoose from 'mongoose';
const { Schema } = mongoose;

const Userschema = new Schema({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    username : [{
        type : String,
        default : "Employee",
    }],
    active : {
        type : Boolean,
        required : true,
    },
});

const User = mongoose.model("User",Userschema);

module.exports = User