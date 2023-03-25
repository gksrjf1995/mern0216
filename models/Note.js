
const mongoose = require("mongoose");


const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"User"
    },
    title : {
        type : String,
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
    completed : {
        type : Boolean,
        required : true,
    },
},
    {
        timestamps : true
    }

);

noteSchema.plugin(AutoIncrement, {
    inc_field: 'id',
    id:'ticketNums',
    start_seq : 500

});

const Note = mongoose.model("Note",noteSchema);

module.exports = Note