import { Router } from "express"
import db from '../engine/database'
import Like from "../models/like.model"
import Post from "../models/post.model"

const router = Router()

export default router

// Dar like a un post
router.post('/', async (req, res) => {
    const { postId, userId } = req.body

    // Insertar like directamente
    const newLike = await Like.query().insertAndFetch({
        userId,
        postId,
        createdAt: new Date().toISOString()
    })

    // Actualizar contador de likes en posts
    const post = await Post.query().findById(postId)
    if (post) {
        await Post.query().findById(postId).patch({ likeCount: post.likeCount + 1 })
    }

    res.status(201).json(newLike)
})

// Quitar like
router.delete('/', async (req, res) => {
    const { postId, userId } = req.body

    // Borrar el like
    const deleted = await Like.query().delete().where({ userId, postId })

    // Actualizar contador de likes en posts
    const post = await Post.query().findById(postId)
    if (post && post.likeCount > 0) {
        await Post.query().findById(postId).patch({ likeCount: post.likeCount - 1 })
    }

    res.json({ deleted })
})

// Obtener likes de un post
router.get('/', async (req, res) => {
    const { postId } = req.query
    const likes = await Like.query().where({ postId: Number(postId) })
    res.json(likes)
})