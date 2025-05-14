import { Button, Flex, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import lessonatom from '../atom/lessonatom'
import { skillcontext } from '../components/skillcontext'
import useratom from '../atom/useratom'
import reportatom from '../atom/reportatom'

const Coursereport = () => {

  const lessonstate=useRecoilValue(lessonatom)
  // console.log(lessonstate)
  const {course,} = useContext(skillcontext)

  const [userreport,setuserreport]=useRecoilState(reportatom)
  console.log(userreport)
  
  const toast=useToast()

  const user1=useRecoilValue(useratom)
  const user=user1?.token
  // console.log(usercourse?.title)

  useEffect(()=>{
    const getuserreport=async()=>{
      
      if(!course?.name)
      {
        return
      }

      if(userreport !== null)
      {
        return
      }
 
    
      if(lessonstate === 100)
      {
        return
      }
      
      try{
       const res=await fetch('/api/course/report',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },

        body:JSON.stringify({
          username:user?.name,
          email:user?.email,
          degree:user?.degree,
          college:user?.college,
          coursetitle:course?.name,
          totalmarks:user?.totalmarks,
        })
       })
       const data=await res.json()
       if(data?.error)
        {
         toast({
          description:data?.error,
          status:'error',
          duration: 2000,
         })
         return
        }  
        setuserreport(data)
        localStorage.setItem('report',JSON.stringify(data))
      }
      catch(err)
      {
        console.log(err)
      }
     
    }
    getuserreport()
  },[lessonstate,course?.title,userreport])



  const generatereportpdf=async()=>{
    try{
      const res=await fetch(`/api/course/report/${userreport?._id}`,{
      method:'GET',
      headers:{
        'content-type':'application/pdf'
      }
      })

      if (!res.ok)
      {
        toast({
          description: 'Error generating report',
          status: 'error',
          duration: 2000,
        })
        return
      }
      const blob = await res.blob()
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      console.log(url)
      a.href=url
      a.download = 'report.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()


      window.URL.revokeObjectURL(url)

    }
    catch(err)
    {
      console.log(err)
    }
  }

  
  return (
    <Flex 
     flexDir={'column'}    
    >
        <Flex 
        // ml={'5'}
        mt={'2'}
        fontSize={'18px'}
        fontWeight={'650'}
        color={'blue.700'}
        alignSelf={'center'}
        >
            Your course report
        </Flex>
     {
      lessonstate === 100 ? 
      <Flex
      flexDir={'column'}
      fontSize={'15px'}
      fontWeight={'550'}
      alignSelf={'center'}
      height={'75vh'}
      color={'blue.700'}
      justify={'center'}
      justifyItems={'center'}
      justifySelf={'center'}
      >
       Course is not completed yet
      </Flex>
      : <Flex 
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
         fontWeight={'550'}
         fontSize={'15'}
         mr={'3'}
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

        
        <Button 
         my={'5'}
         alignSelf={'end'}
         mr={'3'}
         fontSize={'15px'}
         bg={'blue.500'}
         h={'44px'}
         _hover={{
          bg: 'blue.600',
         }}
        //  py={'10px'}
         width={'36'}
         color={'white'}
        onClick={generatereportpdf}
        >
          Download Report
        </Button>
        <Flex
        fontSize={'15'}
        fontWeight={'550'}
        color={'blue.700'}
        mb={'4'}
        _hover={{
          textDecoration:'underline'
        }}
        alignSelf={'center'}
        cursor={'pointer'}
        onClick={()=>window.open('https://docs.google.com/forms/d/e/1FAIpQLSfW0dKm8u2CkYWg8LmwjXfWS834LXxon3l6GQNdLRFI9PNClw/viewform?usp=sf_link','_blank')}
        >
          Proivde Feedback 
          </Flex> 
        </Flex>
     }
    </Flex>
  )
}

export default Coursereport