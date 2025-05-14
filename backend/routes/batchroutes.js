import batchmodel from "../model/batchschema.js"
import User from "../model/userschema.js"


const createbatch=async(req,res)=>{
    try{
        const userid=req.user._id
        const {coursename,name,email,phoneno} =req.body
      
      //  console.log(coursename)

        const batch=await batchmodel.findOne({coursename})
         
        const checkstudent = batch.batchstudents.findIndex((student)=>(
          student.email === email 
        ))

        if(checkstudent !== -1)
        {
          return res.json({error:"Email is already used"})
        }



        let randomnumber=Math.floor(Math.random() *1000) 
        if(!batch)
        {
         let newbatch =new batchmodel({
          coursename,
          name:coursename+randomnumber 
         })
         
         let batch={
          name:name,
          phoneno:phoneno,
          email:email,
          studentid:userid
         }
         newbatch.batchstudents.push(batch)
         
         await newbatch.save()
         
         res.json(newbatch)
        }
        else{
          if(batch.batchstudents.length < 30)
              {
                let student={
                  name:name,
                  phoneno:phoneno,
                  email:email,
                  studentid:userid
                 }
                 batch.batchstudents.push(student)
                await  batch.save()
                res.json(batch)
              }
          else{
            let newbatch = new batchmodel({
              coursename,
              name:coursename+randomnumber
            })
            let batch={
              name:name,
              phoneno:phoneno,
              email:email,
              studentid:userid
             }

            newbatch.batchstudents.push(batch)
            await newbatch.save()
            res.json(newbatch)  
          }   
        }
      }
      catch(err)
      {
          console.log(err)
      }
}

const getbatch=async(req,res)=>{
    try{

      const {name}=req.params
      const batch =await batchmodel.findOne({name})

      if(!batch)
      {
        return res.json({error:"Batch not found"})
      }

      res.json(batch)

    }
    catch(err)
    {
        console.log(err)
    }
}


const getbachtoper=async(req,res)=>{
  try{

    const {name}=req.params
    const batch =await batchmodel.findOne({name})

    if(!batch)
    {
      return res.json({error:"Batch not found"})
    }

    const studentids=batch.batchstudents.map((student)=>
    student.studentid
    )
    
    const batchstudent=await User.find({
      _id :{$in:studentids} 
    })
    
   let topperstudent= batchstudent.sort((a,b)=>b.totalmarks
  - a.totalmarks
  ) 


   res.json(topperstudent)

  }
  catch(err)
  {
      console.log(err)
  }
}


const coursetopper=async(req,res)=>{
  try{

  }
  catch(err)
  {
    console.log(err)
  }
}

const getallbatch=async(req,res)=>{
    try{

    }
    catch(err)
    {
        console.log(err)
    }
}


export {
    createbatch,
    getbatch,
    getallbatch,
    getbachtoper
}