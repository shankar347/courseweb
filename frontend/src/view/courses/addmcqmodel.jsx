import { Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'

const Addmcqmodel = ({lessonnumber,questionnumber,
   question,setquestion,
   answer,setanswer,
   option,setoption
}) => {

  return (
    <Flex 
    flexDir={'column'}
    gap={'2'}
    mt={'2'}
    mb={'10'}
    >
   <Flex 
     flexDir={'column'}
     gap={'1'}
     >
        <Text 
        fontSize={'15'}
        fontWeight={'650'}
        color={'blue.600'}
        >
           Lesson {lessonnumber+1} MCQ's
        </Text>
     </Flex>
      
    
     <Flex
     flexDir={'column'}
     gap={'1'}
     mt={'5'}
     >
        <Text
        fontSize={'15'}
        fontWeight={'650'}
        color={'blue.600'}
        >
          Question {questionnumber+1}
        </Text>
        <Input
        value={question}
        onChange={(e)=>setquestion(e.target.value,lessonnumber,questionnumber)}
        border={'3px solid'}
        borderColor={'gray.400'}
        />
     </Flex>
     <Flex gap={'2'} 
     flexWrap={'wrap'}
     width={'100%'}
     mx={'auto'}
     alignSelf={'center'}
     justifySelf={'center'}
     alignItems={'center'}
     justify={'center'}
     >
     {
      option?.map((option,index)=>(
         <Flex flexDir={'column'}
     gap={'1'}
     key={index}
     width={'48%'}
     >
     <Text 
       fontSize={'15'}
       fontWeight={'550'}
       color={'blue.600'}
     >
        Option {index+1}
     </Text>
     <Input 
       value={option?.option}
        border={'3px solid'}
        borderColor={'gray.400'}
        onChange={(e)=>setoption(e.target.value,lessonnumber,questionnumber,
         index
        )}
     />
     </Flex>
      ))
     }
     {/* <Flex flexDir={'column'}
     gap={'1'}
     >
     <Text 
       fontSize={'15'}
       fontWeight={'550'}
       color={'blue.600'}
     >
        Option 2
     </Text>
     <Input 
        border={'3px solid'}
        borderColor={'gray.400'}
     />
     </Flex>
    </Flex> 
    <Flex gap={'2'}>
     <Flex flexDir={'column'}
     gap={'1'}
     >
     <Text 
       fontSize={'15'}
       fontWeight={'550'}
       color={'blue.600'}
     >
        Option 3
     </Text>
     <Input 
        border={'3px solid'}
        borderColor={'gray.400'}
     />
     </Flex>
     <Flex flexDir={'column'}
     gap={'1'}
     >
     <Text 
       fontSize={'15'}
       fontWeight={'550'}
       color={'blue.600'}
     >
        Option 4
     </Text>
     <Input 
        border={'3px solid'}
        borderColor={'gray.400'}
     />
     </Flex> */}
    </Flex> 
    <Flex
     flexDir={'column'}
     gap={'1'}
     mt={'0'}
     >
        <Text
        fontSize={'15'}
        fontWeight={'650'}
        color={'blue.600'}
        >
          Answer {questionnumber+1}
        </Text>
        <Input
        value={answer}
        onChange={(e)=>setanswer(e.target.value,lessonnumber,questionnumber)}
        border={'3px solid'}
        borderColor={'gray.400'}
        />
     </Flex>
    </Flex>
  )
}

export default Addmcqmodel