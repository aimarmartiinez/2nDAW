import { Router } from "express"
import db from '../engine/database'
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Post from "../models/post.model"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import es from "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale(es);

const router = Router()

export default router

router.get('/', async (req, res) => {
    const posts = await Post.query().withGraphFetched('user').orderBy('createdAt', 'desc')
    
    const newFormatPosts = posts.map(post => ({
        id: post.postId, // ← CAMBIAR de post.id a post.postId
        avatar: post.user?.avatar,
        userName: post.user.userName,
        title: post.title,
        body: post.body,
        createdAt: dayjs(post.createdAt).fromNow(),
        comments: post.comments || []
    }));

    res.json(newFormatPosts)
})

router.get('/:id/comments', async(req, res) => {
    try {
        const post = await Post.query()
            .findById(req.params.id)
            .withGraphFetched('comments.user');
        
        if(post && post.comments) {
            res.json(post.comments);
        } else if(post) {
            res.json([]); 
        } else {
            res.status(404).json({ error: 'Post no encontrado' });
        }
    } catch (error: any) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Error del servidor', details: error.message });
    }
});



router.post('/', async (req, res) => {
    
    /*obtener los datos enviados*/
    let dataPost = req.body;

    /*crear nuevo post*/
    const newPost = await Post.query().insertAndFetch({
        userId: req.user.userId,
        title: dataPost.title,
        body: dataPost.body,
        createdAt: new Date().toISOString()
    });

    res.status(201).json(newPost);

});




