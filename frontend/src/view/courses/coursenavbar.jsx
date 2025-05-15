import React from 'react'
import logoimg from '../../assets/logo1.png'
import hexaware from '../../assets/Hexaware.jpg'
import { Flex, Image, Text } from '@chakra-ui/react'

const Coursenavbar = () => {
  return (
    <Flex 
    justify={'space-between'}
    align={'center'}
    mx={'8'}e
    mt={'1'}
    >
     <Flex flexDir={'column'}
     alignItems={'center'}
     justify={'center'}
     >
     <Flex gap={'1'} alignItems={'center'}>
    <Image src={logoimg} 
    width={'30px'}
    height={'25px'}
    />
    <Text color={'black'} 
    fontFamily={'cursive'}
    fontWeight={'600'}
    fontSize={'18px'}
    >
       skillPro
    </Text>
   </Flex>
   <Flex 
   fontSize={'16px'}
   fontWeight={'550'}
   alignSelf={'center'}
   fontFamily={'cursive'}
   >
   Online courses
   </Flex>   
   </Flex>
   <Flex>
       <Image
       src={hexaware}
       width={'80px'}
       height={'80px'}
       />
   </Flex>
    </Flex>
  )
}

export default Coursenavbar