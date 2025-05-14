import generatetoken from "../middlewares/createtoken.js"
import User from "../model/userschema.js"
import bcrpt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
import nodemailer from 'nodemailer'

const register=async(req,res)=>{
    try{
     const {email,phoneno,password,name,
        github,linkedin,
        programminglanguage,
        degree,
        college,
        experience,
        specialization,
     } =req.body

    let {internship,file:certificate,resume} =req.files
     console.log(email)
  

    const user=await User.findOne({email:email})

     if(user)
     {
        return res.json({error:"User is already existing"})
     }
    //  console.log(email,name,phoneno)
     let hashsalt=bcrpt.genSaltSync(10)

     let hashedpassword=bcrpt.hashSync(password,hashsalt)
    // console.log(internship,certificate,resume) 
    // console.log(internship === 'null' && resume === 'null'  && certificate === 'null')
    if(internship === 'null' || !internship  && resume === 'null'  || !resume && certificate === 'null' || !certificate) 
      {
     const newuser=new User({
         email,
         phoneno,
         name,
         password:hashedpassword,
         github,
         linkedin,
         programminglanguage,
         degree,
         college,
         experience,
         specialization,
     })

     await newuser.save()
     generatetoken(res,newuser._id)
     res.json(newuser)
    }
    else{
       
        internship=internship[0]
        certificate=certificate[0]
        resume=resume[0]
        console.log(internship
            ,resume,certificate
        )
        let resumeurl,certificateurl,internshiprule 
         
        const resumeresult=await new Promise((resolve,reject)=>{
          const uploadurl=cloudinary.uploader.upload_stream({
            resource_type:'raw',
            upload_preset:'public_uplload'
          },(err,result)=>{
            if(err)
            {
                reject({error:err?.message})
            }
            else{
                resolve(result)
            }
          }
        )
        streamifier.createReadStream(resume.buffer).pipe(uploadurl)  
        })

        const certiresult=await new Promise((resolve,reject)=>{
            const uploadurl=cloudinary.uploader.upload_stream({
              resource_type:'raw',
              upload_preset:'public_uplload'
            },(err,result)=>{
              if(err)
              {
                  reject(err)
              }
              else{
                  resolve(result)
              }
            }
          )
          streamifier.createReadStream(certificate.buffer).pipe(uploadurl)  
          })

          const internshipresult=await new Promise((resolve,reject)=>{
            const uploadurl=cloudinary.uploader.upload_stream({
              resource_type:'raw',
              upload_preset:'public_uplload'
            },(err,result)=>{
              if(err)
              {
                  reject(err)
              }
              else{
                  resolve(result)
              }
            }
          )
          streamifier.createReadStream(internship.buffer).pipe(uploadurl)  
          })

        resumeurl=resumeresult.secure_url
        certificateurl=certiresult.secure_url
        internshiprule=internshipresult.secure_url
        

        const newuser=new User({
            email,
            phoneno,
            name,
            password:hashedpassword,
            github,linkedin,
            programminglanguage,
            degree,
            college,
            experience,
            specialization,
            resume:resumeurl,
            certificate:certificateurl,
            internship:internshiprule
        })
    generatetoken(res,newuser._id)
     await newuser.save()
     res.json(newuser)  
    }

    
    }
    catch(err)
    {
        console.log(err)
    }
}

const login=async(req,res)=>{
    try{
     const {email,password} =req.body

     const user=await User.findOne({email:email})
 
     if (!user)
     {
      return res.json({error:"User is not found"})
     }
     const checkpassword=bcrpt.compareSync(password,user.password)
     if(!checkpassword)
     {
        return res.json({error:"Invalid password"})
     }
    
     generatetoken(res,user._id)
     res.json(user)
    }
    catch(err)
    {
        console.log(err)
    }
}

const updateuser=async(req,res)=>{
    try{
     const {phoneno,email,name,github,linkedin,course} = req.body
     
     const id =req.user._id

     const user=await User.findById(id)

     if(!user)
     {
      return res.json({error:"User is not found"})
     }

     if(phoneno)  user.phoneno = phoneno
     if(email) user.email = email
     if(name) user.name = name
     if(github) user.github = github
     if(linkedin) user.linkedin = linkedin
     if(course) user.course = course
     
     await user.save()

     res.json(user)
     
    }
    catch(err)
    {
        console.log(err)
    }
}

const logout=async(req,res)=>{
    try{
      res.clearCookie('token')
      res.json('User Loggedout')
    }
    catch(err)
    {
        console.log(err)
    }
}

const getalltrainers=async(req,res)=>{
   try{
     const trainers=await User.find({
        istrainer:true
     })

     res.json(trainers)
   }
   catch(err)
   {
    console.log(err)
   }
}


const updatepassword=async(req,res)=>{
  try{
    let {email,passwd} = req.body

    const user=await User.findOne({email:email})

    console.log('This is user details', user)

    if (!user)
    {
      return res.json({error:'User is not found'})
    }
    
    if (passwd)
    {
    let hassalt=bcrpt.genSaltSync(10)
    let hashedpassword=bcrpt.hashSync(passwd,hassalt)
    user.password = hashedpassword
    }
    
    await user.save()
    res.json(user)
  }
  catch(err)
  {
      console.log(err)
  }
}

const updatemark=async(req,res)=>{
  try{
   const {id} = req.params
   let {totalmarks} = req.body

   const user=await User.findById(id)
   
   totalmarks=Number(totalmarks)
  //  console.log(totalmarks)
   if(!user)
   {
    return res.json({error:"User is not found"})
   }
   user.totalmarks= user.totalmarks+ totalmarks
   
   await user.save()
   
   res.json(user)

  }
  catch(err)
  {
    console.log(err)
  }
}

const generateotp=async(req,res)=>{
    let {phoneno} =req.body
    try{
   
    
    
    let otp= Math.floor(10000+ Math.random() * 900000).toString()
    
    const transporter=  nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'sivaaadi96@gmail.com',
        pass:'xxmm tuxw jzml hlgs'
      }
    })
    
    const mailoptions={
      from:'sivaaadi96@gmail.com',
      to:phoneno,
      subject:'Your OTP code ',
      text:`Your OTP code for reset your password in skillPro  is 
      ${otp}`
    }
    // await  client.messages.create({
    //  body:`Your OTP is ${otp}`,
    //  from:'9363360016',
    //  to:`+91${phoneno}`
    // })
  
       transporter.sendMail(mailoptions,(error,info)=>{
        if (error) {
          console.log('Error: ', error);
        } else {
          console.log('Email sent: ', info.response);
        }
      })
  
    res.json(otp)
  
  }
    catch(err)
    {
      console.log(err)
    }
  }


const getcoursetoppers=async(req,res)=>{
    
    try{
     const {name}=req.params
     console.log(name)
     const students=await User.find({course:name})

     const topperstudents=students.sort((a,b)=>b.totalmarks -
     a.totalmarks
   )

    res.json(topperstudents)
     
    }
    catch(err)
    {
      console.log(err)
    }
  }


  const getcollgetoprs=async(req,res)=>{
    try{
      const {name} =req.params
     
      const students=await User.find({college:name})
     
      const topperstudents=students.sort((a,b)=>b.totalmarks -
      a.totalmarks
    )
  
      res.json(topperstudents)

    }
    catch(err)
    {
      console.log(err)
    }
  }

export {
    register,
    login,
    updateuser,
    logout,
    getalltrainers,
    generateotp,
    updatepassword,
    updatemark,
    getcollgetoprs,
    getcoursetoppers
}