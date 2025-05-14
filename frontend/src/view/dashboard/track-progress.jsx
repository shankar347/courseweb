import { Flex, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import CourseProgressPage from './chartmapcontainer'
import { skillcontext } from '../components/skillcontext'

const Trackprogress = () => {

  let {batchtoppers} = useContext(skillcontext)
 
  batchtoppers= batchtoppers !== null ?  batchtoppers?.map((student)=>{
 return { name:student.name,mark:student?.totalmarks
 }
} 
  ).slice(0,10) :  batchtoppers



  
  console.log(batchtoppers)
  

  return (
    <>
    {
      batchtoppers !== null && batchtoppers.length > 0 ?
      <Flex  
      flexDir={'column'}
      width={'full'}
      >
       <Flex 
          gap={'1'}
          flexDir={'column'}
          alignSelf={'start'}
           alignItems={'center'}
       >
           <Flex mt={'4'}
       ml={'4'}
       fontSize={'lg'}
       fontWeight={'550'}
       >
         Batch Progress
       </Flex>
       <Flex
     width={'90px'}
     height={'3.5px'}
     bg={'blue.600'}
     // ml={'5px'}
     borderRadius={'5px'}
     >
     </Flex>
       </Flex> 
      {
        batchtoppers !== null ?
       <CourseProgressPage  
       lessons={batchtoppers}
       /> : ''
      }
       <Flex 
       fontWeight={'550'}
       fontSize={'18px'}
       mt={'4'}
       alignSelf={'center'}
       textAlign={'center'}
       >
       Batch Toppers
       </Flex>
       <Flex
     width={'50px'}
     alignSelf={'center'}
     height={'3.5px'}
     bg={'blue.600'}
     // ml={'5px'}
     borderRadius={'5px'}
     >
     </Flex>
     <Flex 
      mt={'5'}
      mx={{
       md:'40',
       lg:'40',
       sm:'40',
       base:'2'
      }}
      >
      <Text fontWeight={'550'}
         fontSize={'19px'}
         color={'blue.600'}
         mt={'2'}
         textAlign={'center'}
         width={'200px'}
         >
          Rank
         </Text>
         <Text fontWeight={'550'}
         fontSize={'19px'}
         color={'blue.600'}
         mt={'2'}
         textAlign={'center'}
         width={'500px'}
         >
          Name
         </Text>
         <Text fontWeight={'550'}
         fontSize={'19px'}
         color={'blue.600'}
         mt={'2'}
         textAlign={'center'}
         width={'200px'}
         >
           Mark
         </Text>
      </Flex>
     {
      batchtoppers?.map((student,i)=>(
       <Flex 
       mt={'5'}
       mx={{
         md:'40',
         lg:'40',
         sm:'40',
         base:'2'
        }}
       key={i}
       mb={'4'}
       >
       <Text fontWeight={'550'}
          fontSize={'17px'}
          color={'black'}
          mt={'2'}
          textAlign={'center'}
          width={'200px'}
          >
           {i+1}
          </Text>
          <Text fontWeight={'550'}
          fontSize={'17px'}
          color={'black'}
          mt={'2'}
          textAlign={'center'}
          width={'500px'}
          >
        {student?.name}
          </Text>
          <Text fontWeight={'550'}
          fontSize={'17px'}
          color={'black'}
          mt={'2'}
          textAlign={'center'}
          width={'200px'}
          >
            {student?.mark}
          </Text>
       </Flex>
      ))
     }
      </Flex> : <Text fontWeight={'550'} 
      alignSelf={'center'} flex={1}
      textAlign={'center'}
      mt={'40'}
      justifySelf={'center'} height={'full'}
      color={'blue.600'} width={'full'}>
        No bach is allocated yet
      </Text>
    }
     </>
  )
}
    
export default Trackprogress