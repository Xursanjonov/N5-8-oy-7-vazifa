import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: false,
            default: "",
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: false,
            default: 0,
        },
        url: {
            type: Array,
            required: false,
            default: "",
        },
        gender: {
            type: String,
            default: "male",
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true,
        },
        email: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin", "owner"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("newproject-users", userSchema);

export const validateUser = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().allow(""),
        username: Joi.string().required(),
        password: Joi.string().required(),
        age: Joi.number().allow(0),
        url: Joi.array().allow(""),
        gender: Joi.string().allow(""),
        isActive: Joi.boolean().allow(true),
        email: Joi.string().required(),
        budget: Joi.number().required(),
        role: Joi.string().valid("user", "admin", "owner").allow("user"),
    });
    return schema.validate(body);
};