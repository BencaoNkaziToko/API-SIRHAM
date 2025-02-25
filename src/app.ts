import express from 'express'
import cors from 'cors'
import userRouter from './routes/User'
import categoryRouter from './routes/Category'
import workDepartmentRouter from './routes/WorkDepartment'
import employeerRouter from './routes/Employeer'
import documentRouter from  './routes/Document'
import dismissalRouter from './routes/Dismissal'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/department', workDepartmentRouter)
app.use('/employeer', employeerRouter)
app.use('/document', documentRouter)
app.use('/dismissal', dismissalRouter)

export { app }
