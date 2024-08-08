import express from "express"
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js"
// import { auth, adminMiddleware } from '../middleware/auth-middleware.js'
const router = express.Router()

router.get("/api/blogs", BlogsController.get)
router.post("/api/blogs", BlogsController.create)

router.get('/api/users', UsersController.getAllUsers)
router.get('/api/users/sign-in', UsersController.loginUser)
router.post('/api/users/sign-up', UsersController.registerUser)
router.put('/api/users/:id', UsersController.updateUser)
// reset password, get profile and update profile
router.put('/api/users', UsersController.resetPassword)
router.put('/api/users/profile', UsersController.updateProfile)
router.get('/api/users/:id', UsersController.getProfile)

export default router