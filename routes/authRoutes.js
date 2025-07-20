 import { Router } from 'express'
import {loggingIn, passwordResetRequest} from '../controllers/authApis/authController.js'

const authRouter = Router()


//get all users

authRouter
    //post
    .post('/user/login', loggingIn)
    .post('password/resetRequest', passwordResetRequest)
    

export default authRouter