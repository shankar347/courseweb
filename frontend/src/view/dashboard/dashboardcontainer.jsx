import React, { useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { skillcontext } from '../components/skillcontext'
import { useRecoilValue } from 'recoil'
import lessonatom from '../atom/lessonatom'

const Dashboardcontainer = () => {
  

  const {course}=useContext(skillcontext)
  // const lesson=useRecoilValue(lessonatom)
  const lesson=useRecoilValue(lessonatom)
  console.log(lesson)
  console.log(course)

   
  return (
    <Flex flexDir={'column'}
    pb={'2'}
    >
   <Flex flexDir={'column'}
     ml={'5'}
     alignSelf={'start'}
     alignItems={'center'}
   >
   <Flex fontSize={'lg'}
      fontWeight={'550'}
      mt={'2'}
      >
        Your course
      </Flex>
      <Flex
    width={'50px'}
    height={'3.5px'}
    bg={'blue.600'}
    // ml={'5px'}
    borderRadius={'5px'}
    >
    </Flex>
   </Flex>
     <Flex 
     mx={{
      md:'10',
      lg:'10',
      sm:'10',
      base:'4'
     }}
     mt={'5'} 
     flexDir={{
      md:'row',
      lg:'row',
      sm:'row',
      base:'column'
     }}
    
     gap={{
      md:'28',
      lg:'28',
      sm:'28',
      base:'2'
     }}
    //  alignItems={'center'}
     >
      <Flex flexDir={'column'}
      alignSelf={'start'}
      ml={{
        base:'1'
      }}
      // width={'full'}
      alignItems={'center'}
      >
        <Flex width={'100px'}
        height={'100px'}
        borderRadius={'50%'}
        border={'7px solid'}
        borderColor={'gray.300'}
        alignItems={'center'}
        justify={'center'}
        color={lesson >=80 ? 'green.600' : 
          lesson >= 40 ? 'yellow.400' :
          'red.400'
        }
        // fontSize={'29px'}
        fontWeight={'550'}
        gap={'2px'}
        >
        <Flex 
        fontSize={'34px'}

        >
        {lesson}
        </Flex>
        <Flex 
        mt={'1'}
        // alignSelf={'end'}
        fontSize={'20px'}
        >
          %
        </Flex>
        </Flex> 

        <Flex 
        fontWeight={'550'}
        >
          Completed
        </Flex>
      </Flex>
      <Flex flexDir={'column'}>
        <Text fontWeight={'550'}
        fontSize={'19px'}
        color={'blue.600'}
        mt={'2'}
        >
          Course Details
        </Text>
         <Text fontSize={'17px'}
         fontWeight={'550'}
         mt={'3'}
         >
           {course?.name} course
         </Text>
         <Text 
         fontWeight={'550'}>
           Completed {course?.title} for user
         </Text>
      </Flex>
      <Flex flexDir={'column'}
      >
      <Text fontWeight={'550'}
        fontSize={'19px'}
        color={'blue.600'}
        mt={'2'}
        >
          No. of Lessons
        </Text>
        <Text 
        mt={'5'}
        fontSize={'17px'}
        fontWeight={'550'}
        textAlign={{
          md:'center',
          lg:'center',
          sm:'center',
          base:'left'
        }}
        >
            {course?.lesson?.length}
        </Text>
      </Flex>
     <Flex 
    flexDir={{
      md:'row',
      lg:'row',
      sm:'row',
      base:'row'
     }}
    
     gap={{
      md:'28',
      lg:'28',
      sm:'28',
      base:'0'
     }}
     mr={{
      base:'3'
     }}
     justify={{
      base:'space-between'
     }}
     >
     <Flex flexDir={'column'}>
      <Text fontWeight={'550'}
        fontSize={'19px'}
        color={'blue.600'}
        mt={'2'}
        >
         Level
        </Text>
        <Text 
        mt={'5'}
        fontSize={'17px'}
        fontWeight={'550'}
        textAlign={'center'}>
          {course?.level}
        </Text>
      </Flex>
      <Flex flexDir={'column'}>
      <Text fontWeight={'550'}
        fontSize={'19px'}
        color={'blue.600'}
        mt={'2'}
        >
          Duration
        </Text>
        <Text 
        mt={'5'}
        fontSize={'17px'}
        fontWeight={'550'}
        textAlign={'center'}>
            {course?.duration} hr
        </Text>
      </Flex>
     </Flex>
     </Flex>
     <Flex flexDir={'column'}
     width={'140px'}
     ml={{
      md:'5',
      lg:'5',
      sm:'5',
     base:'2'}}
     alignItems={'center'}
   >
   <Flex fontSize={'18px'}
      fontWeight={'550'}
      mt={'8'}
      >
        Course Lessons
      </Flex>
      <Flex
    width={'70px'}
    height={'3.5px'}
    bg={'blue.600'}
    mt={'2px'}
    // ml={'5px'}
    borderRadius={'5px'}
    >
    </Flex>
   </Flex>
   <Flex 
   mx={{
    md:'20',
    lg:'20',
    sm:'20',
    base:'4' 
  }}
   mt={'4'}
   >
    <Text fontWeight={'550'}
        fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'16px'
        }}
        color={'blue.600'}
        mt={'2'}
        textAlign={'center'}
        width={'150px'}
        >
          S.No
        </Text>
    <Text fontWeight={'550'}
         fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'16px'
        }}
        color={'blue.600'}
        mt={'2'}
        width={'700px'}
        textAlign={'center'}
        >
          Course code
        </Text>
        <Text fontWeight={'550'}
        fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'16px'
        }}
        color={'blue.600'}
        mt={'2'}
        width={'150px'}
        textAlign={'center'}
        >
          Rating
        </Text>
   </Flex>
  
   {
    course?.lesson?.map((lesson,i)=>(
      <Flex 
      key={i}
      mx={{
        md:'20',
        lg:'20',
        sm:'20',
        base:'4' 
      }}   
     mt={'4'}>
       <Text 
       width={'150px'}
       fontSize={'16px'}
       fontWeight={'550'}
       textAlign={'center'}
       >
          {i+1}
       </Text>
       <Text 
       pl={'50px'}
        width={'700px'}
        fontSize={'16px'}
       fontWeight={'550'}
       >
         {lesson?.name}
       </Text>
       <Text fontSize={'16px'}
       fontWeight={'550'}
       width={'150px'}
       textAlign={'center'}
       >
         {lesson?.rating}
       </Text>
      </Flex>
    ))
   }
     
  
     </Flex>
  )
}

export default Dashboardcontainer