import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const Homepagedetail = ({image,header,descreption1,descreption2}) => {
  return (
    <Flex 
    position={'relative'}
    width={'350px'}
    height={'80px'} 
    px={2}
    gap={'5'}
    // overflow={''}
    // flexWrap={}
    borderRadius={'5px'}
    color={'gray'}
    alignItems={'center'}
    boxShadow={'0px 0px 15px 0px'}
    >
     <Image width={'60px'} 
     height={'60px'}
     src={image} /> 
     <Flex flexDir={'column'}
       gap={'1'}
       width={'full'}
     >
       <Text 
       color={'black'}
       fontSize={'16px'}
       fontWeight={'600'}
       >
        {header}
       </Text>
       <Text 
       color={'black'}
       fontSize={'sm'}
       width={'full'}
       height={'auto'}
       fontWeight={'550'}
       >
        {descreption1}        
       </Text>
       <Text 
       color={'black'}
       fontSize={'sm'}
       width={'full'}
       height={'auto'}
       fontWeight={'550'}
       >
        {descreption2}        
       </Text>
     </Flex>
    </Flex>
  )
}

export default Homepagedetail