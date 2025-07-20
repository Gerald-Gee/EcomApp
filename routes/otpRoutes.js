 import { Router } from 'express'

import { verifyOTP, resendOTP } from '../controllers/otpApis/verifyOtp.js'

const otpRouter = Router()




otpRouter

    .post('/verify', verifyOTP)
     .post('/resend', resendOTP)

export default otpRouter