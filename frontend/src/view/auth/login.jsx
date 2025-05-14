
import React, { useContext, useEffect, useRef } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Spinner,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icon'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authatom from '../atom/authatom'
import useratom from '../atom/useratom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { skillcontext } from '../components/skillcontext'
import Updatepassword from '../user/updatepassword'


const Login = () => {
  
   
//   const [showPassword, setShowPassword] = useState(false)
  const [loading,setloading]=useState(false)
  const [showPassword,setshowpassword]=useState(false)

//   const setauthstate=useSetRecoilState(authatom)
const [auth,setauth]=useRecoilState(authatom)  
  const setuserstate=useSetRecoilState(useratom)
  const [actions,setactions]=useState({
    email:'',
    password:''
  })

  const {isOpen,onClose,onOpen}=useDisclosure()
    const {isOpen:isOpen1,onClose:onClose1,onOpen:onOpen1}=useDisclosure()
    const [phoneno,setphoneno]=useState('')
  const toast=useToast()
  const inputref=useRef([])
    const [otp,setotp]=useState(Array(6).fill(''))
    // const [sendotp,setsendotp]=useState(Array(6).fill(''))  
    const {otpcorrect,setotpcorrect} =useContext(skillcontext)
    const [sendotp,setsendotp]=useState(null)
  const navigate=useNavigate()

  const generageotp=async()=>{
    try{
     if(!phoneno.length > 0){
       return toast({
         status:'error',
         description:'Enter the email',
         duration:'3000'
       })
     }
     if (!phoneno.includes('@gmail.com'))
     {
       return toast({
         status:'error',
         description:'Enter valid email address',
         duration:'3000'
       })
     }
     if(!otp.fill(''))
     {
       setotp({
         ...otp,
         fill:''
       })
     }
     const res=await fetch('/api/user/otp',{
       method:'POST',
       headers:{
         'Content-Type':'application/json',
       },
       body:JSON.stringify({phoneno:phoneno})
     })
     const data=await res.json()
     console.log(data)
     setsendotp(data)
     onOpen1()
     onClose()
    }
    catch(err)
    {
     console.log(err)
    }
   } 

  const handlelogin=async(e)=>{
       e.preventDefault();
    try
    {
      setloading(true)
       const res=await fetch('/api/user/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(actions)
       })
      const data=await res.json()
      console.log(data.error)
      if(data.error)
      {
        toast({
          title:'Error',
          description:data.error,
          duration:3000
        })
       return;
      }
      var token=JSON.stringify({
        token:data,
        expiresAt:new Date().getTime() + 2*24*60*60*1000
      })
      setuserstate(JSON.parse(token))
      localStorage.setItem('token',token)
      toast({
          description:'Loggedin  successfully',
          status:'success',
          duration:2000
      })
      navigate('/')
    }
    catch(e)
    {
      console.log(e)
      // toast({
      //   status:'error',
      //   description:e.message,
      //   duration:3000
      // })
    }
    finally
    {
      setloading(false)
    }
  }

  const handlechange=(elem,index)=>{
    const value=elem.value

    if (/^[0-9]$/.test(value) || value === '')
    {
        const newotp=[...otp]
        newotp[index]=value
        setotp(newotp)
    }
     else{
      toast({
        status:'error',
        description:'Invalid input',
        duration:2000
      })
      return
    }
    if (value !== '' && index < otp.length -1 )
    {
        inputref.current[index+1].focus()
    }
  }


  const handlecacelotp=()=>{
    setotp(Array(6).fill(''))
     setphoneno('')
  }

    
  const otpverify=()=>{      
      
    console.log(sendotp.toString() !== otp.join('').trim())  
    if (otp.join('').trim() !== sendotp.toString())
     {
       toast({
        title: 'Error',
        description:"Enter the sended OTP",
        status:'error',
        duration:2000
       })
      setotpcorrect(false)
     }  
     else{
      // setphoneno('')
      onClose1()
      onClose()
      setotpcorrect(true)
     }
      
    
  }
  return (
    <>
    <Flex width={'full'} 
    align={'center'}
    height={'100vh'}
    justify={'center'}
    bg={'blue.400'} 
    // flexDir={'column'}
    color={'white'}>
      <Flex 
      flexDir={'column'}
    //   minWidth={{
    //     md:'lg',
    //    lg:'lg',
    //   sm:'lg',
    //    base:'95%'}}
    minWidth={{
      lg:'md',
      md:'md',
      sm:'md',
      base:'85%'  
    }}
    px={'8'}
    bg={'gray.200'}
    mt={'5px'}
    zIndex={'2'}
    rounded={'lg'}
       boxShadow={'lg'}
>
        <Text color={'blue.400'}
        fontSize={'2xl'}
        fontWeight={'bold'}
        mt={{
            md:'10',
            lg:'10',
            sm:'10',
            base:'3'}}
        fontFamily={'sans-serif'}
        textAlign={'center'}   
        textShadow={'1px 1px 0px  black'}
        mb={'8'}>

          Login

        </Text>
  
       <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>
             Email    
        </FormLabel>
        <Input type={'email'} placeholder={'Enter your email'}
         border={'2px solid'}
         value={actions.email}
         color={'black'}
         onChange={(e)=>setactions({...actions,email:e.target.value})}
         borderColor={'gray.400'} />
       </FormControl>
    
       <FormControl isRequired  mt={'4'}> 
         <FormLabel color={'black'}>
            Password
         </FormLabel>
         <InputGroup
         alignItems={'center'}
         justifyItems={'center'}
         >
         <Input type={showPassword ? 'text' : 'password'} 
                      border={'2px solid'}
                      color={'black'}
                      value={actions.password}
                      placeholder='Enter your password'
                      borderColor={'gray.400'}
                     onChange={(e)=>setactions({...actions,password:e.target.value})}/>
           <InputRightElement h={'70%'}
           my={'auto'}
           justifySelf={'center'} alignSelf={'center'}>
                    <Button 
                    alignSelf={'center'}
                    height={'full'}
                    // bg={'blue'}
                    mr={'1'}
                    mt={'3'}
                      variant={'ghost'}
                      onClick={() => setshowpassword((showPassword) => !showPassword)}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                    </InputRightElement>
         </InputGroup>
       </FormControl>
       <Text pl={1} mt={'1'} 
       fontWeight={'550'}
          color={'red.500'}
          _hover={{
            color:'red.300'
          }
          }
          fontSize={'15px'}
          cursor={'pointer'}
          onClick={()=>{onOpen()
            setactions(prevaction=>(
              {
                ...prevaction,
                password:''
              }
            ))
          }}
          
          >
            Forget Password
          </Text>
        <Button width={'full'}
        bg={'blue.400'}
        textAlign={'center'}
        borderRadius={'5px'}
        my={'5'}
        mt={'5'}
        h={'42px'}
        onClick={handlelogin}
        alignSelf={'center'}
        _hover={{
          bg:'blue.300'
        }}
color={'white'}
        >
          {loading ? <Spinner/> : 'Submit'}
        </Button>
  
        <Flex color={'black'}
        textAlign={'center'}
        alignSelf={'center'}
        fontSize={'sm'}
        fontWeight={'medium'}
        gap={'2'} mb={'3'}
        >  
          <Text >
          Don't have an account 
          </Text> 
          <Text color={'blue.400'}
          cursor={'pointer'}
          onClick={()=>setauth('Register')}>
             Register
          </Text>
          </Flex>
      </Flex>
    </Flex>
    <Modal isOpen={isOpen}  onClose={onClose}>
  <ModalOverlay/>
  <ModalContent>
   <ModalHeader fontSize={'15px'}>
    Enter your registered Email
   </ModalHeader>
  <ModalCloseButton size={'sm'}/>
  <ModalBody pb={6}>
  <FormControl>

    <Input 
     border={'2px solid'}
     borderColor={'gray.400'}
     type='email'
     placeholder='your@gmail.com' value={phoneno} 
    onChange={(e)=>setphoneno(e.target.value)} 
    />
    
  </FormControl>
  </ModalBody>  
  <ModalFooter>
    <Button colorScheme='blue'  size={'sm'} 
    onClick={generageotp}>
        Submit
    </Button>
  </ModalFooter>
  </ModalContent>
 </Modal>
 <Modal isOpen={isOpen1}  onClose={onClose1}>
  <ModalOverlay/>
  <ModalContent>
   <ModalHeader fontSize={'15px'}
   fontWeight={'600'}>
    Enter the OTP sent to {phoneno}
   </ModalHeader>
  <ModalCloseButton size={'sm'}
  onClick={handlecacelotp}/>
  <ModalBody pb={6}>
  <FormControl>
   <Flex flexDir={'row'} 
   alignItems={'center'} width={'full'}
   gap={{
    md:'8',
    lg:'8',
    sm:'8',
    base:'2'}} alignSelf={'center'}>
    {
      otp?.map((digit,index)=>(
        <Input
        color={'black'} 
        ref={el => inputref.current[index] = el}
        // size={'md'}
        height={'45px'}
        width={'48px'}
        key={index}
        value={digit}
        pl={'13px'} 
        type='text'
        maxLength={1}
        textAlign={'center'}
        border={'2px solid'}
        borderColor={'gray.300'}
        onChange={(e) => handlechange(e.target, index)}
    /> 
    ))
    }
   </Flex>
   <Flex 
 mt={'3'}
 width={'full'}
 alignItems={'center'}
 justifyContent={'space-between'}>
  <Flex 
  color={'red.500'}
  cursor={'pointer'}
  fontWeight={'550'}
  _hover={{
    color:'red.300'
  }}
  onClick={()=>{{handlecacelotp(),
    onClose1()
  }}}
  ml={'2'}>
    Cancel
    </Flex>
    <Flex
    color={'blue.600'}
    _hover={{
      color:'blue.300'
    }}
    fontWeight={'550'}
    fontSize={'15px'}
    cursor={'pointer'}
    mr={'2'}
    onClick={generageotp}
    >
      Resend OTP
    </Flex>
  </Flex>
  </FormControl>
  </ModalBody>  
  <ModalFooter>
    <Button colorScheme='blue'  size={'sm'} 
    onClick={otpverify}>
        Submit
    </Button>
  </ModalFooter>
  </ModalContent>
 </Modal>
   
     <Updatepassword email={phoneno}/> 
    </>
  )
}

export default Login