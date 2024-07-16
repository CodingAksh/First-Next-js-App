import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: [true, "please enter some email address"],
        type: String,
        unique: true,
    },
    password: {
        required: [true, "please enter some password"],
        type: String,
        minlength: 8,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    role: {
        isVerified: true,
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;