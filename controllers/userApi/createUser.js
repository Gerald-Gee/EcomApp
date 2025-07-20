import bcrypt from 'bcryptjs'
import User from '../../schemas/userSchema.js'
import {generateOTP, sendMail} from '../../utils/sendEmail.js'

export const createUser = async (req, res) => {
    const { username, email, password } = req.body


    if (!username || !email || !password) {
        res.status(400).json({ message: "Please provide all fields" })
        return
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ message: "User already exists" })
            return
        }
        
        const {otp, otpExpires } = generateOTP()


        //hash password
        const hashedPassword = bcrypt.hashSync(password, 10)
        
        if (email === 'geraldibeokoye@gmail.com' || email === 'ibeokoyegee@gmail.com') {
            const newUser = new User({ ...req.body, password: hashedPassword, admin: true })
           await newUser.save()
        }

        const newUser = new User({ ...req.body, password:hashedPassword, admin: false, otp, otpExpires, AltimatAdmin: false, profile: { country: '', Number: '', Street: '', Bio: '' } })
        await newUser.save()

        try{
             const mailObj = {
        mailFrom: `Ecommm ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: 'Acount created!',
        body:`
            <h1>WELCOME TO ECOMMM <strong>${username}</h1>
            <p>Here is your OTP ${otp} proceed to verify!</p>
            <p>Make a post and have a great experience using Ecommm</p>
            <p>Your username is ${process.env.SUPPORT}</p>
            `
    } 
        const info= await sendMail(mailObj)
        console.log(info)
    } catch (error){
        console.log(error)
    }
        
        res.status(201).json({mess: 'New User created successfully'})

    } catch (error) {
        res.status(500).json(error)
    }
}
