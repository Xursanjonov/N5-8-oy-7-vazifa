import express from 'express'
import { User, validationProfile } from '../schema/userSchema'
import bcrayptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { auth } from '../middleware/auth.js'
const router = express.Router()
router.use(express.json())
dotenv.config()

// GET profile Detail
router.get('/:id', async (req, res) => {
    try {
        const profile = await User.findById(req.params.id)
        if (!profile) {
            return res.status(400).json({
                message: 'Malumot topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        res.status(200).json({
            message: 'Profil',
            variant: 'Success',
            payload: profile,
        })
    } catch {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// POST profile
router.post('/', async (req, res) => {
    try {
        let { error } = validationProfile(req.body)
        console.log(error);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                variant: 'Error',
                payload: null,
            })
        }
        const profile = await User.findById(req.user)
        if (!profile) {
            return res.status(400).json({
                message: 'Malumot topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        profile.password = bcrayptjs.hash(req.body.password)
        profile = await User.findByIdAndUpdate(req.user, req.body)
        const token = jwt.sign({ _id: profile._id, role: req.body.role }, process.env.SECRET_KEY)
        profile.save()
        res.status(200).json({
            message: 'Profil',
            variant: 'Success',
            payload: { profile, token },
        })
    } catch {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// PUT profile
router.put('/:id', async (req, res) => {
    try {
        const profile = await User.findById(req.params.id)
        if (!profile) {
            return res.status(400).json({
                message: 'Malumot topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        profile = await User.findByIdAndUpdate(req.params.id, req.body)
        profile.save()

        res.status(200).json({
            message: 'Profil',
            variant: 'Success',
            payload: profile,
        })
    } catch {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})

export default router