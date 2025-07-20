import User from "../../schemas/userSchema.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {generateOTP, sendMail} from '../../utils/sendEmail.js'

export const loggingIn = async (req, res) => {
    const {email, password} = req.body

      const mailObj = {
        mailFrom: `Ecommm ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: 'Account created Successfully',
        body: `
            <h1>WELCOME TO ECOMMM</h1>
            <p>You are logged in</p>
            <p>Make a post and have a great experience using Ecommm</p>
            `
    }

   if (!email || !password) {
        res.status(400).json({ message: "Please provide all fields", error: "Gmail or Password is incorrect" })
        return
    } else {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "User not found please register first to continue" })
            return
        }
            if (user.isVerified ===false) return res.status(400).json({message:'OTP not verified'})
        const compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            res.status(401).json({ message: "email or password is incorrect" })
            return
        }
         
        await sendMail(mailObj)
        
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

export const passwordResetRequest = async (req,res) =>{
    const {email } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({message: 'User not found resgister to continue'})
            return
        }

        const {passwordResetToken, otpExpires} = generateOTP()
        
        user.passwordResetToken = passwordResetToken
        user.passwordResetExpires = otpExpires

        await user.save()

         await sendMail({
                mailFrom: `Ecommm ${process.env.Email_user}`,
                mailTo: email,
                subject: 'Reset Password Request',
                body: `
                <p>Click to reset your password</p>
                <a href="https://localhost:3000/password/reset${token}"> Reset Password </a>
                `
            })
            res.status(200).json({mwssage: 'Password reset rrquest was successful'})

    } catch(error){
        console.log(error)
    }
}

export const passwordReset = async (req, res) => {
    const {token, newPassword } = req.body

    try{
         const user = await User.findOne ({ passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})
         if(!user) return res.status(400).json({message: 'password restet token invalid or expired'})

        user.password = bcrypt.hashSync(newPassword, 10)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save()


    }catch(error){
            console.log (error)
         }
    }