import express from 'express'
import { generateotp, getalltrainers, getcollgetoprs, getcoursetoppers, logout, register
    , updatemark, updatepassword, updateuser } from '../routes/userroutes.js'

import Authuser from '../middlewares/authuser.js'
import { login } from '../routes/userroutes.js'
import multer from 'multer'


const router=express.Router()


const upload=multer({storage:multer.memoryStorage(),
    limits:{
            fileSize:1024*1024*15,
            fieldSize:1024*1024*15,
            fields:20 
    }
}).fields([
    {name:'file',maxCount:1},
    {name:'internship',maxCount:1},
    {name:'resume',maxCount:1}
])



const handlemulterupload=(req,res,next)=>{
    upload(req,res,(err)=>{
            if(err instanceof multer.MulterError){
               if(err.code === 'LIMIT_FILE_SIZE')
               {
                 return  res.status(200).json({error:'file size should be less than 15MB'})
               } 
               else if (err.code === 'LIMIT_FIELD_VALUE')
               {
                    return res.status(200).json({error:'file size should be less than 15MB'})
               }
               return res.status(400).json({error:err.message})
            }
            else if(err){
               return res.json({error: "Unknown error in uploading file"})
            }
            next()
    })
}


router.post('/register',handlemulterupload,register)
router.post('/login',login)
router.put('/',Authuser,updateuser)
router.get('/',logout)
router.get('/trainers',getalltrainers)
router.post('/otp',generateotp)
router.put('/passwd',updatepassword)
router.get('/course/topper/:name',getcoursetoppers)
router.get('/topper/:name',getcollgetoprs)
router.put('/mark/:id',Authuser,updatemark)



export default router
