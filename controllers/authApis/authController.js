import User from "../../schemas/userSchema.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loggingIn = async (req, res) => {
    const {gmail, password} = req.body
   if (!gmail || !password) {
        res.status(400).json({ message: "Please provide all fields", error: "Gmail or Password is incorrect" })
        return
    } else {
    try {
        const user = await User.findOne({ gmail })
        if (!user) {
            res.status(400).json({ message: "User not found please register first to continue" })
            return
        }

        const compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            res.status(401).json({ message: "gmail or password is incorrect" })
            return
        }
         
        
        const getToken = (id) => { 
            return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30m"})
        }
        

        const token = getToken(user._id)
        return res 
            .cookie('token', token, { httpOnly: true, sameSite: 'strict',   }, )
            .status(200)
            .json({ message: "Login Successful proceed to make a post"})
        
    } catch (error) {
        res.status(500).json(error)
       }
    }
}
