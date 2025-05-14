import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import goldstar from '../../assets/medal.png'
import silverstar from '../../assets/silver.png'
import bronzestar from '../../assets/bronze.png'
import { skillcontext } from '../components/skillcontext'

const Leaderboardcontainer = () => {

  const {batchtoppers} = useContext(skillcontext)
  console.log(batchtoppers) 
  
  return (
    <Flex flexDir={'column'}
    alignItems={'center'}
    width={'full'}
    >
         <Flex
     gap={'1'}
     flexDir={'column'}
     alignSelf={'start'}
      alignItems={'center'}
     >
     <Flex mt={'4'}
      ml={'4'}
      fontSize={'lg'}
      fontWeight={'550'}
      >
        Leaderboard (Batch wise)
      </Flex>
      <Flex
    width={'90px'}
    height={'3.5px'}
    bg={'blue.600'}
    // ml={'5px'}
    borderRadius={'5px'}
    >
    </Flex>
     </Flex> 
     <Flex 
    mt={'5'}
    gap={'2'}
    >
     <Flex flexDir={'column'}
     alignItems={'center'}
    
>
     <Image src={silverstar} 
      width={'150px'}
      transform={'rotate(-20deg)'}
      height={'150px'}
     />
      <Flex fontSize={'md'}
      fontWeight={'550'}
      >
         {batchtoppers && batchtoppers?.length >1  && 
        batchtoppers[1].name}
      </Flex>
     </Flex>
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={goldstar} 
      width={'150px'}
      height={'150px'}
      mt={'-5'}
     />
      <Flex fontSize={'md'}
      fontWeight={'550'}
      mt={'5'}
      >
              {batchtoppers && batchtoppers?.length >0  && 
        batchtoppers[0].name}
      </Flex>
     </Flex>
     <Flex flexDir={'column'}
     alignItems={'center'}
     >
     <Image src={bronzestar} 
     transform={'rotate(20deg)'}
width={'150px'}
      height={'150px'}
     />
      <Flex fontSize={'md'}
      fontWeight={'550'}
      >
     {batchtoppers && batchtoppers?.length >2  && 
        batchtoppers[2].name}
      </Flex>
    </Flex>
    </Flex>
     <Flex 
     alignSelf={'start'}
     mt={'5'}
     mx={'auto'}
     >
     <Text fontWeight={'550'}
        fontSize={
          {md:'19px',
          lg:'19px',
          sm:'19px',
          base:'17px'  
        }
        }
        color={'blue.600'}
        mt={'2'}
        textAlign={'center'}
        width={{
          md:'200px',
          lg:'200px',
          sm:'200px',
          base:'50px'}}
        >
        Rank 
        </Text>
        <Text fontWeight={'550'}
       fontSize={
        {md:'19px',
        lg:'19px',
        sm:'19px',
        base:'17px'  
      }
      }
        color={'blue.600'}
        mt={'2'}
        textAlign={'center'}
        width={{
          md:'500px',
          lg:'500px',
          sm:'500px',
          base:'230px'
        }}
        >
          Username
        </Text>
        <Text fontWeight={'550'}
        fontSize={
          {md:'19px',
          lg:'19px',
          sm:'19px',
          base:'17px'  
        }
        }
        color={'blue.600'}
        mt={'2'}
        textAlign={'center'}
        width={{
          md:'200px',
          lg:'200px',
          sm:'200px',
          base:'50px'}}
        >
          Mark
        </Text>
     </Flex>
    {
     batchtoppers && batchtoppers?.length >=1 ?  batchtoppers?.map((student,i)=>(
        <Flex mt={'4'}
        mx={'auto'}
       key={i}
       >
        <Text fontWeight={'550'}
           fontSize={'17px'}
           // color={'blue.600'}
           mt={'2'}
           width={{
             md:'200px',
             lg:'200px',
             sm:'200px',
             base:'50px'}}
           color={'black'}
           textAlign={'center'}
           // width={'200px'}
           >
           {i+1}
           </Text>
           <Text fontWeight={'550'}
           fontSize={'17px'}
           // color={'blue.600'}
           mt={'2'}
           textAlign={'center'}
           width={{
             md:'500px',
             lg:'500px',
             sm:'500px',
             base:'230px'
           }}
           >
           {student?.name}
           </Text>
           <Text fontWeight={'550'}
           fontSize={'17px'}
           // color={'blue.600'}
           mt={'2'}
           textAlign={'center'}
           width={{
             md:'200px',
             lg:'200px',
             sm:'200px',
             base:'50px'}}
           >
            {student?.totalmarks}
           </Text>
        </Flex>
      )) :
       <Text fontWeight={'550'} mt={'32'}  > No Batch is Allocated yet </Text>
    }
    </Flex>
  )
}

export default Leaderboardcontainer