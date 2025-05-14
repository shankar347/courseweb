import { Button, Flex, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import Courseslidemodel from './courseslidemodel'
import Mcqmodel from './mcqmodel'
import Mcqrestult from './mcqrestult'
import { skillcontext } from '../components/skillcontext'
import { useRecoilState, useRecoilValue } from 'recoil'
import lessonatom from '../atom/lessonatom'
import useratom from '../atom/useratom'

const Coursecontainer = () => {


   
   const {course}=useContext(skillcontext)
   // console.log(course)    
 
   const [currentslide,setcurrentlside]=useState(0)
   const [currentquestion,setcurrentquestion]=useState(0)
   const [showresult,setshowresult]=useState(false)
   // console.log(currentslide)
   const  {lessonindex,setlessonindex,
      selected,setselected,
      coursecompleted,setcoursecompleted
   }=useContext(skillcontext)
   // console.log(lessonindex) 
   const totalslides=course?.lesson[lessonindex]?.slides?.length  || 0
   const totalquestions=course?.lesson[lessonindex]?.test?.length || 0
   // console.log(selected)
   // console.log(currentslide,currentquestion)
   const [lessonstate,setlessonstate]=useRecoilState(lessonatom)

   // console.log(lessonstate)
  
   const handlenextslide=()=>{
      if (currentslide < totalslides - 1 )
         {
            setcurrentlside(currentslide+1)
         } 
         else if(currentslide === totalslides -1 && totalquestions > 0)
         {
            setcurrentlside(totalslides)
         }   
   }
//   console.log(currentquestion)

   const handletest=()=>{  
     if(currentquestion < totalquestions-1)
      {
         setcurrentquestion(currentquestion+1)
      } 
      else{
         setcurrentquestion(totalquestions)
         setshowresult(true)
      }
   }


   const {totalmarks,settotalmarks} =useContext(skillcontext)
    
   const user1=useRecoilValue(useratom)
   const user=user1?.token
   // console.log(user)
   console.log(totalmarks)

   const handlenextlesson=async()=>{
    try{
      
      const res=await fetch(`/api/user/mark/${user?._id}`,{
       method:'PUT',
       headers:{
         'content-type':'application/json'
       },
       body:JSON.stringify({totalmarks:totalmarks})
      })
      const data=await res.json()

      if(data?.error)
      {
         toast({
            description:data?.error,
            status:'error',
            duration:2000
         })
         return
      }




      setlessonindex(lessonindex+1)
      setcurrentlside(0)
      settotalmarks(0)
      setcurrentquestion(0)
      setshowresult(false)
      setlessonstate((prev)=>prev+20)
      localStorage.setItem('lesson',Number(lessonstate)+20)
     }
    catch(err)
    {
      console.log(err)
    }


  }


   //  console.log(lessonindex)

   const toast=useToast()
   const handlenext=()=>{
    
     
    
      if (currentslide < totalslides)
    {
      handlenextslide()
    }
    else{

      if(!selected)
      {
       toast({
         description:'Select any option',
         status:'error',
         duration:2000
       })
       return
      }
      handletest()
      setselected(false)
    }
   }

   return (
    <Flex flexDir={'column'}>
       <Flex 
       alignSelf={'center'}
       fontSize={'19px'}
    //    textAlign={'center'}
    fontWeight={'660'}
     color={'blue.700'}
     mt={'5'}
       >
        {course?.lesson[lessonindex]?.name}
       </Flex>
      
    {
       course?.lesson[lessonindex]?.slides?.map((slide,i)=>(
       i === currentslide &&  <Courseslidemodel key={i} slide={slide} /> 
       ))
    }

     {
      
      course?.lesson[lessonindex]?.test?.map((test,i)=>(
         i === currentquestion && currentslide === totalslides 
         && currentquestion !== totalquestions  
         && 
         <Mcqmodel test={test} key={i} index={i} /> 
      )) 
     }      
     
     {
      //  it have to come after last  question
       showresult &&  <Mcqrestult/>
     }

      {
         showresult ? 
         <Button 
         width={'32'}
         alignSelf={'center'}
         bg={'blue.500'}
         color={'white'}
         height={'45px'}
         mt={'16'}
         _hover={{
             bg: 'blue.600',
         }}
         mb={'5'}
         // isDisabled={currentslide === totalside}
         onClick={()=>handlenextlesson()}
         >
             Next Lesson
         </Button> 
         
         :
          <Button 
          width={'32'}
          alignSelf={'center'}
          bg={'blue.500'}
          color={'white'}
          height={'45px'}
          mt={'16'}
          _hover={{
              bg: 'blue.600',
          }}
          mb={'5'}
          // isDisabled={currentslide === totalside}
          onClick={handlenext}
          >
              Next
          </Button>
      }

    </Flex>
  )
}

export default Coursecontainer