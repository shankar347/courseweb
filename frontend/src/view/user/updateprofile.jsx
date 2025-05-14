import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useToast } from '@chakra-ui/react'
import React, { act, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'

const Updateprofile = ({isOpen,onClose,onOpen}) => {


    const [actions,setactions]=useState({
       name:'',
       email:'',
       phoneno:'',
       github:'',
       linkedin:'',
    })

    const toast=useToast()
    const [user1,setuser]=useRecoilState(useratom)
    const user=user1?.token

    const handleupdate=async()=>{
        try{
         
            if(!actions.name && !actions.email && !actions.github
                && !actions.linkedin && !actions.phoneno 
            )
            {
                toast({
                    status:'error',
                    description:"Provide any field to update",
                    duration:2000
                })
                return
            }
            
          const res=await fetch('/api/user/',{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(actions)
          })    
          const data=await res.json()
          if(data?.error)
          {
            toast({
              description:data?.error,
              status:'error',
              duration:2000
            })
            return
          }
          var token=JSON.stringify({
            token:data,
            expiresAt:user1?.expiresAt
          })
          localStorage.setItem('token',token)
          setuser(JSON.parse(token)) 
          onClose()           
        }  
        catch(err)
        {
          console.log(err)
        }
      }

  return (
    <>
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
            // isRequired
            >
                <FormLabel>
                    Name
                </FormLabel>
                <Input
                placeholder='Ex. sivashankar9178'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                 value={actions.name}
                 onChange={(e)=>setactions({
                    ...actions,name:e.target.value
                 })}
                />
            </FormControl>
            <FormControl 
            mt={'3'}
            // isRequired
            >
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                placeholder='example@gmail.com'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                value={actions.email}
                onChange={(e)=>setactions({
                    ...actions,email:e.target.value
                 })}
                />
            </FormControl>

            <FormControl 
            mt={'3'}
            // isRequired
            >
                <FormLabel>
                    phone no
                </FormLabel>
                <Input
                placeholder='Ex.9121313131'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                 value={actions.phoneno}
                 onChange={(e)=>setactions({
                    ...actions,phoneno:e.target.value
                 })}
                />
            </FormControl>
  
            <FormControl 
            mt={'3'}
            
            >
                <FormLabel>
                    Github
                </FormLabel>
                <Input
                placeholder='Enter github link'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                 value={actions.github}
                 onChange={(e)=>setactions({
                    ...actions,github:e.target.value
                 })}
                />
            </FormControl>
            <FormControl 
            mt={'3'}
            // isRequired
            >
                <FormLabel>
                    Linkedin
                </FormLabel>
                <Input
                placeholder='Enter Linkedin link'
                border={'2px solid '}
                borderColor={'gray.300'}
                 width={'100%'}
                 value={actions.linkedin}
                 onChange={(e)=>setactions({
                    ...actions,linkedin:e.target.value
                 })}
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
     onClick={handleupdate}
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

export default Updateprofile