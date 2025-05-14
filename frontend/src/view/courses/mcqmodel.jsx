import { Button, Flex } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { skillcontext } from '../components/skillcontext'

const Mcqmodel = ({test,index}) => {

   const [isselected,setisselected]=useState(null)
   
   const {totalmarks,settotalmarks,
    selected,setselected
   } =useContext(skillcontext)
   let answer=test?.answer 
  //  console.log(totalmarks)
   
   
   const handleselcted=(index)=>{
    setisselected(index)
    setselected(true)
   if(test?.options[index]?.option === answer)
   {
    settotalmarks((prevmark)=>
    // index !== index +1  &&
     prevmark+1
    )
   }
  }
  
  console.log(answer)



  return (
    <Flex flexDir={'column'}
    width={'100%'}
    mx={'auto'}
    mt={'5'}
    >

      <Flex
    mx={'3'}
    gap={'1'}
      >
      <Flex 
    flexDir={'column'}
    fontSize={{
      md:'18px',
      lg:'18px',
      sm:'18px',
      base:'16px'
    }}
    // alignSelf={'center'}
    fontWeight={'550'}
    >
    {index+1}.
    </Flex>
    <Flex 
       fontSize={{
        md:'18px',
        lg:'18px',
        sm:'18px',
        base:'16px'
      }}
      alignSelf={'center'}
      fontWeight={'550'}
    >
    {test?.question}
    </Flex>
    </Flex>
      <Flex flexDir={'column'}
    ml={{
      md:'10',
      lg:'10',
      sm:'10',
      base:'2'
    }}
    mt={'5'} 
    gap={'5'}
    alignItems={'center'}
    >
    {
      test?.options?.map((option,i)=>(
        <Flex mt={''}
        fontSize={'16px'}
        fontWeight={'550'}
        minH={'40px'}
        alignItems={'center'}
        width={{
         md:'35%',
         lg:'35%',
         sm:'35%',
         base:'85%'
        }}
        cursor={'pointer'}
        pl={'2'}
        border={'2px solid'}
        borderColor={'blue.300'}
        borderRadius={'5px'}
      //   bg={isselected === i ? (option?.option === answer 
      //     ? 'green.300' : 'red.300'
      //   ) : ''
      // }
      bg={isselected === i ? 'blue.400' : ''}
        onClick={()=>{
            handleselcted(i)
       }}
       key={i}
       justifyItems={'start'}
       justifySelf={'start'}
       justifyContent={'start'}
      //  disabled={isselected}
      //  aria-disabled={!isselected}
       _disabled={selected} 
      >
      {i+1}) {option?.option}
        </Flex>
      ))
    }
    </Flex>
    </Flex>
  )
}

export default Mcqmodel