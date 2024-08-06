import moongoose from "mongoose";
import Joi from "joi";

const profileSchema = new moongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: false,
        default: ""
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    url: {
        type: Array,
        required: false,
        default: []
    },
    gender: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    budget: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: false,
    },
})
export const Profile = moongoose.model('newproject-profile', profileSchema)

export const validationProfile = (body) => {
    let schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().optional(""),
        username: Joi.string().min(3).max(18).required(),
        password: Joi.string().min(8).max(16).required(),
        age: Joi.number().optional(),
        url: Joi.array().optional(),
        gender: Joi.string(),
        isActive: Joi.boolean(),
        email: Joi.string(),
        budget: Joi.number().required(),
        role: Joi.string().optional(),
    })

    return schema.validate(body)
}