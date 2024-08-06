import express from 'express'
import { User, validationUsers } from '../schema/userSchema.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { auth } from '../middleware/auth.js'
const router = express.Router()
router.use(express.json())
dotenv.config()

// GET users
router.get('/', async (req, res) => {
    try {
        const { limit, skip = 0 } = req.query;
        const users = await User.find().limit(limit).skip(skip * limit);
        if (!users.length) {
            return res.status(400).json({
                message: 'Malumot topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        const total = await User.countDocuments();
        res.status(200).json({
            message: 'Barcha Foydalanuvchilar',
            variant: 'Success',
            payload: users,
            total,
        })
    } catch {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// GET user detials
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                message: 'Foydalanuvchi topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        res.status(200).json({
            message: 'Foydalanuvchi',
            variant: 'Success',
            payload: user,
        })
    } catch (er) {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// POST user SIGN-UP
router.post('/sign-up', async (req, res) => {
    try {
        let { error } = validationUsers(req.body)
        console.log(error);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                variant: 'Error',
                payload: null,
            })
        }
        let allUsers = await User.find()
        const confligUser = allUsers.find((user) => user.username === req.body.username)
        if (confligUser) {
            return res.status(400).json({
                message: 'Foydalanuvchi mavjud',
                variant: 'Warning',
                payload: null,
            })
        }
        req.body.password = await bcryptjs.hash(req.body.password, 13)
        let newUser = await User.create(req.body)
        allUsers = await User.find()

        const token = jwt.sign({ _id: newUser._id, role: 'admin' }, process.env.SECRET_KEY);
        res.status(201).json({
            message: "Yangi foydalanuvchi qo'shildi",
            variant: 'Success',
            payload: { newUser, token },
        })
    } catch (er) {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// POST user SIGN-IN
router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                message: "Username yoki PAssword Xato",
                variant: 'Error',
                payload: user,
            })
        }
        bcryptjs.compare(password, user.password, (err, response) => {
            const token = jwt.sign({ _id: user._id, role: 'admin' }, process.env.SECRET_KEY);
            if (response) {
                res.status(201).json({
                    message: "Login",
                    variant: 'Success',
                    payload: { user, token },
                })
            } else {
                return res.status(400).json({
                    message: "Username yoki PAssword Xato",
                    variant: 'Error',
                    payload: null
                })
            }
        })

    } catch (er) {
        console.log(er)
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                message: 'Foydalanuvchi topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Foydalanuvchi o`chirildi',
            variant: 'Success',
            payload: null,
        })
    } catch (er) {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// PUT user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                message: 'Foydalanuvchi topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            message: 'Foydalanuvchi o`zgartirildi',
            variant: 'Success',
            payload: updatedUser,
        })
    } catch {
        return res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})


export default router