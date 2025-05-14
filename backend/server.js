import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import mongoose from 'mongoose'
import {v2 as cloudinary} from 'cloudinary'
import usercontroller from './controllers/usercontroller.js'
import coursecontroller from './controllers/coursecontroller.js'
import batchcontroller from './controllers/batchcontroller.js'


const app=express()
dotenv.config()



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APIKEYSECRET  
})


app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

mongoose.connect(process.env.MONGO_URI)
console.log(process.env.MONGO_URI)

const port=process.env.PORT || 3000


app.use('/api/user',usercontroller)
app.use('/api/course',coursecontroller)
app.use('/api/batch',batchcontroller)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
