import bcrypt from 'bcryptjs'
import User from '../../schemas/userSchema.js'



export const createUser = async (req, res) => {
    const { username, gmail, password } = req.body
    if (!username || !gmail || !password) {
        res.status(400).json({ message: "Please provide all fields" })
        return
    }
    try {
        const user = await User.findOne({ gmail })
        if (user) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        
        if (gmail === 'Barakat@gmail.com' || gmail === 'Emmanuel@gmail.com') {
            const newUser = new User({ ...req.body, password: hashedPassword, admin: true })
           await newUser.save()
        }

        const newUser = new User({ ...req.body, password:hashedPassword, admin: false, AltimatAdmin: false, profile: { country: '', Number: '', Street: '', Bio: '' } })
        await newUser.save()
        res.status(201).json({mess: 'New User created successfully'})

    } catch (error) {
        res.status(500).json(error)
    }
}
