import express from 'express'
import Authuser from '../middlewares/authuser.js'
import { createcourse, createreport, deletecourse, generatepdf, getallcourse, getcourse, getcoursebyId, getusercourse, updatecourse, updaterating } from '../routes/courserotes.js'
import { updatemark } from '../routes/userroutes.js'

const router=express.Router()

router.post('/',Authuser,createcourse)
router.post('/report',Authuser,createreport)
router.get('/',Authuser,getallcourse)
router.post('/url',Authuser,getusercourse)
router.get('/report/:id',Authuser,generatepdf)
router.put('/:courseid/:id',Authuser,updaterating)
router.put('/:id',Authuser,updatecourse)
router.get('/:id',Authuser,getcoursebyId)
router.delete('/:id',Authuser,deletecourse)
router.get('/:name/:level',Authuser,getcourse)

export default router