import React, { useContext } from 'react'
import logoimg from '../../assets/logo1.png'
import { Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { skillcontext } from '../components/skillcontext'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import usercourseatom from '../atom/usercourseatom'
import lessonatom from '../atom/lessonatom'


const Coursenavmodel = () => {

    const {setsidebaractive}=useContext(skillcontext) 
    const navigate=useNavigate()
    const {isenrolled,lessonindex,setlessonindex}=useContext(skillcontext)
    const user1=useRecoilValue(useratom)
    const user=user1?.token
   const toast=useToast()
   const {course}=useContext(skillcontext)
  //  console.log(course)
   let lessonstate=useRecoilValue(lessonatom)
   const usercourse=useRecoilValue(usercourseatom)
  //  console.log(usercourse) 

   console.log(lessonstate)

   const handlenavbar=(lessonid,index)=>{
    console.log(isenrolled)

    let lessonstatevalues=[20,40,60,80,100]
   
    let currentlessonstate=lessonstatevalues[index]
    lessonstate = Number(lessonstate)

    // console.log(currentlessonstate) 
    // console.log(lessonstate === 20)
    if(lessonstate === currentlessonstate)
    {
      toast({
        description:`Lesson ${index+1}  already completed`,
        status:'info',
        duration:2000
      })
      return
    } 
    

    navigate(`/courses/${lessonid}/lessons`)
    setlessonindex(index)
   //  console.log(index)
    setsidebaractive(false)   

   }

   return (
    <Flex 
    flexDir={'column'}
    alignItems={'center'}
    position={'absolute'}
    height={'100%'}
    my={'0 '}
    gap={'0'}
    justify={'space-between'}
    pt={'2'}
    // className='navbar'
    // bg={'blue.700'}
    zIndex={'3'}
    right={'0'}
    // top={'0'}
    color={'gray'}
    backdropFilter={'blur(5px)'}
    boxShadow={'0px 0px 27px 0px '}
    borderRadius={'2px'}
    background={'rgba(110, 166, 255, 0.77)'}
    width={'100%'}
    >
  <Flex flexDir={'column'}
  width={'full'}
  gap={'7px'}
  fontSize={'14px'}
  >
  <Flex 
  width={'full'}
  justify={'center'}
  alignItems={'center'}
  alignSelf={'center'}
  textAlign={'center'}
  color={'white'}
  height={'35px'}
  pt={'15px'}
   fontSize={'17px'}
    textShadow={'black 1px 1px 2px'}fontWeight={'550'}
  _hover={{
    bg: 'blue.500',
  }}
  onClick={()=>{
    navigate('/courses/')
    setsidebaractive(false)  
}
  }
  >
   {usercourse}
  </Flex>
  
 {
  course && 
  <Flex 
  flexDir={'column'}
  width={'full'}
  >
 {
  course?.lesson?.map((lesson,index)=>(
    <Button 
    bg={'transparent'}
    width={'full'}
    justify={'center'}
    alignItems={'center'}
    key={index}
    alignSelf={'center'}
    textAlign={'center'}
    color={'white'}
    height={'35px'}
    fontSize={'17px'}
    textShadow={'black 1px 1px 2px'}
    fontWeight={'550'}
    _hover={{
      bg: 'blue.500',
    }}
    onClick={()=>handlenavbar(lesson?._id,index)
    }
   >
     Lesson {index+1}
   </Button>
  ))
 }
 
    </Flex>
 }

  

  <Flex 
  width={'full'}
  justify={'center'}
  alignItems={'center'}
  alignSelf={'center'}
  textAlign={'center'}
  color={'white'}
  height={'35px'}
  fontWeight={'550'}
  _hover={{
    bg: 'blue.500',
  }} fontSize={'17px'}
    textShadow={'black 1px 1px 2px'}
  onClick={()=>{navigate('/')
    setsidebaractive(false)
  }}
  >
    Home
  </Flex>
  
  {
    !isenrolled  && lessonstate >= 50 && 
    <Flex 
    width={'full'}
    justify={'center'}
    alignItems={'center'}
    alignSelf={'center'}
    textAlign={'center'}
    color={'white'}
    height={'35px'}
    fontWeight={'550'}
    _hover={{
      bg: 'blue.500',
    }}
     fontSize={'17px'}
    textShadow={'black 1px 1px 2px'}
    onClick={()=>{
     navigate(`/courses/report`)
     setsidebaractive(false)   
 }
    }
   >
     report
   </Flex>
  }

  {
    user?.isadmin || user?.istrainer && 
    <Flex 
    width={'full'}
    justify={'center'}
    alignItems={'center'}
    alignSelf={'center'}
    textAlign={'center'}
    color={'white'}
    height={'35px'}
    fontWeight={'550'}
    _hover={{
      bg: 'blue.500',
    }}
     fontSize={'17px'}
    textShadow={'black 1px 1px 2px'}
    onClick={()=>{
     navigate(`/courses/add-course`)
     setsidebaractive(false)   
 }
    }
   >
     Add course
   </Flex>  
  //  :''
  }  

{
   user?.isadmin || user?.istrainer&& 
   <Flex 
   width={'full'}
   justify={'center'}
   alignItems={'center'}
   alignSelf={'center'}
   textAlign={'center'}
   color={'white'}
   height={'35px'}
   fontWeight={'550'}
   _hover={{
     bg: 'blue.500',
   }}
    fontSize={'17px'}
    textShadow={'black 1px 1px 2px'}
   onClick={()=>{
    navigate(`/courses/view-course`)
    setsidebaractive(false)   
}
   }
  >
    View course
  </Flex> 
  //  : ''
}

  
  </Flex>
    <Flex alignSelf={'-moz-initial'}
    justifySelf={'end'}
    pb={'12'}>
   <Image src={logoimg} 
     width={'40px'}
     height={'35px'}/>
       <Text color={'black'} 
     fontFamily={'cursive'}
     fontWeight={'600'}
     fontSize={'21px'}
     >
        skillPro
     </Text>
    </Flex>
    </Flex>
  )
}

export default Coursenavmodel