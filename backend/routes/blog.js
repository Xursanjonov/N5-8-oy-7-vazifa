import express from 'express'
import { Blog } from '../schema/blogSchema.js'
const blog = express.Router()
blog.use(express.json())

// GET blog
blog.get('/', async (req, res) => {
    try {
        const blog = await Blog.find()
        if (!blog.length) {
            return res.status(400).json({
                message: 'Blog topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        res.status(200).json({
            message: 'Barcha bloglar',
            variant: 'Success',
            payload: blog,
        })
    } catch {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// POST blog
blog.post('/', async (req, res) => {
    try {
        let { error } = validationBlog(req.body)
        console.log(error);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                variant: 'Error',
                payload: null,
            })
        }
        let newBlog = await Blog.create(req.body)
        res.status(201).json({
            message: "Yangi blog qo'shildi",
            variant: 'Success',
            payload: newBlog,
        })
    } catch (er) {
        res.status(500).json({
            message: 'Server error',
            variant: 'Error',
            payload: null,
        })
    }
})
// DELETE blog
blog.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(400).json({
                message: 'Blog topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Blog o`chirildi',
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
// PUT blog
blog.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(400).json({
                message: 'Blog topilmadi',
                variant: 'Warning',
                payload: null,
            })
        }
        await Blog.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            message: 'Blog o`zgartirildi',
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

export default blog