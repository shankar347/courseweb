import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Updateprofile from './updateprofile'
import { useLocation, useNavigate } from 'react-router-dom'
import { skillcontext } from '../components/skillcontext'
import Homenavmodel from '../components/homenavmodel'
import useratom from '../atom/useratom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const Profile = () => {
  
  const {isOpen,onOpen,onClose} =useDisclosure()
  const {sidbaractive,setsidebaractive,
  }=useContext(skillcontext)
  // const navigate=useNavigate()
  const location=useLocation()
  const user1=useRecoilValue(useratom)
  const navigate=useNavigate()
  const user=user1?.token
  const checkloation=
  location.pathname === '/profile'  
  const setuserstate=useSetRecoilState(useratom)
  
  const handlelogout=async()=>{
    try{
      const res=await fetch('/api/user')
      const data=await res.json()
      localStorage.removeItem('token')
      setuserstate(null)
      navigate('/auth')
    }
    catch(err)
    {
      console.log(err)
    }
  }

 

  return (
    <>
    <Flex 
     flexDir={'column'}
     height={'100vh'}
     justify={'space-between'}
     >
         {sidbaractive && checkloation &&  <Homenavmodel/>}
<Flex flexDir={'column'}>
<Flex 
      ml={'5'}
      pt={'5'}
      gap={'2'}
      >
      <Flex
      fontSize={'22px'}
      fontWeight={'650'}
      color={'blue.700'}
      >
      Hello!
      </Flex>
      <Flex 
      alignSelf={'end'}
      fontSize={'18px'}
      fontWeight={'550'}
      >
        {user?.name}
      </Flex>
      </Flex>
      <Flex 
        ml={'5'}
        pt={'3'}
      color={'blue.700'}
        fontSize={'18px'}
        fontWeight={'650'}
      >
       Welcome to skillPro
      </Flex>
      <Flex 
       mt={'5'}
       fontSize={'18px'}
       color={'blue.700'}
       fontWeight={'650'}
      alignSelf={'center'}
      >
        Your Profile
      </Flex>
      <Flex
      pt={'5'}
      flexDir={{
        md:'row',
        lg:'row',
        sm:'column',
        base:'column'
      }}
      justify={{
        md:'space-around',
        lg:'space-around',
        sm:'space-around',
      }}
      // alignItems={'center'}
      >
     <Flex 
     gap={'5'}
     flexDir={'column'}
     alignSelf={'center'}
     pt={'5'}
    //  mx={'auto'} 
     width={{
      base:'full',
      lg:'auto',
      sm:'auto',
      md:'auto'  
    }}
     >
  <Flex 
  gap={'2'}
  >
  <Flex 
     mx={'2'}
  
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
     width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     alignSelf={'end'}
     >
       Name 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.name}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
     width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     alignSelf={'end'}
     >
       email 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.email}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
     alignSelf={'end'}
       width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     >
      Phone no
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     borderRadius={'3px'}
     alignItems={'center'}
     >
     {user?.phoneno}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
    width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     alignSelf={'end'}
     >
       College 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
    width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     borderRadius={'3px'}
     alignItems={'center'}
     >
     {user?.collge}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
     width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     alignSelf={'end'}
     >
       Degree 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.degree}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
    width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
     alignSelf={'end'}
     >
       Specialization 
     </Flex>   
     <Flex
      width={{
        md:'300px',
        lg:'300px',
        sm:'300px',
        base:'200px'
       }}
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
     height={'40px'}
     background={'gray.300'}
     pl={'3'}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.specialization?.length > 22 ? 
      user?.specialization?.slice(0,22) + '...' : user?.specialization?.length  
    }
     </Flex>
  </Flex>
     </Flex> 
     <Flex 
      gap={'5'}
      flexDir={'column'}
      alignSelf={'start'}
      pt={'5'}
     >
     <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
     alignSelf={'end'}
     width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     >
       Linkidin 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.linkedin}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
    width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     alignSelf={'end'}
     >
       Github 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
    width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     borderRadius={'3px'}
     alignItems={'center'}
     >
     {user?.github}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
     alignSelf={'end'}
     width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
 >
       Programming Language 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.programminglanguage}
     </Flex>
  </Flex>
  <Flex 
  gap={'2'}
  >
  <Flex 
     fontSize={'15px'}
     color={'blue.700'}
     fontWeight={'650'}
    //  width={'180px'}
     alignSelf={'end'}
     width={{
      md:'180px',
      lg:'180px',
      sm:'180px',
      base:'100px'
     }}
     mx={'2'}
     >
       Expeirence Level 
     </Flex>   
     <Flex
     fontSize={'15px'}
     fontWeight={'550'}
    //  width={'300px'}
     height={'40px'}
     background={'gray.300'}
     px={'3'}
     width={{
      md:'300px',
      lg:'300px',
      sm:'300px',
      base:'200px'
     }}
     borderRadius={'3px'}
     alignItems={'center'}
     >
      {user?.experience}
     </Flex>
  </Flex>
  </Flex>
     </Flex>
</Flex>

     <Flex
     pb={{md:'14',
      lg:'14',
      sm:'10',
      base:'2'
     }}
     mt={{
      base:'10'
     }}
    //  flexDir={'column'}
     justify={'space-between'}
     width={'full'}
     alignSelf={'end'}
     mx={'0'}
     //  alignSelf={'end'} 
     >
     <Button 
     ml={'3'}
     color={'white'}
     _hover={{
      background:'blue.400'
     }}
     background={'blue.500'}
     onClick={()=>onOpen()}
     >
      Edit Profile
     </Button>
     <Button
     width={'28'} 
     mr={'3'}
     color={'white'}
     _hover={{
      background:'red.500'
     }}
     background={'red.400'}
     onClick={handlelogout}
     >
      Logout
     </Button>
     </Flex>
     </Flex>
     <Updateprofile isOpen={isOpen}
     onClose={onClose}
     />
     </>
  )
}

export default Profile