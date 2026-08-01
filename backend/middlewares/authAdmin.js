import jwt from 'jsonwebtoken'

// admin athu midileware

const authAdmin = async (req, res, next) => {
    try {

        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not authorized Login Again' })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        // The token was signed as email + password, which decodes to an object
        // We need to check if the token is valid (admin token has no expiry, so it's the email+password concat)
        const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        if (token_decode !== expectedPayload) {
            return res.json({ success: false, message: 'Not authorized Login Again' })
        }

        next()


    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;