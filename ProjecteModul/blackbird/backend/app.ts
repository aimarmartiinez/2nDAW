import 'express-async-errors'
import express, { ErrorRequestHandler } from 'express'
import userRoute from './routes/user.route'
import authRoute from './routes/auth.route'
import postRoute from './routes/posts.route'
import likeRoute from './routes/like.route'
import db from './engine/database'
import jwt from "jsonwebtoken"

const app = express()
db.start()
const port = process.env.PORT || 3100
const accessControlAllowOrigin = process.env.ALLOW_ORIGIN || '*'

app.use(express.json())
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', accessControlAllowOrigin)
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if(req.path.startsWith('/api/auth') || req.path == '/' || req.path == '/error'){    
  } else if (req.method != 'OPTIONS') {
    const token = req.headers.authorization
    if(!token) {
      res.sendStatus(401)
      return
    }
    
    try{
      const user = jwt.verify(token, 's3cr3t,')
      req.user = user
    }catch{{
      res.json("Expired token")
    }}
  }
  next()
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message);  
  }
  next() 
}

app.use(errorHandler);
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/like', likeRoute)
app.use('/error', (req, res) => {throw new Error('Some run wrong')})
app.use('/', (req, res) => {res.json("Welcome to oreneta api")})





app.listen(port, () => {
  console.log(`Listening backend in http://localhost:${port}`)
})