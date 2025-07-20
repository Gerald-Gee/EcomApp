import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    admin: {type: Boolean, default: false},
    AltimatAdmin: {type: Boolean, default: false},
    profile: {
        country: {
            type: String
        },
        Number: {
            type: Number
        },
        Street: {
            type: String
        },
        Bio: {
            type: String
        }   
    },
    otp : String,
    otpExpires: Date,
    isVerified: {type: Boolean, default: false},
    lastOtpSentAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User