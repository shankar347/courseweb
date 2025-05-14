import { Flex, Image, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import logoimg from '../../assets/logo1.png'
import { useNavigate } from 'react-router-dom'
import { skillcontext } from '../components/skillcontext'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import lessonatom from '../atom/lessonatom'
import usercourseatom from '../atom/usercourseatom'

const Coursesidebar = () => {

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
  //  console.log(lessonstate)

  const handlenavbar=(lessonid,index)=>{
    
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
    // setsidebaractive(false)   

   }

  return (
     <Flex 
     className='dashboard'
     color={'gray'}
     mt={'0px'}
     h={'full'}
     flexDir={'column'}
     boxShadow={'0px 0px 10px 0px'}
     alignItems={'center'}
     justify={'space-between'}
     >
         <Flex flexDir={'column'} 
    width={'full'}
    // fontSize={'17px'}
    height={'full'}
    >
    <Flex color={'blue.700'}
    fontSize={'18px'}
    mt={'4'}
    alignSelf={'center'}
    fontWeight={'600'}
    >
      Courses
    </Flex>    
    <Flex width={'40px'}
    height={'4px'}
    bg={'red.300'}
    alignSelf={'center'}
    borderRadius={'5px'}
    >
    </Flex>
    <Flex color={'blue.600'}
    fontSize={'16px'}
    mt={'5'}
    width={'full'}
    alignSelf={'center'}
    justify={'center'}
    height={'40px'}
    alignItems={'center'}
    _hover={{
      bg:'blue.500',
      color:'white',
      transition: 'background-color 0.3s ease, color 0.3s ease' 
  }}
  transition={'background-color 0.7s ease, color 0.7s ease'}
    cursor={'pointer'}
    onClick={()=>navigate('/courses/')}
    fontWeight={'550'}
    >
      {usercourse}
    </Flex>

  {
    course && course?.lesson?.map((lesson,index)=>(
      <Flex color={'blue.600'}
      fontSize={'16px'}
      mt={'0'}
      width={'full'}
      alignSelf={'center'}
      justify={'center'}
      height={'40px'}
      alignItems={'center'}
      _hover={{
        bg:'blue.500',
        color:'white',
        transition: 'background-color 0.3s ease, color 0.3s ease' 
    }}
    transition={'background-color 0.7s ease, color 0.7s ease'}

      key={index}
      cursor={'pointer'}
      onClick={()=>handlenavbar(lesson?._id,index)}
      fontWeight={'550'}
      >
        Lesson {index+1}
      </Flex>
    ))
  }
  
    <Flex color={'blue.600'}
    fontSize={'16px'}
    // mt={'10'}
    width={'full'}
    alignSelf={'center'}
    justify={'center'}
    height={'40px'}
    alignItems={'center'}
    _hover={{
        bg:'blue.500',
        color:'white'
    }}
    cursor={'pointer'}
    onClick={()=>navigate('/courses/report')}
    fontWeight={'550'}
    >
       report 
    </Flex>
   
   {
    user?.isadmin || user?.istrainer ?
    <Flex color={'blue.600'}
    fontSize={'16px'}
    // mt={'10'}
    width={'full'}
    alignSelf={'center'}
    justify={'center'}
    height={'40px'}
    alignItems={'center'}
    _hover={{
        bg:'blue.500',
        color:'white'
    }}
    cursor={'pointer'}
    onClick={()=>navigate('/courses/add-course')}
    fontWeight={'550'}
    >
       Add course 
    </Flex> : ''
   }



{
    user?.isadmin || user?.istrainer ?
    <Flex color={'blue.600'}
    fontSize={'16px'}
    // mt={'10'}
    width={'full'}
    alignSelf={'center'}
    justify={'center'}
    height={'40px'}
    alignItems={'center'}
    _hover={{
        bg:'blue.500',
        color:'white'
    }}
    cursor={'pointer'}
    onClick={()=>navigate('/courses/view-course')}
    fontWeight={'550'}
    >
      view course 
    </Flex> : ''
   }


<Flex color={'blue.600'}
    fontSize={'16px'}
    mt={''}
    width={'full'}
    alignSelf={'center'}
    justify={'center'}
    height={'40px'}
    alignItems={'center'}
    _hover={{
      bg:'blue.500',
      color:'white',
      transition: 'background-color 0.3s ease, color 0.3s ease' 
  }}
  transition={'background-color 0.7s ease, color 0.7s ease'}
    cursor={'pointer'}
    onClick={()=>navigate('/')}
    fontWeight={'550'}
    >
      Home
    </Flex>

   
    </Flex>
    <Flex justifySelf={'end'}
//    alignSelf={'end'}
mb={'14'}
   >
   <Image src={logoimg} width={'30px'}
    height={'30px'}
    />
   </Flex>
     </Flex>
  )
}

export default Coursesidebar