

import dotenv from 'dotenv'
import fetch from 'node-fetch'
import coursemodel from '../model/courseschema.js'
import reportmodel from '../model/reportschema.js'
import pdfdocument from 'pdfkit'
import {v2 as cloudinary} from 'cloudinary'
// import pdfparse from 'pdf-parse'
import pkg from 'pdfjs-dist'
// import openai from 

dotenv.config()

// console.log(process.env.HUGGINFACE_API)


import {OpenAI} from 'openai'


// const openai=new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// })



const {getDocument} =pkg

dotenv.config()




const getusercourse=async(req,res)=>{
  try{
    const {url} =req.body
    // console.log(url)
    const response=await fetch(url)
   
    if(!response.ok)
    {
      return res.json({error:"Error in fetching Info from file"})
    }

    const filebuffer=Buffer.from(await response.arrayBuffer())
   
    
    const filetext=await extractresumedata(filebuffer)
    // let filetext='It is check'
    console.log(checkcertificate(filetext))
    if(!checkcertificate(filetext))
    {
      return res.json({error:"Uploaded file is not a certificate"})
    }

    const coursename=analysetext(filetext)

    res.json(coursename)
    
  }
  catch(err)
  {
    console.log(err)
  }
}


const checkcertificate=(text)=>{
  
  const certificateKeywords = [
    'Certificate', 'Awarded to', 'This certifies that', 
    'Completion', 'Date', 'has completed', 'Presented to',
    'Authorized signature', 'Issued on'
   ];

  const lowercast=text.toLowerCase()

  return certificateKeywords.some(keyword => lowercast.includes(keyword.toLowerCase()))

}

const analysetext=(text)=>{
  
  const courseMapping = {
    'aws': 'Java',
    'java': 'Java',
    'azure': '.NET',
    '.net': '.NET',
    'python': 'Data Engineering'
}

 const lowercast=text.toLowerCase()

 for (const [keyword,course] of Object.entries(courseMapping))
   {
    if(lowercast.includes(keyword))
    {
      return course
    }
   }

   return null

}


const extractresumedata=async(fileBuffer)=>{

  try{
    const loadingTask = getDocument({ data: fileBuffer });
    const pdfDocument = await loadingTask.promise;

    let textContent = '';

    for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();
        content.items.forEach(item => {
            textContent += item.str + ' '; 
        });
    }
    return textContent.trim()
  }
  catch(err)
  {
    console.log(err)
  }
  
}





const createcourse=async(req,res)=>{
    try{
      const {name,trainer,duration,lesson,level,title} =req.body

      let {imgurl}=req.body

      // console.log(lesson)
      
      
      if(imgurl)
        {
          const uploadurl=  await cloudinary.uploader.upload(imgurl)
          imgurl=uploadurl.secure_url;
        }

      const course=new coursemodel({
        name,
        trainer,
        duration,
        level,
        img:imgurl,
        lesson,
        title:title
      })
    
      await course.save()

      res.json(course)

    }
    catch(err)
    {
        console.log(err)
    }
}


const getcourse=async(req,res)=>{
    try{
      const {name,level} =req.params 
     
      const course=await coursemodel.findOne({
      name,level
      })

      if(!course)
      {
        return res.json({error:"Course is not found"})
      }
      res.json(course)

    }
    catch(err)
    {
        console.log(err)
    }
}

const getallcourse=async(req,res)=>{
    try{
      const courses=await coursemodel.find({})

      res.json(courses)
    }
    catch(err)
    {
        console.log(err)
    }
}



const createreport=async(req,res)=>{
   try{
    

    const {username,email,degree,level,coursetitle,
       totalmarks,college
    } =req.body
    
  //  let date=new Date().getUTCFullYear()

  const userid=req.user._id
  

  // const checkreport=await reportmodel.findOne({userid})

  // if(checkreport)
  // {
  //   return res.json({error:"Report already exists"})
  // }


  let recomednationlevel;

  if(totalmarks >=20 && 25>=totalmarks)
  {
   recomednationlevel='advanced'
  }

  else if(totalmarks>=19 && 10>=totalmarks)
  {
    recomednationlevel='intermediate'
  }

  else{
    recomednationlevel='beginner'
  }
  

  //  let prompt= `Provide 3 concise learning topics for a ${recomednationlevel} student in the course titled "${coursetitle}". Each topic should be clearly stated in one sentence.`
  let prompt = `As a ${recomednationlevel} student in the course titled "${coursetitle}", provide 3 specific topics relevant to this course that I should study. Each topic should be suitable for a ${recomednationlevel} student and should be clearly stated. Provide just the topics without any additional explanation.`;
  // let prompt = `As a ${recomednationlevel} student in the course titled "${coursetitle}", list 3 specific topics I should study. Ensure the response only includes the topics, with no additional explanations or instructions.`;



    // const response = await openai.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     prompt:,
    //     max_tokens: 150,
    //   });
   
    const response=await fetch('https://api-inference.huggingface.co/models/gpt2',{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINFACE_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    })
    
    const formateddate=(date)=>{
      let year=date.getFullYear()
      let day=String(date.getDate()).padStart(2,'0')
      let month=String(date.getMonth()+1).padStart(2,'0')
      return `${day}-${month}-${year}`
    }  
   
    const data=await response.json()
    //  console.log(data) 



     
    const extractTopics = (text) => {
      const sentences = text.split('.');
      const topics = sentences.filter(sentence => {
        const trimmedSentence = sentence.trim();
        return trimmedSentence && 
          !trimmedSentence.toLowerCase().includes('level') && 
          !trimmedSentence.toLowerCase().includes('resources') && 
          !trimmedSentence.toLowerCase().includes('advanced') && 
          !trimmedSentence.toLowerCase().includes('ideas') &&
          !trimmedSentence.toLowerCase().includes('lessons') && 
          !trimmedSentence.toLowerCase().includes('provide') && 
          !trimmedSentence.toLowerCase().includes('specific topics') &&
          !trimmedSentence.toLowerCase().includes('that i should study') &&
          !/\d/.test(trimmedSentence);
      });
      return topics.map(topic => topic.trim().replace(/\"/g, ''));
    };
    
    
    


     let report=data[0]?.generated_text?.trim() 
 
     
 
     report=extractTopics(report) 

     console.log(report)
     let date=new Date()
     const formatteddate=formateddate(date)


   const newreport=new reportmodel({
     username,
     email,
     degree,
     level,
     userid,
     coursetitle,
     totalmarks,
     report,
     college,
     date:formatteddate
   })
   
   
    
    await newreport.save()

   res.json(newreport)
   }
   catch(err)
   {
    console.log(err)
   }
}


const generatepdf=async(req,res)=>{
    try{
    

    const {id}=req.params

    const   report=await reportmodel.findById(id)

    if(!report)

      {
        return res.json({error:"Report is not found"})   
      }



   
      const doc=new pdfdocument()
        
     
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
     
      doc.pipe(res)
  
    doc.fontSize(18).text('Training Report', { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(14).text(`${report?.date}`,{align:'right'})

    const userDetails = [
      { label: 'Name', value: report.username },
      { label: 'Email', value: report.email },
      { label: 'College', value: report.college },
      { label: 'Degree', value: report.degree },
      { label: 'Total Marks', value: report.totalmarks },
      { label: 'Title', value: report.coursetitle },
    ]


    userDetails.forEach(detail => {
      doc.fontSize(14).text(`${detail.label}: `, { continued: true });
      doc.fontSize(14).text(detail.value);
      doc.moveDown(0.5);
    });



    doc.moveDown(1);
    doc.fontSize(16).text('Topic Recommendations', { underline: true });
    doc.moveDown(1);

    report.report.forEach((topic, i) => {
      doc.fontSize(12).text(`• ${topic}`, { align: 'left' });
      doc.moveDown(0.5);
    });

    

    doc.end()
   
    }
    catch(err)
    {
        console.log(err)
    }
}


const getcoursebyId=async(req,res)=>{
  try{
    const {id}=req.params
    const course=await coursemodel.findById(id)

    if(!course)
    {
      return  res.json({error:"Course is not found"})
    }
    res.json(course)

  }
  catch(err)
  {
    console.log(err)
  }
}

const updatecourse=async(req,res)=>{
  try{
    const {title,trainer,duration,lesson,level,
      name
    } =req.body
    // console.log(title,trainer)
     let {imgurl}=req.body
     const {id}=req.params
     const course=await coursemodel.findById(id)
    //  console.log(course.title)
     if(!course)
     {
      return res.json({error:'Course is not found'})
     }

     if(name) course.name = name 
     if(trainer) course.trainer= trainer
     if(duration) course.duration = duration
     if (lesson)  course.lesson =lesson
     if(level) course.level = level
     if(title) course.title = title

     if(imgurl)
     {
      if(course.img)
      {
        await cloudinary.uploader.
        destroy(course.img.split('/').pop().split('.')[0])
      }
      const uploadres=await cloudinary.uploader.upload(imgurl)
      imgurl=uploadres.secure_url
     course.img = imgurl  
     } 
    
    await course.save()
    
    res.json(course)


  }

  catch(err)
  {
    console.log(err)
  }
}


const deletecourse=async(req,res)=>{
  try{
    const {id}=req.params
    const course=await coursemodel.findById(id)

    if(!course)
    {
      return res.json({error:'Course is not found'})
    }
    await coursemodel.findByIdAndDelete(course._id)

    res.json('Course deleted')

  }
  catch(err)
  {
    console.log(err)
  }
}


const updaterating=async(req,res)=>{
  try{
   const {courseid} = req.params
   const {id} = req.params
   let {rating}=req.body

   const course=await coursemodel.findById(courseid)
   
   if(!course)
   {
    return res.json({error:"Course not found"})
   }
   
   let selectedlesson=course.lesson.find((lesson)=>
   lesson._id.toString() === id.toString()
  )
  console.log(selectedlesson)

  if(!selectedlesson)
  {
    return res.json({error:"Lesson not found"})
  }

  rating=Number(rating)

  selectedlesson.rating =Number(selectedlesson.rating) -  rating


  await course.save()

  res.json(course)
  
  }
  catch(err)
  {
    console.log(err)
  }
}



export {
    createcourse,
    getallcourse,
    getcourse,
    createreport,
    getcoursebyId,
    updatecourse,
    deletecourse,
    getusercourse,
    generatepdf,
    updaterating
}
