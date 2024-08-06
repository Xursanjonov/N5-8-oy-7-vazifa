import mongoose from "mongoose";
import Joi from "joi";

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        default: 0
    }
})

export const Blog = mongoose.model('newproject-blog', blogschema)

export const validationBlog = (body) => {
    let schema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        usl:Joi.string().required(),
    })
    return schema.validate(body)
}