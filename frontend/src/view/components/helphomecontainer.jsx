import { Button, Flex, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import ailogo from '../../assets/chip.png'
import { useMediaQuery } from 'react-responsive'

const Helphomecontainer = () => {

  const checkscreen=useMediaQuery({maxWidth:'400px'})

  const [email,setemail]=useState('')
  const [descreption,setdescreption]=useState('')

  const toast=useToast()

  const handlechange=()=>{
    if(!email || !descreption)
    {
      toast({
        description:"Provide email and your problem",
       status:'error',
       duration:2000
      })
      return
     }
     setemail('')
     setdescreption('')
     window.open('https://docs.google.com/forms/d/e/1FAIpQLSfW0dKm8u2CkYWg8LmwjXfWS834LXxon3l6GQNdLRFI9PNClw/viewform?usp=sf_link','_blank')
  }

  return (
    <Flex flexDir={'row'}
    mx={{
      md:'40',
      lg:'40',
      sm:'20',
      base:'2'
    }}
    mt={'10'}
    color={'gray'}
    boxShadow={'0px 0px 10px 0px'}
    mb={'5'}
    py={'4'}
    px={{
      md:'5',
      lg:'5',
      sm:'5',
      base:'2'
    }}
    gap={'5'}
    >
    {
      !checkscreen &&
      <Image 
      visibility={{
       md:'visible',
       lg:'visible',
       sm:'visible',
       base:'hidden'
      }}
      alignSelf={'center'}
      src={ailogo}
      width={'250px'}
      height={'250px'}
      />
    }
     <Flex flexDir={'column'}>
     <Text color={'black'}
     fontSize={'20px'}
     fontWeight={'550'}
     >
     Need Assistance?
     </Text>
     <Text 
     mt={'3'}
     color={'black'}
     fontSize={'16px'}
     fontWeight={'550'}
     >
     We’re here to help you with any questions or concerns.
     {checkscreen ? '' : ' Reach out to us for support or check out our FAQs.'}
     </Text>
     <Flex 
     mx={{
      md:'32',
      lg:'32',
      sm:'18',
      base:'2'
     }}
     mt={'10'}
     flexDir={'column'}
     gap={'5'}
     >
     <Input
     value={email}
     onChange={(e)=>setemail(e.target.value)}
     type='email' 
     height={'40px'}
     placeholder='Enter your email'
     border={'2px solid '}
     borderColor={'blue.400'}
     />
    <Flex flexDir={'column'}
    width={'full'}
    gap={2}
    >
    <Textarea 
    value={descreption}
    onChange={(e)=>setdescreption(e.target.value)}
     border={'2px solid '}
     borderColor={'blue.400'}
     placeholder='Explain your problem with our application'
    />
     <Button 
     width={'32'}
     height={'42px'}
     _hover={{
      bg:"blue.200"
     }}
     bg={'blue.300'}
     alignSelf={'end'}
     justifySelf={'right'}
     onClick={handlechange}
     >
        Submit
     </Button>
    </Flex>
     </Flex>
    </Flex> 
    </Flex>
  )
}

export default Helphomecontainer