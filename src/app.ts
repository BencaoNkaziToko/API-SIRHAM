import express from 'express'
import cors from 'cors'
import userRouter from './routes/User'
import categoryRouter from './routes/Category'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/category', categoryRouter)

export { app }
