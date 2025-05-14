import { Flex, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import logo from '../../assets/logo1.png'
import instlogo from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'

const Footer = () => {
  return (
     <Flex height={'220px'}
     className='navbar'
     flexDir={'column'}
     width={'full'}
     >
    <Flex 
     mt={'4'}
     justify={'center'}
    >
    <Image 
    src={logo} 
    width={'40px'}
    height={'40px'}
    alignSelf={'center'}
    />
    <Text color={'black'} 
     fontFamily={'cursive'}
     fontWeight={'600'}
     fontSize={'21px'}
     >
        skillPro
     </Text>
    </Flex>
  
    <Flex justify={'center'}
     fontSize={'18px'}
     fontWeight={'600'}
     mt={'5'}
     gap={'2'}
    >
      <Text>
      Contact us at:
      </Text>
       <Text fontWeight={'550'}>
        <Link href="mailto:sivaaadi96@example.com" 
        _hover={{ textDecoration: 'underline' }}>
            sivaadi96@example.com</Link>
        </Text>
    </Flex>
      <Flex justify={'center'}
      mt={'5'}
      gap={'5'}
      >
       <Image src={instlogo} 
       width={'25px'}
       height={'25px'}
       _hover={{
        opacity:'50%'
       }}
       cursor={'pointer'}
       />
         <Image src={twitter} 
       width={'25px'}
       height={'25px'}
       _hover={{
        opacity:'50%'
       }}
       cursor={'pointer'}
       />
         <Image src={facebook} 
       width={'25px'}
       height={'25px'}
       _hover={{
        opacity:'50%'
       }}
       cursor={'pointer'}
       />
      </Flex>
      <Flex alignSelf={'center'}
      mt={'5'}
      fontWeight={'550'}
      >
        @ {new Date().getFullYear()} skillPro . All rights reserved
      </Flex>
     </Flex>
  )
}

export default Footer