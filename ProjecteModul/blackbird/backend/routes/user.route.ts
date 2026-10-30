import express from "express"
import User from "../models/user.model"
const router = express.Router()

export default router

router.get('/', async(req, res) =>{
    let user = await User.query().select('userId', 'userName', 'avatar').findById(req.user.userId)
    res.json(user)
})






