export const authMiddleware = (req, res, next) => {
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
            console.log(decoded)
            res.user = decoded
            next()
        }
    })
}
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = "Nusratilloh";

export const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Token yo`q",
            variant: 'Warning',
            payload: null,
        })
    }
    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
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

// admin middleware
export const adminMiddleware = (req, res, next) => {
    if (req?.user?.role === 'admin' || req?.user?.role === 'Admin' || req?.user?.role === 'owner' || req?.user?.role === 'Owner') {
        next()
    } else {
        return res.status(403).json({
            message: 'Foydalanuvchi user',
            variant: 'Warning',
            payload: null
        })
    }
}
// owner middleware
export const ownerMiddleware = (req, res, next) => {
    if (req?.user?.role !== 'owner') {
        next()
    } else {
        return res.status(403).json({
            message: 'Foydalanuvchi owner emas',
            variant: 'Warning',
            payload: null
        })
    }
}