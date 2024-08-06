import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Token yo`q",
            variant: 'Warning',
            payload: null,
        })
    }
    jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token mos emas",
                variant: 'Warning',
                payload: null,
            })
        } else {
            console.log(decoded) // bar
            res.user = decoded
            next()
        }
    })
}