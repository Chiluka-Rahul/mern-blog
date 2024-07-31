import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express()

mongoose.connect(process.env.MONGO_URL).then(
    () => {console.log('Database connected')}
)
.catch(
    (err) => {console.log(err)}
)

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('server connected')

})

app.use('/server/user', userRoutes)
app.use('/server/auth', authRoutes)
app.use('/server/post', postRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

