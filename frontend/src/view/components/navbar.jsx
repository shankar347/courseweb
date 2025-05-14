import { Flex, Image, Menu, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import logoimg from '../../assets/logo1.png'
import { useNavigate } from 'react-router-dom'
import menuicon from '../../assets/menu.png'
import clossicon from '../../assets/close1.png'
import {useMediaQuery} from 'react-responsive'
import { skillcontext } from './skillcontext'


const Navbar = () => {

 const checkscreen=useMediaQuery({maxWidth:'400px'})
 const {sidbaractive,setsidebaractive,
 }=useContext(skillcontext)
 const navigate=useNavigate()
//  console.log(sidbaractive)
  return (
    <Flex 
    zIndex={'5'}
    height={'7vh'}
    // bg={'blue.300'}
    className='navbar'
    // borderBottomLeftRadius={'3px'}
    alignItems={'center'}
    color={'blue'}
    // zIndex={'10'}
    // boxShadow={'0px 0px 20px 0px'}
    justify={'space-between'}
    // borderBottomRightRadius={'3px'}
    >
    <Flex gap={'2'} alignItems={'center'} ml={'2'}>
     <Image src={logoimg} 
     width={'40px'}
     height={'35px'}
     />
     <Text color={'black'} 
     fontFamily={'cursive'}
     fontWeight={'600'}
     fontSize={'21px'}
     >
        skillPro
     </Text>
    </Flex>
 {
    !checkscreen &&    <Flex 
    color={'black'}
    mr={'5'}
    gap={'1'}
    visibility={{
        md:'visible',
        lg:'visible',
        sm:'visible',
        base:'hidden'
    }}
    height={'100%'}
    alignItems={'center'}
    >
        <Flex 
          _hover={{
            bg:'rgb(83, 207, 255)',
            borderRadius:'10px'
        }}
        cursor={'pointer'}
        height={'full'}
        alignItems={'center'}
        width={'120px'}
        justify={'center'}
        fontWeight={'550'}
        onClick={()=>navigate('/')}
        >
            Home
        </Flex>
        <Flex 
        cursor={'pointer'}

         fontWeight={'550'}
         _hover={{
            bg:'rgb(83, 207, 255)',
            borderRadius:'10px'
        }}
        height={'full'}
        alignItems={'center'}
        width={'120px'}
        justify={'center'}
        onClick={()=>navigate('/dashboard')}
        >
            Dashboard
        </Flex>
        <Flex
        cursor={'pointer'}

         fontWeight={'550'}
         _hover={{
            bg:'rgb(83, 207, 255)',
            borderRadius:'10px'
        }}
        height={'full'}
        alignItems={'center'}
        width={'120px'}
        justify={'center'}
        onClick={()=>navigate('/courses')}
        >
            Courses
        </Flex>
        <Flex
        cursor={'pointer'}

         fontWeight={'550'}
         _hover={{
            bg:'rgb(83, 207, 255)',
            borderRadius:'10px'
        }}
        height={'full'}
        alignItems={'center'}
        width={'120px'}
        justify={'center'}
        onClick={()=>navigate('/profile')}
        >
            Profile
        </Flex>
    </Flex>
 }
    
  {
    checkscreen && 
    <Flex
    mr={'2'}
    // visibility={{
    //     md:'hidden',
    //     lg:'hidden',
    //     sm:'hidden',
    //     base:'visible'
    // }}
    // color={'black'}
    > 
    <Image
    width={sidbaractive ? '15px' :'25px'}
    height={sidbaractive ? '15px' :'25px'}
    src={sidbaractive ? clossicon : menuicon}
    onClick={()=>{setsidebaractive(!sidbaractive)
    }}
    />
       </Flex>
  }
    </Flex>
  )
}

export default Navbar