import express from 'express'
import Authuser from '../middlewares/authuser.js'
import { createbatch, getallbatch, getbachtoper, getbatch } from '../routes/batchroutes.js'

const router=express.Router()

router.post('/',Authuser,createbatch)
router.get('/',Authuser,getallbatch)
router.get('/:name',Authuser,getbatch)
router.get('/topper/:name',Authuser,getbachtoper)



export default router