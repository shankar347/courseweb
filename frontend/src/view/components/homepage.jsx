
import { Button, Flex, Image, keyframes, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import ailogo from '../../assets/ailogo.jpg'
import encypt from '../../assets/encrypted.png'
import encrypt1 from '../../assets/encrypted1.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import determin from '../../assets/determining.png'
import ui from '../../assets/friends.png'
import optim from '../../assets/optimization.png'
import usergather from '../../assets/profile.png'
import tracking from '../../assets/tracking.png'
import feedback from '../../assets/user-comments.png'
import Homepagedetail from './homepagedetail'
import Helphomecontainer from './helphomecontainer'
import Footer from './footer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import authatom from '../atom/authatom'
import { useMediaQuery } from 'react-responsive'
import Homenavmodel from './homenavmodel'
import { skillcontext } from './skillcontext'
import useratom from '../atom/useratom'
import usercourseatom from '../atom/usercourseatom'

const Homepage = () => {

  const scrollAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`

  const animation=`${scrollAnimation} 18s linear infinite `
  const animation2=`${scrollAnimation} 19s linear infinite `
  
  const checkscreen=useMediaQuery({maxWidth:'400px'})
  const {sidbaractive,setsidebaractive,
    // usercourse,setusercourse
 }=useContext(skillcontext)
  const navigate=useNavigate()
  const location=useLocation()
  const checkloation=location.pathname === '/'
  const [authstate,setuathstate]=useRecoilState(authatom)
  const [user1,setuser]=useRecoilState(useratom)
  const user=user1?.token
  const toast=useToast()
  const [usercourse,setusercourse] =useRecoilState(usercourseatom)
  // console.log(usercourse)
  console.log(user?.certificate)
  console.log(usercourse)
  
  // useEffect(()=>{
  //   setusercourse(null)
  // },[])

  useEffect(()=>{
    const getcertifcateinfo=async()=>{
      
      if(usercourse !== null)
      {
       return
      }

      if(user?.certificate === '')
      {
        return
      }

      try{
        const res=await fetch(`/api/course/url`,{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({url:user?.certificate})
        })
        const data=await res.json()
        if(data?.error)
        {
          toast({
            description:data?.error,
            status: 'error',
            duration:2000
          })
          return 
        }
        const res2=await fetch('/api/user',{
          method:'PUT',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({course:data})
        })
        const data2=await res2.json()
        if(data2?.error)
        {
          toast({
            description:data2?.error,
            status: 'error',
            duration:2000
          })
          return
        }
        var token=JSON.stringify({
          token:data2,
          expiresAt:user1?.expiresAt
        })

        localStorage.setItem('token',token)
        setuser(JSON.parse(token))
        setusercourse('Java')
        localStorage.setItem('usercourse','Java')      
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getcertifcateinfo()
  },[user?.certificate])





  return (
     <Flex flexDir={'column'}
     h={'auto'}
     pb={'0'}
     >
      <Flex flexDir={'column'} 
      height={'93vh'}
      overflow={'hidden'}
      position={'relative'}
      >
       {sidbaractive && checkloation && 
        <Homenavmodel/>}

    {/* main banner part   */}
    
            <Flex position={'absolute'}
        top={'0'}
        objectFit={'cover'}
        left={'0'}
        height={'100%'}
        width={'100%'}
        opacity={''}
        background={'rgba(0,0,0,0.5)'}
        zIndex={sidbaractive ? '0' : '1'}
        >
        </Flex>
       <Image  src={ailogo}
       h={'full'}
       />
        <Flex position={'absolute'} 
      top={{
        md:'28',
        lg:'28',
        base:'16',
        sm:'28'
      }}
      left={{
        md:'5',
        lg:'5',
        sm:'5',
        base:'3'
      }}
      flexDir={'column'}
      zIndex={'2'}
      >
        <Text color={'white'}
         fontSize={{
          md:'40px',
          lg:'40px',
          sm:'40px',
          base:'24px'
         }}
        // fontWeight={'bold'}
        textShadow={'3px 4px 6px gray'}
        >
        Unlock Your Future with skillPro
        </Text>
        <Text 
        mt={'50px'}
        color={'white'}
        fontSize={{
          md:'30px',
          lg:'30px',
          sm:'30px',
          base:'22px'
         }}
        textShadow={'3px 4px 6px gray'}
        > 
Smart Batch Allocation  {checkscreen ? '' : '& Training Progress Tracking'}
        </Text>
        <Flex   mt={{
          md:'150px',
          lg:'150px',
          sm:'150px',
          base:'120px'
        }} 
        flexDir={{
          md:'row',
          lg:'row',
          sm:'row',
          base:'column'
        }}
        >
        <Flex flexDir={'column'} 
          gap={{
            md:'40px',
            lg:'40px',
            sm:'40px',
            base:'20px'
          }}
       
        >
        <Text 
          color={'white'}
          fontSize={{
            md:'25px',
            lg:'25px',
            sm:'25px',
            base:'20px'
           }}
          textShadow={'3px 4px 6px gray'} 
        >
        Comprehensive Candidate Profiles
        </Text>
        <Text 
         color={'white'} 
         fontSize={{
          md:'25px',
          lg:'25px',
          sm:'25px',
          base:'20px'
         }}
         textShadow={'3px 4px 6px gray'}
       
        >
        Detailed Reporting
        </Text>
        <Text 
         color={'white'} 
         fontSize={{
          md:'25px',
          lg:'25px',
          sm:'25px',
          base:'20px'
         }}
         textShadow={'3px 4px 6px gray'}
        
        >
        Real-Time Feedback Collection
        </Text>
        </Flex>
        <Flex height={''}
        ml={{
          md:'200px',
          lg:'200px',
          sm:'100px',
          base:'0'
        }}
        mt={{
          md:'0px',
          lg:'0px',
          sm:'0px',
          base:'40px'
        }}
        alignItems={'end'}
        // width={'full'}
        justify={'center'}
        gap={'50px'}
        >
         <Button 
         _hover={{
          bg:'blue.200'
         }}
        //  className='explorebtn'
         borderRadius={'5px'}
         bg={'rgba(75, 144, 255, 0.767)'}
        //  className='navbar'
         color={'gray.200'}
         width={{
          md:'170px',
          lg:'170px',
          sm:'14  0px',
          base:'140px'
         }}
         height={'50px'}  
         onClick={()=>navigate('/courses')}
         >
          Get Started
         </Button>
         <Button 
          _hover={{
            bg:'red.200'
           }}
         color={'gray.200'}

          borderRadius={'5px'}
          bg={'red.400'}
          width={{
            md:'170px',
            lg:'170px',
            sm:'14  0px',
            base:'140px'
           }}
          height={'50px'}
          onClick={()=>{navigate('/auth')
            setuathstate('Register')
          }}
         >
          Sign Up
         </Button>
        </Flex>
        </Flex>
      </Flex>
       {/* end of banner */}

      </Flex>
      <Flex mt={'2'}
      ml={'2'}
      fontSize={'20px'}
      fontWeight={'650'}
      >
        Features of skillPro
      </Flex>
      <Flex 

      mt={'12'}
     overflowX={'hidden'}
     maxW={'100%'}  
     width={'full'}
     >
    <Flex
          animation={animation}
          mx={{
            md:'16',
            lg:'16',
            sm:'16',
            base:'2'  
          }}
          gap={'40'}
          display={'inline-flex'}
          whiteSpace={'nowrap'}

    >
    <Homepagedetail image={encypt} 
      header={'Smart Batch Allocation'}
      descreption1={'Automatically assign candidates to '}
      descreption2={'batches based on certifications'}
      />
      <Homepagedetail image={determin}
      header={'Progress Tracking'}
      descreption1={'Monitor course completion, evaluation '}
      descreption2={'scores, and feedback'}
      />
      <Homepagedetail image={tracking} 
       header={'Detailed Reporting'}
       descreption1={'Gain insights with comprehensive '}  
      descreption2={'reporting and analysis'}
      />
      <Homepagedetail image={github} 
      header={'Integration with  GitHub'}
      descreption1={'Seamlessly validate candidate skills'}
      descreption2={'from GitHub'}
      />
       <Homepagedetail image={encrypt1} 
      header={'Comprehensive profiles'}
      descreption1={' Collect essential details including '}
      descreption2={'certifications and  internships'}
      />
    </Flex>
      </Flex>
      <Flex 

mt={'12'}
overflowX={'hidden'}
maxW={'100%'}  
width={'full'}
>
<Flex
    animation={animation2}
    mx={{
      md:'16',
      lg:'16',
      sm:'16',
      base:'2'  
    }}
    gap={'40'}
    display={'inline-flex'}
    whiteSpace={'nowrap'}
>
      <Homepagedetail image={optim} 
      header={'eCertificate Uploads'}
      descreption1={'Candidates can upload eCertificates'}
      descreption2={'for Internship'}
      />
      <Homepagedetail  image={feedback}
      header={'Real-Time Feedback Collection'}
      descreption1={'Collect feedback from candidates in '}
      descreption2={'real-time to improve training'}
      />
      <Homepagedetail image={linkedin}
      header={'Integration with LinkedIn'}
      descreption1={' Seamlessly validate candidate profiles '}
      descreption2={'from LinkedIn'}
      />
      <Homepagedetail image={ui}
      header={'User-Friendly Interface'}
      descreption1={'Intuitive and easy-to-navigate interface'}
      descreption2={'for candidates'}
      />
      <Homepagedetail image={usergather} 
      header={'Data Security & Privacy'}
      descreption1={'Robust measures to ensure that candidate '}
      descreption2={'data is securely stored'}
      />
      </Flex>
      </Flex>
      <Text 
      mt={'10'}
      textAlign={'center'}
       fontSize={'20px'}
       fontWeight={'650'}
      >
        Healp and Contact
      </Text>
      <Helphomecontainer/>
      <Footer/>
     </Flex>
  )
}

export default Homepage