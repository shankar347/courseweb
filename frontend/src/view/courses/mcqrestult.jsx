import { Button, Flex, Image, Input, Spinner, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import goldstar from '../../assets/medal.png'
import silverstar from '../../assets/silver.png'
import bronzestar from '../../assets/bronze.png'
import { skillcontext } from '../components/skillcontext'
import { useParams } from 'react-router-dom'

const Mcqrestult = () => {
  
      
       
      const {course,setcourse} = useContext(skillcontext)
      console.log(course)
    
      const [rating,setrating]=useState('')
      const [loadings,setloading]=useState(false)
    
      const {id} =useParams()
    //   console.log(id)
   
    const toast=useToast()

        const updatecourse=async()=>{
        
            try{
              setloading(true)
              const res=await fetch(`/api/course/${course._id}/${id}`,{
                method:'PUT',
                headers:{
                  'content-type':'application/json'
                },
                body:JSON.stringify({
                 rating:rating
                })
              })
              const data=await res.json()
              console.log(data)
              if(data?.error)
              {
               toast({
                description:data?.error,
                status:'error',
                duration:2000
               }) 
               return
              }
              toast({
                description:"Response submitted",
                status:'success',
                duration:2000
              })
              setcourse(data)
            }
            catch(err)
            {
              console.log(err)
            }
            finally{
              setloading(false)
            }
           }

      
        const {totalmarks} =useContext(skillcontext)
        

    

    return (
     <Flex flexDir={'column'}>
       <Flex 
       mt={'5'}
       fontFamily={'sans-serif'}
       fontSize={'32px'}
       color={'blue.700'}
       alignSelf={'center'}
       textShadow={'2px 3px 4px gray'}
       fontWeight={'550'}
       >
        {totalmarks >=4 ? 'Congrulations!' : totalmarks>=2 ? 
        'Good Try Champ!' : 'Better Luck Champ!' }
       </Flex>
       

{
    totalmarks >= 4 &&
    <Flex 
    mt={'16'}
    gap={'5'}
    alignSelf={'center'}
    >
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={goldstar} 
      width={'150px'}
      height={'150px'}
      transform={'rotate(-20deg)'}
     />
     </Flex>
          <Flex flexDir={'column'}
     alignItems={'center'}
     mt={'-10'}
     >
     <Image src={goldstar} 
      width={'150px'}
      height={'150px'}
     />
     
     </Flex>
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={goldstar} 
      width={'150px'}
      height={'150px'}
     transform={'rotate(20deg)'}
     />
    </Flex>

    </Flex>
}

{
    totalmarks >= 2 && totalmarks <=3 &&
    <Flex 
    mt={'16'}
    gap={'5'}
    alignSelf={'center'}
    >
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={silverstar} 
      width={'150px'}
      height={'150px'}
      transform={'rotate(-20deg)'}
     />
     </Flex>
          <Flex flexDir={'column'}
     alignItems={'center'}
     mt={'-10'}
     >
     <Image src={silverstar} 
      width={'150px'}
      height={'150px'}
     />
     
     </Flex>
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={silverstar} 
      width={'150px'}
      height={'150px'}
     transform={'rotate(20deg)'}
     />
    </Flex>

    </Flex> 
}


{
    totalmarks <2 &&
    <Flex 
    mt={'16'}
    gap={'5'}
    alignSelf={'center'}
    >
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={bronzestar} 
      width={'150px'}
      height={'150px'}
      transform={'rotate(-20deg)'}
     />
     </Flex>
          <Flex flexDir={'column'}
     alignItems={'center'}
     mt={'-10'}
     >
     <Image src={bronzestar} 
      width={'150px'}
      height={'150px'}
     />
     
     </Flex>
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={bronzestar} 
      width={'150px'}
      height={'150px'}
     transform={'rotate(20deg)'}
     />
    </Flex>

    </Flex>
}

    <Flex
    fontSize={'19px'}
    fontWeight={'550'}
    alignSelf={'center'}
    mt={'5'}
    >
    You scored {totalmarks} out of 5
    </Flex>
    <Flex 
    mt={'4'}
    cursor={'pointer'}
    _hover={{
        textDecoration:'underline'
    }}
    alignSelf={'center'}
    fontSize={'15px'}
    fontWeight={'550'}
    color={'blue.700'}
    textAlign={'center'}
    onClick={()=>window.open('https://docs.google.com/forms/d/e/1FAIpQLSdwPvPRk2I4JEM368_Iib2w7BBJ16R65IkRm8fwNq-aCxvfiQ/viewform?usp=sf_link','_blank')}
    >
        Proivde Feedback
    </Flex>

   <Flex
   fontWeight={'550'}
   alignSelf={'start'}
   mt={'5'}   
   ml={'5'}
   >
    Give Rating to the lesson
   </Flex>
    <Flex 
    flexDir={'column'}
    width={'200px'}
     mx={'auto'}
>
    <Input
     value={rating}
     onChange={(e)=>setrating(e.target.value)}
     type='text'
     border={'2px solid'}
     borderColor={'blue.400'}
    width={'full'}
     mx={'auto'}
     mt={'4'}
     placeholder='Between 1 and 10'
    />
    <Button
    fontWeight={'550'}
    width={'20'}
    color={'white'}
    mt={'2px'}
    h={'32px'}
    borderRadius={'4'}
    bg={'blue.500'}
    _hover={{
        bg:'blue.300'
    }}
    onClick={updatecourse}
    alignSelf={'end'}
    >
        {loadings ? <Spinner/> : "Submit"}
    </Button>
    </Flex>
     </Flex>
  )
}

export default Mcqrestult