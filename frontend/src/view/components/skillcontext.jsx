import { createContext, useEffect, useState } from "react";

export const skillcontext=createContext()


import React from 'react'
import { useRecoilValue } from "recoil";
import useratom from "../atom/useratom";
import batchatom from "../atom/batchatom";
import { useToast } from "@chakra-ui/react";
import usercourseatom from "../atom/usercourseatom";

const Skillcontext = ({children}) => {
  
    const [sidbaractive,setsidebaractive]=useState(false)
    const [navmodel,setnavmodel]=useState(false)
    const [otpcorrect,setotpcorrect]=useState(false) 
    const [allcourses,setallcourses]=useState(null)
    const [course,setcourse]=useState(null)
    const [isenrolled,setenrolled]=useState(null)
    const [lessonindex,setlessonindex]=useState(0)
    const [totalmarks,settotalmarks]=useState(0)
    const [selected,setselected]=useState(false)
    const [coursecompleted,setcoursecompleted]=useState(0)
    const [userbatch,setuserbatch]=useState(null)
    const [usercourse,setusercourse]=useState(null)
    const [batchtoppers,setbatchtoppers]=useState(null)
    const [studenttoppers,setstudenttoppers]=useState(null)
    const [collegetoppers,setcollegetoppers]=useState(null)
    const [userreport,setuserreport]=useState(null)
    console.log(batchtoppers)


    const coursename=useRecoilValue(usercourseatom)
    const batchname=useRecoilValue(batchatom)
   
    let batchcheck = batchname !== null

    const user1=useRecoilValue(useratom)
    let user=user1?.token

    console.log(batchname)

    useEffect(()=>{
      const getbatch=async()=>{
       try{
        if(batchname === null)
          {
            return
          }
          const res=await fetch(`/api/batch/topper/${batchname}`)
          const data=await res.json()
          setbatchtoppers(data)
       }
       catch(err)
       {
        console.log(err)
       }
      }
      getbatch()
    },[batchname])
    

    useEffect(()=>{
      const getcoursetopper=async()=>{

        
        if(coursename === null)
        {
          return
        }

        try{
          const res=await fetch(`/api/user/course/topper/${coursename}`)
          const data=await res.json()
          setstudenttoppers(data)
        }

        catch(err)
        {
         console.log(err)
        }
      }
      getcoursetopper()
    },[coursename])


    useEffect(()=>{
        
    const getcollegetopper=async()=>{
      try{

        if(!user?.college)
        {
          return
        }

        const res=await fetch(`/api/user/topper/${user?.college}`)
        const data=await res.json()
        setcollegetoppers(data)
      
      }
      catch(err)
      {
       console.log(err)
      }
    }
    getcollegetopper()
    },[user?.college])


    // console.log(course)

    const toast=useToast()
    
    useEffect(()=>{ 
      const getcourse=async()=>{
       if(coursename === null || user?.experience === '')
        {
          return
        } 

      try{
        const res=await fetch(`/api/course/${coursename}/${user?.experience}`)
        const data=await res.json()
        setcourse(data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getcourse()
    },[coursename,user?.experience])

    

   

    return (
    <skillcontext.Provider 
    value={{sidbaractive,setsidebaractive,navmodel,setnavmodel,
      otpcorrect,setotpcorrect,
      allcourses,setallcourses,
      course,setcourse,
      isenrolled,setenrolled,
      lessonindex,setlessonindex,
      totalmarks,settotalmarks,
      selected,setselected,
      coursecompleted,setcoursecompleted,
      usercourse,setusercourse,
      batchtoppers,setbatchtoppers,
      studenttoppers,setstudenttoppers,
      collegetoppers,setcollegetoppers,
      userreport,setuserreport
    }}
    >
   {children}
    </skillcontext.Provider>
  )
}

export default Skillcontext