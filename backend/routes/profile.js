import express from 'express'
import { User, validationProfile } from '../schema/userSchema'
import bcrayptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { auth } from '../middleware/auth.js'
const router = express.Router()
router.use(express.json())
dotenv.config()

// GET profile
router.get('/', async (req, res) => {
    try {
        const profile = await User.findById(req.user)
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
        profile.fname = req.body.fname
        profile.lname = req.body.lname
        profile.username = req.body.username
        profile.password = req.body.password
        profile.age = req.body.age
        profile.url = req.body.url
        profile.gender = req.body.gender
        profile.isActive = req.body.isActive
        profile.email = req.body.email
        profile.budget = req.body.budget
        profile.role = req.body.role
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