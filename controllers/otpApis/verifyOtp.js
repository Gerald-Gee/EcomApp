import User from "../../schemas/userSchema.js"
import { generateOTP, sendMail } from "../../utils/sendEmail.js"

export const verifyOTP = async (req, res) =>{
    

    try{
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message: 'User not found please register first to continue'})
            return
        }
        if (user.isVerified) return res.status(400).json({mesage: 'OTP is verified'})
          
        if (user.otp !== otp) return res.status(400).json ({message: 'OTP is incorrect'})
        if (user.otpExpires <Date.now()) return res.status (400).json({message: 'OTP has expired generete New OTP'}) 
        

        //verify otp
        user.otp = undefined
        user.otpExpires = undefined
        user.isVerified = true;
        
        await user.save()
        res.status(200).json({message:'OTP is correct, proceed to login!'})
    } catch(error) {
        res.status(500).json(error)
    }
}

export const resendOTP = async (req, res) =>{
    const {email} = req.body
    try{
        const user = await User.findOne({ email })
        const {otp, otpExpires } = generateOTP()

        const time = Date.now()

        if(!user){
            res.status(400).json({message: 'Register first to continue, user not found!'})
            return
        } 
        if(user.isVerified) return res.status(400).json({message: 'OTP is already verified!'})
        if(time - user.lastOtpSentAt < 2 * 60 * 1000) return res.status(400).json({message: 'Wait before resending'})

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save()

     
            await sendMail({
                mailFrom: `Ecommm ${process.env.Email_user}`,
                mailTo: email,
                subject: 'Updated OTP',
                body: `
                <p>Here is your OTP $(otp), proceed to verify</p>
                `
            })
                res.status(200).json({message:'OTP has been resent, please check'})


    } catch(error){
        console.log(error)
    }
}