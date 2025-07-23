import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import uploadFileRouter from './routes/uploadFileRouter.js'
import connectDb from './connectDb/mongodb.js'
import otpRouter from './routes/otpRoutes.js'
import allApis from './routes/allApis.js' 
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config()



connectDb()

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//api/user/crete/creatUserFunction

app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', uploadFileRouter)
app.use('/api/otp', otpRouter)
app.use('/', allApis)
app.use('/', (req, res) => {
  
})
 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


const port = process.env.PORT

app.listen(port, console.log(`server listening on port ${port}`))