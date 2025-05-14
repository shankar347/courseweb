import { Box, Flex } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Coursesidebar from './coursesidebar'
import Coursenavbar from './coursenavbar'
import { skillcontext } from '../components/skillcontext'
import Coursenavmodel from './coursenavmodel'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'

const Courses = () => {

    const {sidbaractive,setsidebaractive,
    }=useContext(skillcontext)
     const navigate=useNavigate()
     const location=useLocation()
     const checkloation=location.pathname.startsWith('/courses')
    const {course,setcourse}=useContext(skillcontext)
  
    return (
    <Flex height={'93vh'}>
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
     <Coursesidebar/>
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
          {
       checkloation && sidbaractive && <Coursenavmodel/>
      }
      <Coursenavbar/>
    
      <Outlet/>
  </Box>
    </Flex>
  )
}

export default Courses