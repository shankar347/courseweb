import React, { useEffect } from 'react'
import Courseinfomodel from './courseinfomodel'
import { Flex, Input, Text } from '@chakra-ui/react'

const Coursecreateslide2 = ({
  slidenumber,slidetitle,slidecontent,
setslidecontent,
setslidetitle,
lessonnumber,
maxcount,
truncated,
editslidecontent,
editslidetitle
}) => {


  useEffect(()=>{
    
    if(editslidecontent)
    {
       setslidecontent( editslidecontent,lessonnumber,slidenumber)
    }
    if(editslidetitle)
    {
       setslidetitle(editslidetitle,lessonnumber,slidenumber)
    }
    
 },[,editslidecontent,editslidetitle])

  return (
    <Flex 
    flexDir={'column'}
    gap={'2'}
    mt={'0'}
    mb={'2'}
    >
      
    
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

export default Coursecreateslide2