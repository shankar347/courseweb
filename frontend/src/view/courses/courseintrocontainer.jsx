import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import logoimg from '../../assets/logo1.png'
import hexaware from '../../assets/Hexaware.jpg'
import { skillcontext } from '../components/skillcontext'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import batchatom from '../atom/batchatom'
import usercourseatom from '../atom/usercourseatom'

const Courseintrocontainer = () => {
   
    const {onOpen,isOpen,onClose} =useDisclosure()
    const {course,setcourse}=useContext(skillcontext)
    const {isenrolled,setenrolled,setlessonindex,}=useContext(skillcontext)
    const [email,setemail]=useState('')
    const [phoneno,setphoneno]=useState('')
    const [name,setname]=useState('')
    const toast=useToast()
    const coursename=useRecoilValue(usercourseatom) 
     const [batch,setbatch]=useRecoilState(batchatom)
     const user1=useRecoilValue(useratom)
     const user=user1?.token
     
     useEffect(()=>{
     
      if(user?.name)
      {
        setname(user?.name)
      }

      if(user?.email)
      {
        setemail(user?.email)
      }

      if(user?.phoneno)
      {
        setphoneno(user?.phoneno)
      }
      
     },[])

     const createbatch=async()=>{
      try{

        if(!name || !email || !phoneno)
        {
          toast({
           description:'Provide all the fields',
           status:'error',
           duration:2000
          })
          return
        }

       const res=await fetch('/api/batch',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          name:name,
          email:email,
          phoneno:phoneno,
          coursename:coursename
        })
       }) 
       const data=await res.json()
       if(data?.error)
       {
        toast({
          description:data?.error,
          duration:2000,
          status:'error'
        })
        return
       }
      onClose()  
      setenrolled(true)
      setbatch(data?.name)
      localStorage.setItem('batch',data?.name)
      setlessonindex(0)
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
     >
      <Flex alignSelf={'center'}
      fontWeight={'600'}
      fontSize={'29px'}
      color={'blue.600'}
      >
        Course Introduction
      </Flex>
      <Box
      mt={'5'}
      borderRadius={'5px'}
      border={'2px solid'}
      borderColor={'gray.400'}
       width={{
        md:'60%',
        lg:'60%',
        sm:'60%',
        base:'80%'
       }}
       alignSelf={'center'}
      height={'300px'} 
      >
      <Image 
      borderRadius={'3px'}
      src={course?.img}
      width={'full'}
      height={'full'}
      />
      </Box>
     
    <Flex 
    flexDir={'column'}
    //  alignItems={'end'}
     fontSize={'18px'}
     fontWeight={'550'}
     alignSelf={'center'}
     mt={'5'}
     gap={'2'}
    >
      <Flex 
    gap={'4'}
   >
        <Text 
        fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'17px'
        }}
        width={{
          md:'130px',
          lg:'130px',
          sm:'130px',
          base:'70px'
         }}
        color={'blue.600'}
      
       >
            Title
        </Text>
        <Flex 
        fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'17px'
        }}
     >
        Java Beginner level course
     </Flex>
    </Flex>
    <Flex 
    gap={'4'}
   >
        <Text 
           fontSize={{
            md:'19px',
            lg:'19px',
            sm:'19px',
            base:'17px'
          }}
          width={{
            md:'130px',
            lg:'130px',
            sm:'130px',
            base:'70px'
           }}
        color={'blue.600'}
        >
          Duration
        </Text>
        <Flex    fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'17px'
        }}
     >
      {course?.duration} days
     </Flex>
    </Flex>
    <Flex 
    gap={'4'}
    mb={'4'}
   >
        <Text 
   
        color={'blue.600'}
        fontSize={{
          md:'19px',
          lg:'19px',
          sm:'19px',
          base:'17px'
        }}
        width={{
          md:'130px',
          lg:'130px',
          sm:'130px',
          base:'70px'
         }}
       >
            Trainer
        </Text>
        <Flex 
           fontSize={{
            md:'19px',
            lg:'19px',
            sm:'19px',
            base:'17px'
          }}
     >
       {course?.trainer}
     </Flex>
    </Flex>
    </Flex>

  {
    !batch && 
    <Button 
    width={'32'}
    alignSelf={'center'}
    bg={'blue.500'}
    color={'white'}
    height={'45px'}
    mt={'5'}
    _hover={{
        bg: 'blue.600',
    }}
    onClick={()=>onOpen()}
    mb={4}
    >
        Enroll now
    </Button>
  }    

     </Flex>
     <Modal isOpen={isOpen} 
     onClose={onClose}
     >
        <ModalOverlay/>
        <ModalContent>
         <ModalHeader>
            <Text fontSize={'24px'} color={'blue.600'}>
                Enroll Course
            </Text>
         </ModalHeader>
         <ModalCloseButton 
         onClick={onClose}
         />
         <ModalBody>
            <FormControl 
            isRequired
            >
                <FormLabel>
                    Name
                </FormLabel>
                <Input
                value={name}
                onChange={(e)=>setname(e.target.value)}
                placeholder='Ex: sivashankar9178'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                />
            </FormControl>
            <FormControl 
            mt={'3'}
            isRequired
            >
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                placeholder='example@gmail.com'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                />
            </FormControl>
            <FormControl 
            mt={'3'}
            isRequired
            >
                <FormLabel>
                  Phone no
                </FormLabel>
                <Input
                placeholder='Ex: +910000000000'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                 value={phoneno}
                 onChange={(e)=>setphoneno(e.target.value)}
                />
            </FormControl>

         <Flex flexDir={'column'}
         alignItems={'center'}
         >

         <Button 
    width={'100%'}
    mx={'auto'}
    alignSelf={'center'}
    bg={'blue.500'}
    color={'white'}
    height={'45px'}
    mt={'5'}
    _hover={{
        bg: 'blue.600',
    }}
    onClick={createbatch}
    >
        Submit
    </Button>
     
     
    <Button 
    width={'100%'}
    mx={'auto'}
    alignSelf={'center'}
    bg={'red.400'}
    color={'white'}
    height={'45px'}
    mt={'2'}
    _hover={{
        bg: 'red.300',
    }}
    onClick={()=>onClose()}
    >
        Cancel
    </Button>

         </Flex>
         </ModalBody>
        </ModalContent>
     </Modal>
     </>
  )
}

export default Courseintrocontainer