import { Button, CloseButton, Flex, Image, Input, Select, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import courseatom from '../atom/courseatom'
import Courseinfomodel from './courseinfomodel'
import Coursecreateslide from './coursecreateslide'
import Coursecreateslide2 from './coursecreateslide2'
import Addmcqmodel from './addmcqmodel'
import { useNavigate } from 'react-router-dom'
import Coursestate from './coursestate'
import handleimage from '../hooks/handleimage'

const Addcourse = () => {

  const [coursestate,setcoursestate]=useRecoilState(courseatom)
  // console.log(coursestate)  
  const [loading,setloading]=useState(false)
  const toast=useToast()
  const navigate=useNavigate()
  const [title,settitle]=useState('')
  const [name,setname]=useState('')
  const [trainer,settrainer]=useState('')
  const [level,setlevel]=useState('')
  const [duration,setduration]=useState('')
  const {lessons,setlessons} = Coursestate()
  let maxcount=1000
  const [slideinfo,setslideinfo]=useState()
  const [truncated,settruncated]=useState(maxcount)
  console.log(lessons)
  const imgref=useRef(null)
 const {imgurl,setimgurl,handlechangeimage} =handleimage()
 const createcourse=async()=>{
  try{
    setloading(true)
    const res=await fetch('/api/course/',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        name:name,
        level:level,
        title:title,
        trainer:trainer,
        duration:duration,
        lesson:lessons,
        imgurl:imgurl
      })
    })
    const data=await res.json()
    console.log(data)
    if(data?.error)
    {
     toast({
      description:data?.error,
      status:'error',
      duration:2000
     }) 
     return
    }
    setcoursestate(1)
   navigate('/dashboard') 
  }
  catch(err)
  {
    console.log(err)
  }
  finally{
    setloading(false)
  }
 }

 const handlechangename=(e,number)=>{
  const newlessons=[...lessons]
  newlessons[number].name = e.target.value
  setlessons(newlessons)
 }


 const handleslidetitlechange=(e,number,slidenumber)=>{
  const newlessons=[...lessons]
  const newslides= [...newlessons[number].slides]
  newslides[slidenumber].title=e.target.value
  newlessons[number].slides=newslides
  setlessons(newlessons)
 }

 const handleslidecontentchange=(e,number,slidenumber)=>{
  let inputvalue=e.target.value
  if (inputvalue.length > maxcount)
  {
    let reamintext=inputvalue.slice(0,1000)
    const newlessons=[...lessons]
    const newslides= [...newlessons[number].slides]
    newslides[slidenumber].content=reamintext
    newlessons[number].slides=newslides
    settruncated(0)
    setlessons(newlessons)
  }
  else{
    const newlessons=[...lessons]
    const newslides= [...newlessons[number].slides]
    newslides[slidenumber].content=inputvalue
    newlessons[number].slides=newslides
    setlessons(newlessons)
    settruncated(maxcount - inputvalue.length)
  }
 }


 const handletestquestionchange=(e,number,questionnumber)=>{
   const newlesson=[...lessons]
   const newpage=[...newlesson[number].test]
   newpage[questionnumber].question = e.target.value
   newlesson[number].test=newpage
   setlessons(newlesson)
 } 

 const handletestanswerchange=(e,number,questionnumber)=>{
  const newlesson=[...lessons]
  const newpage=[...newlesson[number].test]
  newpage[questionnumber].answer = e.target.value
  newlesson[number].test=newpage
  setlessons(newlesson)
} 

const handletestoptionchange=(e,number,questionnumber,optionnumber)=>{
  const newlesson=[...lessons]
  const newpage=[...newlesson[number].test]
  const option=[...newpage[questionnumber].options]
  option[optionnumber].option = e.target.value
  newpage[questionnumber].options=option
  newlesson[number].test=newpage
  setlessons(newlesson)
}





  return (
     <Flex flexDir={'column'} >
      <Flex alignSelf={'center'}
      fontSize={'18'}
      fontWeight={'650'}
      color={'blue.600'}
      >
         Add course
      </Flex> 

     <Flex 
     flexDir={'column'}
     mx={'auto'}
     width={{
        md:'md',
        lg:'md',
        sm:'md',
        base:'90%'
     }}
     height={'auto'}
    //  bg={'green.400'}    
    mt={'5'}
  > 
    
    {
        coursestate === 1 && 
        <Flex 
        flexDir={'column'}
        gap={'0'}
        mt={'2'}
        mb={'6'}
        >
       <Flex 
         flexDir={'column'}
         gap={'1'}
         >
            <Text 
            fontSize={'15'}
            fontWeight={'650'}
            color={'blue.600'}
            >
                Name
            </Text>
            <Input
            value={name}
            onChange={(e)=>setname(e.target.value)}
            border={'3px solid'}
            borderColor={'gray.400'}
            />
         </Flex>
         <Flex 
         flexDir={'column'}
         mt={'3'}
         gap={'1'}
         >
            <Text 
            fontSize={'15'}
            fontWeight={'650'}
            color={'blue.600'}
            >
                Title
            </Text>
            <Input
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            border={'3px solid'}
            borderColor={'gray.400'}
            />
         </Flex>
          
        
         <Flex 
         flexDir={'column'}
         gap={'1'}
         mt={'5'}
         >
            <Text 
            fontSize={'15'}
            fontWeight={'650'}
            color={'blue.600'}
            >
             Trainer
            </Text>
            <Input
            value={trainer}
            onChange={(e)=>settrainer(e.target.value)}
            border={'3px solid'}
            borderColor={'gray.400'}
            />
         </Flex>
         <Flex 
         flexDir={'column'}
         gap={'1'}
         mt={'5'}
         >
            <Text 
            fontSize={'15'}
            fontWeight={'650'}
            color={'blue.600'}
            >
                Duration
            </Text>
            <Input
            value={duration}
            onChange={(e)=>setduration(e.target.value)}
            border={'3px solid'}
            borderColor={'gray.400'}
            />
         </Flex>
         <Flex 
         flexDir={'column'}
         gap={'1'}
         mt={'5'}
         >
            <Text 
            fontSize={'15'}
            fontWeight={'650'}
            color={'blue.600'}
            >
               Level
            </Text>
           <Select
            onChange={(e)=>setlevel(e.target.value)}
            border={'3px solid'}
            color={'gray.500'}
            borderColor={'gray.400'}
           >
            <option value="" selected disabled hidden
            //  style={{ color:'white' }}
            >
                Select level
              </option>
              <option value="beginner" style={{ color: 'black' }}>
                Beginner
              </option>
              <option value="intermediate" style={{ color: 'black' }}>
                Intermediate
              </option>
              <option value="advanced" style={{ color: 'black' }}>
                Advanced
              </option>
          
           </Select>
         </Flex>
    
        <Flex flexDir={'column'}
        position={'relative'}
        >
              <Input
        type='file'
        hidden
        ref={imgref}
        onChange={handlechangeimage}
        />
       {
        !imgurl && 
        <Button 
        width={'32'}
        alignSelf={'start'}
        bg={'red.400'}
        color={'white'}
        height={'45px'}
        mt={'3 '}
        _hover={{
            bg: 'blue.600',
        }}
        onClick={()=>imgref.current.click()}
        mb={2}
        >
             Upload Image
        </Button>  
       }      

         {
          imgurl && 
          <Image
          mt={'5'} 
           src={imgurl}
          />
         } 
       {
        imgurl && 
        <CloseButton position={'absolute'}
        bg={'gray.400'}
        right={'2'}
        top={'10'}
        onClick={()=>setimgurl(null)}
        />
       }
 
        </Flex>
        </Flex>
    }
    


  {
    coursestate === 2 && 
    <Coursecreateslide 
    lessonname={lessons[0]?.name}
    setlessonname={handlechangename}
    slidetitle={lessons[0]?.slides[0]?.title}
    slidecontent={lessons[0]?.slides[0]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={0}
    slidenumber={0}
    maxcount={maxcount}
    truncated={truncated}
    />
  }

{
    coursestate === 3 && 
    <Flex flexDir={'column'}
    gap={''}
    >
    <Coursecreateslide2 
      slidenumber={1}
      slidetitle={lessons[0]?.slides[1]?.title}
      slidecontent={lessons[0]?.slides[1]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={0}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2 
    slidenumber={2}
    slidetitle={lessons[0]?.slides[2]?.title}
    slidecontent={lessons[0]?.slides[2]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={0}
    maxcount={maxcount}
    truncated={truncated} 
   /> 
    </Flex>
}

{
    coursestate === 4 && 
    <Flex flexDir={'column'}
    gap={''}
    >
    <Coursecreateslide2 
      slidenumber={3}
      slidetitle={lessons[0]?.slides[3]?.title}
      slidecontent={lessons[0]?.slides[3]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={0}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2  
     slidenumber={4}
     slidetitle={lessons[0]?.slides[4]?.title}
     slidecontent={lessons[0]?.slides[4]?.content}
     setslidecontent={handleslidecontentchange}
     setslidetitle={handleslidetitlechange}
     lessonnumber={0}
     maxcount={maxcount}
     truncated={truncated}
    /> 
    </Flex>
}  


{
 coursestate === 5 && <Addmcqmodel 
 lessonnumber={0}
 questionnumber={0}
 answer={lessons[0].test[0].answer}
 setanswer={handletestanswerchange}
 option={lessons[0].test[0].options}
 setoption={handletestoptionchange}
 question={lessons[0].test[0].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 6 && <Addmcqmodel 
 lessonnumber={0}
 questionnumber={1}
 answer={lessons[0].test[1].answer}
 setanswer={handletestanswerchange}
 option={lessons[0].test[1].options}
 setoption={handletestoptionchange}
 question={lessons[0].test[1].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 7 && <Addmcqmodel 
 lessonnumber={0}
 questionnumber={2}
 answer={lessons[0].test[2].answer}
 setanswer={handletestanswerchange}
 option={lessons[0].test[2].options}
 setoption={handletestoptionchange}
 question={lessons[0].test[2].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 8 && <Addmcqmodel 
 lessonnumber={0}
 questionnumber={3}
 answer={lessons[0].test[3].answer}
 setanswer={handletestanswerchange}
 option={lessons[0].test[3].options}
 setoption={handletestoptionchange}
 question={lessons[0].test[3].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 9 && <Addmcqmodel 
 lessonnumber={0}
 questionnumber={4}
 answer={lessons[0].test[4].answer}
 setanswer={handletestanswerchange}
 option={lessons[0].test[4].options}
 setoption={handletestoptionchange}
 question={lessons[0].test[4].question}
 setquestion={handletestquestionchange}
 />
}


{
    coursestate === 10 && 
    <Coursecreateslide 
    lessonname={lessons[1]?.name}
    setlessonname={handlechangename}
    slidetitle={lessons[1]?.slides[0]?.title}
    slidecontent={lessons[1]?.slides[0]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={1}
    slidenumber={0}
    maxcount={maxcount}
    truncated={truncated}
    />
  }


{
    coursestate === 11 && 
    <Flex flexDir={'column'}
    gap={''}
    >
    <Coursecreateslide2 
          slidenumber={1}
          slidetitle={lessons[1]?.slides[1]?.title}
          slidecontent={lessons[1]?.slides[1]?.content}
          setslidecontent={handleslidecontentchange}
          setslidetitle={handleslidetitlechange}
          lessonnumber={1}
          maxcount={maxcount}
          truncated={truncated}
    />
    <Coursecreateslide2 
          slidenumber={2}
          slidetitle={lessons[1]?.slides[2]?.title}
          slidecontent={lessons[1]?.slides[2]?.content}
          setslidecontent={handleslidecontentchange}
          setslidetitle={handleslidetitlechange}
          lessonnumber={1}
          maxcount={maxcount}
          truncated={truncated}
    /> 
    </Flex>
}

{
    coursestate === 12 && 
    <Flex flexDir={'column'}
    gap={''}
    >
    <Coursecreateslide2 
      slidenumber={3}
      slidetitle={lessons[1]?.slides[3]?.title}
      slidecontent={lessons[1]?.slides[3]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={1}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2  
     slidenumber={4}
     slidetitle={lessons[1]?.slides[4]?.title}
     slidecontent={lessons[1]?.slides[4]?.content}
     setslidecontent={handleslidecontentchange}
     setslidetitle={handleslidetitlechange}
     lessonnumber={1}
     maxcount={maxcount}
     truncated={truncated}
    /> 
    </Flex>
}  

{
 coursestate === 13 && <Addmcqmodel 
 lessonnumber={1}
 questionnumber={0}
 answer={lessons[1].test[0].answer}
 setanswer={handletestanswerchange}
 option={lessons[1].test[0].options}
 setoption={handletestoptionchange}
 question={lessons[1].test[0].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 14 && <Addmcqmodel 
 lessonnumber={1}
 questionnumber={1}
 answer={lessons[1].test[1].answer}
 setanswer={handletestanswerchange}
 option={lessons[1].test[1].options}
 setoption={handletestoptionchange}
 question={lessons[1].test[1].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 15 && <Addmcqmodel 
 lessonnumber={1}
 questionnumber={2}
 answer={lessons[1].test[2].answer}
 setanswer={handletestanswerchange}
 option={lessons[1].test[2].options}
 setoption={handletestoptionchange}
 question={lessons[1].test[2].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 13 && <Addmcqmodel 
 lessonnumber={1}
 questionnumber={3}
 answer={lessons[1].test[3].answer}
 setanswer={handletestanswerchange}
 option={lessons[1].test[3].options}
 setoption={handletestoptionchange}
 question={lessons[1].test[3].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 13 && <Addmcqmodel 
 lessonnumber={1}
 questionnumber={4}
 answer={lessons[1].test[4].answer}
 setanswer={handletestanswerchange}
 option={lessons[1].test[4].options}
 setoption={handletestoptionchange}
 question={lessons[1].test[4].question}
 setquestion={handletestquestionchange}
 />
}

{
    coursestate === 14 && 
    <Coursecreateslide 
    lessonname={lessons[2]?.name}
    setlessonname={handlechangename}
    slidetitle={lessons[2]?.slides[0]?.title}
    slidecontent={lessons[2]?.slides[0]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={2}
    slidenumber={0}
    maxcount={maxcount}
    truncated={truncated}
    />
  }

{
    coursestate === 15 && 
    <Flex flexDir={'column'}
    gap={''}
    >
   <Coursecreateslide2 
      slidenumber={1}
      slidetitle={lessons[2]?.slides[1]?.title}
      slidecontent={lessons[2]?.slides[1]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={2}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2 
    slidenumber={2}
    slidetitle={lessons[2]?.slides[2]?.title}
    slidecontent={lessons[2]?.slides[2]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={2}
    maxcount={maxcount}
    truncated={truncated} 
   /> 
    </Flex>
}

{
    coursestate === 16 && 
    <Flex flexDir={'column'}
    gap={''}
    >
     <Coursecreateslide2 
      slidenumber={3}
      slidetitle={lessons[2]?.slides[3]?.title}
      slidecontent={lessons[2]?.slides[3]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={2}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2  
     slidenumber={4}
     slidetitle={lessons[2]?.slides[4]?.title}
     slidecontent={lessons[2]?.slides[4]?.content}
     setslidecontent={handleslidecontentchange}
     setslidetitle={handleslidetitlechange}
     lessonnumber={2}
     maxcount={maxcount}
     truncated={truncated}
    /> 
    </Flex>
}  

{
 coursestate === 17 && <Addmcqmodel 
 lessonnumber={2}
 questionnumber={0}
 answer={lessons[2].test[0].answer}
 setanswer={handletestanswerchange}
 option={lessons[2].test[0].options}
 setoption={handletestoptionchange}
 question={lessons[2].test[0].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 18 && <Addmcqmodel 
 lessonnumber={2}
 questionnumber={1}
 answer={lessons[2].test[1].answer}
 setanswer={handletestanswerchange}
 option={lessons[2].test[1].options}
 setoption={handletestoptionchange}
 question={lessons[2].test[1].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 19 && <Addmcqmodel 
 lessonnumber={2}
 questionnumber={2}
 answer={lessons[2].test[2].answer}
 setanswer={handletestanswerchange}
 option={lessons[2].test[2].options}
 setoption={handletestoptionchange}
 question={lessons[2].test[2].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 20 && <Addmcqmodel 
 lessonnumber={2}
 questionnumber={3}
 answer={lessons[2].test[3].answer}
 setanswer={handletestanswerchange}
 option={lessons[2].test[3].options}
 setoption={handletestoptionchange}
 question={lessons[2].test[3].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 21 && <Addmcqmodel 
 lessonnumber={2}
 questionnumber={4}
 answer={lessons[2].test[4].answer}
 setanswer={handletestanswerchange}
 option={lessons[2].test[4].options}
 setoption={handletestoptionchange}
 question={lessons[2].test[4].question}
 setquestion={handletestquestionchange}
 />
}


{
    coursestate === 22 && 
    <Coursecreateslide 
    lessonname={lessons[3]?.name}
    setlessonname={handlechangename}
    slidetitle={lessons[3]?.slides[0]?.title}
    slidecontent={lessons[3]?.slides[0]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={3}
    slidenumber={0}
    maxcount={maxcount}
    truncated={truncated}
    />
  }


{
    coursestate === 23 && 
    <Flex flexDir={'column'}
    gap={''}
    >
   <Coursecreateslide2 
      slidenumber={1}
      slidetitle={lessons[3]?.slides[1]?.title}
      slidecontent={lessons[3]?.slides[1]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={3}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2 
    slidenumber={2}
    slidetitle={lessons[3]?.slides[2]?.title}
    slidecontent={lessons[3]?.slides[2]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={3}
    maxcount={maxcount}
    truncated={truncated} 
   /> 
    </Flex>
}

{
    coursestate === 24 && 
    <Flex flexDir={'column'}
    gap={''}
    >
    <Coursecreateslide2 
      slidenumber={3}
      slidetitle={lessons[3]?.slides[3]?.title}
      slidecontent={lessons[3]?.slides[3]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={3}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2  
     slidenumber={4}
     slidetitle={lessons[3]?.slides[4]?.title}
     slidecontent={lessons[3]?.slides[4]?.content}
     setslidecontent={handleslidecontentchange}
     setslidetitle={handleslidetitlechange}
     lessonnumber={3}
     maxcount={maxcount}
     truncated={truncated}
    /> 
    </Flex>
}  


{
 coursestate === 25 && <Addmcqmodel 
 lessonnumber={3}
 questionnumber={0}
 answer={lessons[3].test[0].answer}
 setanswer={handletestanswerchange}
 option={lessons[3].test[0].options}
 setoption={handletestoptionchange}
 question={lessons[3].test[0].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 26 && <Addmcqmodel 
 lessonnumber={3}
 questionnumber={1}
 answer={lessons[3].test[1].answer}
 setanswer={handletestanswerchange}
 option={lessons[3].test[1].options}
 setoption={handletestoptionchange}
 question={lessons[3].test[1].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 27 && <Addmcqmodel 
 lessonnumber={3}
 questionnumber={2}
 answer={lessons[3].test[2].answer}
 setanswer={handletestanswerchange}
 option={lessons[3].test[2].options}
 setoption={handletestoptionchange}
 question={lessons[3].test[2].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 28 && <Addmcqmodel 
 lessonnumber={3}
 questionnumber={3}
 answer={lessons[3].test[3].answer}
 setanswer={handletestanswerchange}
 option={lessons[3].test[3].options}
 setoption={handletestoptionchange}
 question={lessons[3].test[3].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 29 && <Addmcqmodel 
 lessonnumber={3}
 questionnumber={0}
 answer={lessons[3].test[4].answer}
 setanswer={handletestanswerchange}
 option={lessons[3].test[4].options}
 setoption={handletestoptionchange}
 question={lessons[3].test[4].question}
 setquestion={handletestquestionchange}
 />
}

{
    coursestate === 30 && 
    <Coursecreateslide 
    lessonname={lessons[4]?.name}
    setlessonname={handlechangename}
    slidetitle={lessons[4]?.slides[0]?.title}
    slidecontent={lessons[4]?.slides[0]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={4}
    slidenumber={0}
    maxcount={maxcount}
    truncated={truncated}
    />
  }

{
    coursestate === 31 && 
    <Flex flexDir={'column'}
    gap={''}
    >
     <Coursecreateslide2 
      slidenumber={1}
      slidetitle={lessons[4]?.slides[1]?.title}
      slidecontent={lessons[4]?.slides[1]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={4}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2 
    slidenumber={2}
    slidetitle={lessons[4]?.slides[2]?.title}
    slidecontent={lessons[4]?.slides[2]?.content}
    setslidecontent={handleslidecontentchange}
    setslidetitle={handleslidetitlechange}
    lessonnumber={4}
    maxcount={maxcount}
    truncated={truncated} 
   /> 
    </Flex>
}

{
    coursestate === 32 && 
    <Flex flexDir={'column'}
    gap={''}
    >
  <Coursecreateslide2 
      slidenumber={3}
      slidetitle={lessons[4]?.slides[3]?.title}
      slidecontent={lessons[4]?.slides[3]?.content}
      setslidecontent={handleslidecontentchange}
      setslidetitle={handleslidetitlechange}
      lessonnumber={4}
      maxcount={maxcount}
      truncated={truncated}
    />
    <Coursecreateslide2  
     slidenumber={4}
     slidetitle={lessons[4]?.slides[4]?.title}
     slidecontent={lessons[4]?.slides[4]?.content}
     setslidecontent={handleslidecontentchange}
     setslidetitle={handleslidetitlechange}
     lessonnumber={4}
     maxcount={maxcount}
     truncated={truncated}
    /> 
    </Flex>
}  

{
 coursestate === 33 && <Addmcqmodel 
 lessonnumber={4}
 questionnumber={0}
 answer={lessons[4].test[0].answer}
 setanswer={handletestanswerchange}
 option={lessons[4].test[0].options}
 setoption={handletestoptionchange}
 question={lessons[4].test[0].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 34 && <Addmcqmodel 
 lessonnumber={4}
 questionnumber={1}
 answer={lessons[4].test[1].answer}
 setanswer={handletestanswerchange}
 option={lessons[4].test[1].options}
 setoption={handletestoptionchange}
 question={lessons[4].test[1].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 35 && <Addmcqmodel 
 lessonnumber={4}
 questionnumber={2}
 answer={lessons[4].test[2].answer}
 setanswer={handletestanswerchange}
 option={lessons[4].test[2].options}
 setoption={handletestoptionchange}
 question={lessons[4].test[2].question}
 setquestion={handletestquestionchange}
 />
}


{
 coursestate === 36 && <Addmcqmodel 
 lessonnumber={4}
 questionnumber={3}
 answer={lessons[4].test[3].answer}
 setanswer={handletestanswerchange}
 option={lessons[4].test[3].options}
 setoption={handletestoptionchange}
 question={lessons[4].test[3].question}
 setquestion={handletestquestionchange}
 />
}

{
 coursestate === 37 && <Addmcqmodel 
 lessonnumber={4}
 questionnumber={4}
 answer={lessons[4].test[4].answer}
 setanswer={handletestanswerchange}
 option={lessons[4].test[4].options}
 setoption={handletestoptionchange}
 question={lessons[4].test[4].question}
 setquestion={handletestquestionchange}
 />
}



   {
    coursestate !== 37 ? 
    <Button 
    width={'32'}
    alignSelf={'center'}
    bg={'blue.500'}
    color={'white'}
    height={'45px'}
    mt={'5'}
    _hover={{
        bg: 'blue.600',
    }}
    onClick={()=>
        setcoursestate((prevstate)=>prevstate+1)
    }
    mb={2}
    >
         Next
    </Button> : 
     <Button 
     width={'32'}
     alignSelf={'center'}
     bg={'blue.500'}
     color={'white'}
     height={'45px'}
     mt={'5'}
     _hover={{
         bg: 'blue.600',
     }}
     onClick={createcourse}
     mb={2}
     >
        {loading ? <Spinner/> : 'Submit'}
     </Button>
   }

     {
        coursestate !== 1 &&
         <Text 
        //  width={'32'}
         alignSelf={'center'}
         color={'red.500'}
        //  color={'white'}
        //  height={'45px'}
         mt={'1'}
         fontSize={'14px'}
         fontWeight={'650'}
         _hover={{
             color: 'red.300',
             textDecoration:'underline'
         }}
         onClick={()=>
           setcoursestate((prev)=>prev-1)
         }
         mb={4}
         >
              Back
         </Text>
     }

     </Flex>
     </Flex>
  )
}

export default Addcourse