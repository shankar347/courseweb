import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import Dashboardsidebar from './dashboardsidebar'
import Dashboardcontainer from './dashboardcontainer'
import Leaderboardcontainer from './leaderboardcontainer'
import Reportcontainer from './reportcontainer'
import Trackprogress from './track-progress'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { skillcontext } from '../components/skillcontext'
import Dashboardnavmodel from './dashboardnavmodel'
import { useRecoilValue } from 'recoil'
import batchatom from '../atom/batchatom'
import usercourseatom from '../atom/usercourseatom'
import useratom from '../atom/useratom'
import lessonatom from '../atom/lessonatom'

const Dashboard = () => {
  const {sidbaractive,setsidebaractive,
    batchtoppers,setbatchtoppers,
    studenttoppers,setstudenttoppers,
    collegetoppers,setcollegetoppers
  }=useContext(skillcontext)

   const navigate=useNavigate()
   const location=useLocation()
   const checkloation=location.pathname.startsWith('/dashboard')
   const batchname=useRecoilValue(batchatom)
   const toast=useToast()
   const coursename=useRecoilValue(usercourseatom)
   const user1=useRecoilValue(useratom)
   const user=user1?.token
   // console.log(coursename)
   console.log(batchname)
   
  
  
   useEffect(()=>{
    const getbatchtopper=async()=>{
       if(batchname === null)
       {
        return
       }
      try{
       const res=await fetch(`/api/batch/topper/${batchname}`)
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
      setbatchtoppers(data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getbatchtopper()
   },[batchname])

  
   useEffect(()=>{
    const getcoursetopper=async()=>{
       if(coursename === null || batchname === null)
       {
        return
       }
      try{
       const res=await fetch(`/api/user/course/topper/${coursename}`)
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
      setstudenttoppers(data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getcoursetopper()
   },[coursename]
  )

  
  useEffect(()=>{
    const getcollegetopper=async()=>{
       if(user?.college === null || user?.college === '' ||
        !user?.college
       )
       {
        return
       }
     
       if(batchname === null)
       {
        return
       }
       
      try{
       const res=await fetch(`/api/user/topper/${user?.college}`)
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
      setcollegetoppers(data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getcollegetopper()
   },[user?.college])


  return (
   <Flex 
    height={'93vh'}>
    <Box 
        h={'full'}
        visibility={{
         md:'visible',
         lg:'visible',
         sm:'visible',
         base:'hidden'
        }}
        w={{
          md:'15%',
          lg:'15%',
          sm:'15%',
          base:'0%'}}
        position={'fixed'}
       top={'12'}
       left={'0'}
    >
    <Dashboardsidebar/>
    </Box>
    <Box 
    ml={{
    md:'15%',
    lg:'15%',
    sm:'15%',
    base:'0%'
    }}
    overflowY={'scroll'}
    width={'full'}
    >
      {sidbaractive && checkloation &&  <Dashboardnavmodel/>}   
    <Outlet/>
    </Box>
   </Flex>
  )
}

export default Dashboard