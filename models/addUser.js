import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    mcnumber: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
},
{
    timestamps : true  // to add createdAt and updatedAt fields in the schema.
})


mongoose.models = {}
module.exports = mongoose.model("Note",noteSchema);