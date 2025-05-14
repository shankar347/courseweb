import { Flex, Image } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { skillcontext } from '../components/skillcontext'

const Viewcourse = () => {
  
    // console.log(allcourses)
    const navigate=useNavigate()
    const {allcourses,setallcourses}=useContext(skillcontext)

      useEffect(()=>{
        const getallcourses=async()=>{
            try{
              const res=await fetch('/api/course')
              const data=await res.json() 
              setallcourses(data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getallcourses()
      },[])

    return (
    <Flex 
    flexDir={'column'} 
    >
    <Flex 
    alignSelf={'center'}
    fontWeight={'650'}
    fontSize={'18px'}
    color={'blue.500'}
    >
      All Courses
    </Flex>  

    <Flex 
    mt={'5'}
     flexDir={{
        md:'row',
        lg:'row',
        sm:'row',
        base:'column'
    }}
    >
    {
        allcourses?.map((course)=>(
            <Flex key={course?._id}
            width={{
                md:'400px',
                lg:'400px',
                sm:'400px',
                base:'80%'
            }}
            onClick={()=>navigate(`/courses/${course?._id}/edit-course`)}
            mt={'2'}
            height={{
                md:'230px',
                lg:'230px',
                sm:'230px',
                base:'150px'
            }}
            mx={'auto'}
            flexDir={'column'}     
            borderRadius={'5px'}
            border={'2px solid'}
            borderColor={'gray.400'}
            >
            <Image src={course?.img}  
            width={'100%'}
            height={{
                md:'87%',
                lg:'87%',
                sm:'87%',
                base:'80%'
            }}
            />
            <Flex 
            fontWeight={'550'}
            fontSize={'17px'}
            alignSelf={'center'}
            >
              {course?.title}
            </Flex>
            </Flex> 
        ))
    }
    </Flex>
    </Flex>
  )
}

export default Viewcourse