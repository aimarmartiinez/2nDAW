import { Router } from "express"
import db from '../engine/database'
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = Router()

export default router

router.get('/login', async(req, res) => {
    res.json("Hello from login")
})

router.post('/login', async(req, res) => {
    const {username, password} = req.body
    let user = await User.query().where('userName', username).first()
    const match = user ? await bcrypt.compare(password, user.hashPass) : false
    
    if(user && match){
        let info = {userId: user.userId}
        const token = jwt.sign(info, 's3cr3t,', {expiresIn: '1h'})
        res.json({token})                    
    } else {
        res.status(400).json("Wrong user or password")
    }
})

router.get('/register', async(req, res) => {
    res.json("Hello from register")
})

router.post('/register', async(req, res) => {
    try {
        const {fullname, username, password} = req.body
        
        // Validar que los campos requeridos existan
        if(!fullname || !username || !password) {
            return res.status(400).json({error: "Todos los campos son obligatorios"})
        }
        
        // Verificar si el usuario ya existe
        const existingUser = await User.query().where('userName', username).first()
        
        if(existingUser) {
            return res.status(400).json({error: "El usuario ya existe"})
        }
        
        // Hashear la contraseña
        const hashPass = await bcrypt.hash(password, 10)
        
        // Crear el nuevo usuario
        const newUser = await User.query().insert({
            fullName: fullname,
            userName: username,
            hashPass: hashPass,
            avatar: '' // Avatar por defecto vacío
        })
        
        // Generar token JWT
        let info = {userId: newUser.userId}
        const token = jwt.sign(info, 's3cr3t,', {expiresIn: '1h'})
        
        res.status(201).json({
            token,
            message: "Usuario registrado correctamente",
            user: {
                userId: newUser.userId,
                fullName: newUser.fullName,
                userName: newUser.userName
            }
        })
        
    } catch(error) {
        console.error("Error en el registro:", error)
        res.status(500).json({error: "Error al registrar el usuario"})
    }
})