import { Flex, Image } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import img from '../../assets/customer-service.png'
import { useRecoilState } from 'recoil'
import reportatom from '../atom/reportatom'
import { skillcontext } from './skillcontext'

const Reports = () => {
   
  const [userreport,setreports]=useRecoilState(reportatom)
  // console.log(reports.length)

  const {course}=useContext(skillcontext)

  console.log(userreport)

  return (
     <Flex flexDir={'column'}
     >
         {
          !userreport ? (
            <Flex 
            height={'93vh'}
            gap={'5'} 
            alignSelf={'center'}
            alignItems={'center'}
            justifySelf={'center'}
            >
              <Image src={img}  
              width={{
                md:'200px',
                lg:'200px',
                sm:'200px',
                base:'150px'
              }}
            //   alignSelf={'end'}
              height={{
                md:'200px',
                lg:'200px',
                sm:'200px',
                base:'150px'
              }}
              /> 
            <Flex 
            // alignSelf={'end'}
            mt={{
                md:'36',
                lg:'36',
                sm:'36',
                base:'20'}}
            flexDir={'column'}
            gap={'2'}
            >
  <Flex 
              // flexDir={'colu'}
              fontWeight={'550'}
              fontSize={'18px'}
              >
                  No Reports yet
              </Flex>
              <Flex 
               fontWeight={'550'}
               fontSize={'16px'}
               color={'blue.600'}
               _hover={{
                 textDecoration:'underline'
               }}
               alignSelf={'center'}
              >
                Go to courses
                </Flex>
              </Flex>
            </Flex> 
          )
          : 
          <Flex 
          flexDir={'column'}
          width={{
            md:'500px',
            lg:'500px',
            sm:'500px',
            base:'full'
          }}
          mx={'auto'}
          mt={'2'}
          pl={'5'}
          // alignSelf={'center'}
          // alignItems={'center'}
          >

         <Flex
         fontWeight={'650'}
         fontSize={'18'}
         mt={{
          md:'16',
          lg:'16  ',
          base:'2',
          sm:'10'
         }}
         color={'blue.700'}
         alignSelf={'center'}
         >

          Course Report
          </Flex>

      <Flex 
             fontWeight={'550'}
             fontSize={'15'}
             mr={'3'}
             mt={'2'}
             mb={'5'}
             alignSelf={'end'}
            //  bg={'blue'}
             >
              {userreport?.date}
              </Flex>
           <Flex
           gap={'2'}
          pl={'2'}
          alignItems={'baseline'}
    >
            <Flex
            fontSize={'15'}
            fontWeight={'550'}
            color={'blue.700'}
            width={'74px'}
            
            >
              Name
             </Flex>
             <Flex 
             fontWeight={'550'}
             >
              {userreport?.username}
              </Flex>
            </Flex>
    
            <Flex
            fontSize={'15'}
            mt={'2'}
           gap={'2'}
          pl={'2'}
    >
            <Flex
            fontWeight={'550'}
            color={'blue.700'}
            alignItems={'baseline'}
            width={'74px'}
            
            >
              Email
             </Flex>
             <Flex 
             fontWeight={'550'}
             >
              {userreport?.email}
              </Flex>
            </Flex>
            <Flex
            fontSize={'15'}
            mt={'2'}
           gap={'2'}
          pl={'2'}
    >
            <Flex
            fontWeight={'550'}
            color={'blue.700'}
            alignItems={'baseline'}
            width={'74px'}
            
            >
              College
             </Flex>
             <Flex 
             fontWeight={'550'}
             >
              {userreport?.college}
              </Flex>
            </Flex>
            <Flex
            fontSize={'15'}
            mt={'2'}
           gap={'2'}
          pl={'2'}
    >
            <Flex
            fontWeight={'550'}
            color={'blue.700'}
            alignItems={'baseline'}
            width={'74px'}
            
            >
              Degree
             </Flex>
             <Flex 
             fontWeight={'550'}
             >
              {userreport?.degree}
              </Flex>
            </Flex>
    
            <Flex
            fontSize={'15'}
            mt={'2'}
           gap={'2'}
          pl={'2'}
    >
            <Flex
            fontWeight={'550'}
            color={'blue.700'}
            alignItems={'baseline'}
            width={'74px'}
            >
             Total Mark
             </Flex>
             <Flex 
             fontWeight={'550'}
             >
              {userreport?.totalmarks}
              </Flex>
            </Flex>
            <Flex
            fontSize={'15'}
            mt={'2'}
           gap={'2'}
          pl={'2'}
    >
            <Flex
            fontWeight={'550'}
            color={'blue.700'}
            alignItems={'baseline'}
            width={'74px'}
            >
               Title
             </Flex>
             <Flex 
             fontWeight={'550'}
             >
              {course?.title}
              </Flex>
            </Flex>
            <Flex
               fontSize={'15'}
               mt={'5'}
              gap={'2'}
             pl={'2'}
             fontWeight={'550'}
             color={'blue.800'}
            >
              Topic Recomendations
            </Flex>
    
            {
              userreport?.report?.map((report,i)=>(
                <Flex
                gap={'4'}
                key={i}
                mt={'2'}
                >
                <Flex 
                width={'7px'}
                height={'7px'}
                bg={'blue.600'}
                mt={'10px'}
                alignSelf={'start'}
                borderRadius={'50px'}
                >
                </Flex>
                <Flex 
                fontSize={{
                 md:'16px',
                 lg:'16px',
                 sm:'16px',
                 base:'14px'
                }}
                fontWeight={'550'}
                width={'90%'}
                >
                {report}   
                </Flex>
               </Flex> 
              ))
            }
    
            
          
          
            </Flex>
         }
     </Flex>
  )
}

export default Reports