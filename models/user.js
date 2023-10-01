import mongoose, { Schema, models } from "mongoose";



const userSchema = new Schema({
    mcnumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email:{
        type :String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},
{timestamps: true}
)

// const User = mongoose.model("User",userSchema)
const User = mongoose.models.User || mongoose.model("User",userSchema)
// const User = models.user
export default User;
