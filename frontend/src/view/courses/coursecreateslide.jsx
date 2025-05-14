import React, { useEffect } from 'react'
import Courseinfomodel from './courseinfomodel'
import { Flex, Input, Text } from '@chakra-ui/react'

const Coursecreateslide = ({lessonnumber,slidenumber
   ,lessonname,
   slidetitle,
   setlessonname,
   setslidetitle,
   setslidecontent,
   slidecontent,
   maxcount,
   truncated,
   editlessonname,
   editslidetitle,
   editslidecontent
}) => {
    
   console.log(editlessonname)
   console.log(editslidetitle)
   console.log(editslidecontent)
   
   useEffect(()=>{
      if(editlessonname)
      {
         setlessonname(editlessonname,lessonnumber)
      }
      
      if(editslidecontent)
      {
         setslidecontent( editslidecontent,lessonnumber,slidenumber)
      }
      if(editslidetitle)
      {
         setslidetitle(editslidetitle,lessonnumber,slidenumber)
      }
      
   },[editlessonname,editslidecontent,editslidetitle])



   return (
    <Flex 
    flexDir={'column'}
    gap={'2'}
    mt={'2'}
    mb={'10'}
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
           Lesson {lessonnumber+1} Name
        </Text>
        <Input
        value={lessonname}
        onChange={(e)=>setlessonname(e.target.value,lessonnumber)}
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
         Slide {slidenumber+1} Title
        </Text>
        <Input
        value={slidetitle}
        onChange={(e)=>setslidetitle(e.target.value,lessonnumber,slidenumber)}
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
        Slide {slidenumber+1} Info
        </Text>
        <Courseinfomodel 
        slidecontent={slidecontent}
        setslidecontent={setslidecontent}
        slidenumber={slidenumber}
        lessonnumber={lessonnumber}
        maxcount={maxcount}
        truncated={truncated}
        />
     </Flex>
    </Flex>
  )
}

export default Coursecreateslide