import { Flex, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

const Courseinfomodel = ({slidenumber,setslidecontent,slidecontent,
  lessonnumber,
  maxcount,
  truncated
}) => {


    

    return (
     <Flex 
     flexDir={'column'}
     gap={'1'}
     >
     <Textarea
    border={'3px solid'}
    borderColor={'gray.400'}
    value={slidecontent}
    // cols={'10'}
    rows={'2'}
    color={'black'}
    onChange={(e)=>setslidecontent(e.target.value,lessonnumber,slidenumber)}
    //  placeholder='Enter course slide details'
     />
     <Flex 
     alignSelf={'end'}
     fontWeight={'550'}
     fontSize={'13px'}
     > 
     {truncated}/{maxcount}
     </Flex>
     </Flex>
  )
}

export default Courseinfomodel