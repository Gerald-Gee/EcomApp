import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import connectDb from './connectDb/mongodb.js'
import dotenv from 'dotenv'

dotenv.config()





connectDb()

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//api/user/crete/creatUserFunction

app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)

const port = process.env.PORT 


app.listen(port, console.log(`server listening on port ${port}`))




