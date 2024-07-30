import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express()

mongoose.connect(process.env.MONGO_URL).then(
    () => {console.log('Database connected')}
)
.catch(
    (err) => {console.log(err)}
)

app.use(express.json());

app.listen(3000, () => {
    console.log('server connected')

})

app.use('/server/user', userRoutes)
app.use('/server/auth', authRoutes)

