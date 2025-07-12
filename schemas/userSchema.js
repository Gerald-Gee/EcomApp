import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    AltimatAdmin: {
        type: Boolean,
        default: false
    },
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
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User