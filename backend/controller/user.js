import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, validateUser } from "../schema/userSchema.js";

const JWT_SECRET = "Nusratilloh";

class UsersController {
    // reset password
    async resetPassword(req, res) {
        try {
            const id = req.admin._id
            const admin = await User.findOne({ _id: id });
            if (!admin) {
                return res.status(400).json({
                    msg: "Malumotlar topilmadi",
                    variant: "Warning",
                    payload: null
                });
            }
            const { password, newPassword } = req.body
            bcrypt.compare(password, admin.password, async (err, retults) => {
                if (retults) {
                    let hashedPassword = await bcrypt.hash(newPassword, 10);
                    let updateAdmin = User.findByIdAndUpdate(id, {
                        password: hashedPassword,
                        updatedAt: new Date().toISOString()
                    }, {
                        new: true
                    })
                    return res.status(200).json({
                        msg: "Parol o'zgartirildi",
                        variant: "success",
                        payload: updateAdmin
                    })
                } else {
                    return res.status(400).json({
                        msg: "Parol noto'g'ri",
                        variant: "error",
                        payload: null
                    })
                }
            })
        } catch (er) {
            return res.status(500).json({
                msg: er.message,
                variant: "error",
                payload: null
            });
        }
    }
    // update user or Profile
    async updateProfile(req, res) {
        try {
            const { id } = req.admin._id;
            let user = await User.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({
                msg: "Prodile updated",
                variant: "success",
                payload: user,
            })

        } catch (err) {
            res.status(500).json({
                msg: err.message,
                variant: "error",
                payload: null,
            });
        }
    }
    // GET Profile
    async getProfile(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            if (!user) return res.status(400).json({
                msg: 'User not found',
                variant: 'error',
                payload: null
            })
            const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
                expiresIn: "1h",
            })
            res.status(200).json({
                msg: "User fetched successfully",
                variant: "success",
                payload: { user, token },
            });
        } catch (err) {
            res.status(500).json({
                msg: err.message,
                variant: "error",
                payload: null,
            });
        }
    };
    // SIGN-UP user
    async registerUser(req, res) {
        try {
            const { error } = validateUser(req.body);
            if (error)
                return res.status(400).json({
                    msg: error.details[0].message,
                    variant: "error",
                    payload: null,
                });
            const { username, password } = req.body;
            const existingUser = await User.findOne({ username });
            if (existingUser)
                return res.status(400).json({
                    msg: "User already exists.",
                    variant: "error",
                    payload: null,
                });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                ...req.body,
                password: hashedPassword,
            });
            const role = user.role
            const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
                expiresIn: "1d",
            })
            res.status(201).json({
                msg: "User registered successfully",
                variant: "success",
                role,
                payload: { user, token },
            });
        } catch (err) {
            res.status(500).json({
                msg: err.message,
                variant: "error",
                payload: null,
            });
        }
    }
    // LOGIN user
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (user)
                return res.status(400).json({
                    msg: "User not found",
                    variant: "error",
                    payload: user,
                });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const isMatch = await bcrypt.compare(hashedPassword, user.password);
            if (!isMatch)
                return res.status(400).json({
                    msg: "Incorrect password",
                    variant: "error",
                    payload: { hashPass: hashedPassword, password: user.password },
                });
            const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(200).json({
                msg: "User logged in successfully",
                variant: "success",
                payload: { user, token },
            });
        } catch (err) {
            res.status(500).json({
                msg: err.message,
                variant: "error",
                payload: null,
            });
        }
    }
    // GET ALL USERS
    async getAllUsers(req, res) {
        try {
            const { limit, skip = 0 } = req.query;
            const users = await User.find().sort({ createdAt: 1 }).limit(limit).skip(skip * limit);
            const total = await User.countDocuments();
            res.status(200).json({
                msg: "Users fetched successfully",
                variant: "success",
                payload: users,
                total,
            });
        } catch (err) {
            res.status(500).json({
                msg: err.message,
                variant: "error",
                payload: null,
            });
        }
    };
    // UPDATE USER
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            let user = await User.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({
                msg: "user updated",
                variant: "success",
                payload: user,
            })

        } catch (err) {
            res.status(500).json({
                msg: err.message,
                variant: "error",
                payload: null,
            });
        }
    };

}

export default new UsersController();