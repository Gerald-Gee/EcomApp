 import { Router } from 'express'
import {loggingIn} from '../controllers/authApis/authController.js'

const authRouter = Router()

//get all users

authRouter
    //post
    .post('/user/login', loggingIn)


export default authRouter