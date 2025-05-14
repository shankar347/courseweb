import { Box, Button, CloseButton, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, Spinner, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { act, useRef, useState } from 'react'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import authatom from '../atom/authatom'
import useratom from '../atom/useratom'
import {BsFileEarmarkPdf} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { departments ,hrSpecializations,itSpecializations,financeSpecializations,
  marketingSpecializations
  ,salesSpecializations,operationsSpecializations,
  rAndDSpecializations,customerSupportSpecializations,qualityAssuranceSpecializations,
  logisticsSpecializations,
administrationSpecializations,
  // administrationSpecializations,
  legalSpecializations,productManagementSpecializations,
  businessDevelopmentSpecializations,
  engineeringSpecializations,
  trainingAndDevelopmentSpecializations,

} from './depdetail'
import registeratom from '../atom/registeratom'
import Changefile from  '../hooks/changefile'

const Register = () => {
 
    const [showPassword,setshowPassword]=useState(false)
    const [actions,setActions]=useState({
      name:'',
      email:'',
      college:'',
      phoneno:'',
      password:'',
      degree:'',
      sepcialization:'',
      linkidin:'',
      github:'',
      programminglanguage:'',
      experience:''
    })  
    // const [internshipfile,seti]
    // console.log(actions)
    const [auth,setauth]=useRecoilState(authatom)  
    const [registerState,setRegisterState]=useRecoilState(registeratom)
    // console.log(auth) 
    const [user,setuser]=useRecoilState(useratom)
const [loading,setloading]=useState(false)
console.log(actions.email)
    const toast=useToast()
    const internref=useRef(null)
    const cirtref=useRef(null)
    const resumeref=useRef(null)

    const navigate=useNavigate()
    // console.log(registerstate) 
    const {handlechangefile:handlechangefileintership,
    filename:intershipname,fileurl:urlintern,
    filetype:interntype,
    file1:intershipurl,setfil1:setinstershipurl}=
    Changefile()
    // console.log(intershipurl)

    const {handlechangefile:handlechangefileresume,
      fileurl:urlresume,
      filetype:resumetype,
        filename:resumename,file1:resumeurl,setfil1
      :setresumeurl}=Changefile()
    const {handlechangefile:handlechangefilecirticate
      ,filename:certifcatename,
      fileurl:urlcerti,
      filetype:certitype,
      file1:certificateurl,setfil1:setcertificateurl}=Changefile()  
    // console.log(certitype)  
  // console.log(actions) 
  const getSpecializations = (degree) => {
      switch (degree) {
        case "Human Resources":
          return hrSpecializations;
        case "Information Technology":
          return itSpecializations;
        case "Finance":
          return financeSpecializations;
        case "Marketing":
          return marketingSpecializations;
        case "Sales":
          return salesSpecializations;
        case "Operations":
          return operationsSpecializations;
        case "Research and Development":
          return rAndDSpecializations;
        case "Customer Support":
          return customerSupportSpecializations;
        case "Quality Assurance":
          return qualityAssuranceSpecializations;
        case "Logistics":
          return logisticsSpecializations;
        case "Administration":
          return administrationSpecializations;
        case "Legal":
          return legalSpecializations;
        case "Product Management":
          return productManagementSpecializations;
        case "Business Development":
          return businessDevelopmentSpecializations;
        case "Engineering":
          return engineeringSpecializations;
        case "Training and Development":
          return trainingAndDevelopmentSpecializations;
        default:
          return [];
      }
    }

  const handleregister=async()=>{
   try{
    if (!actions.name || !actions.email || !actions.phoneno || !actions.password || !actions.degree 
      || !actions.sepcialization || !actions.experience ||
      !actions.github || !actions.linkidin || !actions.college
     )
    {
     toast({
        description:'Provide all the details',
        status:'error',
        duration: 2000,
     })
     return
    }
  
  setloading(true)  

  //  console.log(actions.name,actions.email) 
   const formdata=new FormData()
  if(actions.name){
    formdata.append('name',actions.name)
  }
   
  // formdata.append('')
  formdata.append('college',actions.college)
  formdata.append('phoneno',actions.phoneno)
  formdata.append('email',actions.email)
  formdata.append('password',actions.password)
  formdata.append('degree',actions.degree)
  formdata.append('specialization',actions.sepcialization)
  formdata.append('experience',actions.experience)
  formdata.append('github',actions.github)
  formdata.append('linkedin',actions.linkidin)
  formdata.append('programminglanguage',actions.programminglanguage)

  //  console.log(formdata)   
   if(intershipurl)
   {
    formdata.append('internship',intershipurl)
   } 

   if(resumeurl)
   {
    formdata.append('resume',resumeurl)
   }
   if(certificateurl)
   {
    formdata.append('file',certificateurl)
   }

   
    const res=await fetch('/api/user/register/',{
        method:'POST',
        body:formdata
    })



    const data=await res.json()
    if (data?.error)
    {
      toast({
        description:data.error,
        status:'error',
        duration: 2000,
      })
      return
    }
    // console.log(data)
    var token=JSON.stringify({
      token:data,
      expiresAt:new Date().getTime() + 2*24*60*60*1000
    })
    setuser(JSON.parse(token))
    localStorage.setItem('token',token)
    toast({
        description:'Registration successful',
        status:'success',
        duration:2000
    })
    navigate('/')
   }
   catch(err)
   {
    console.log(err)
   }
   finally{
    setloading(false)
   }
  }

  return (
    <Flex
    width={'full'}
    height={'auto'}
    justify={'center'}
    alignItems={'center'}
    bg={'blue.400'}
    color={'white'}
  >
    <Flex
      minWidth={{
        lg: 'md',
        md: 'md',
        sm: 'md',
        base: '90%',
      }}
      mt={{
        md:'10',
        lg:'10',
        sm:'10',
        base:'3'}}
        mb={'4'}
      maxWidth={'md'}
      bg={'gray.200'}
      borderRadius={'5px'}
      height={'auto'}
      flexDir={'column'}
      px={'6'}
      zIndex={'2'}
      rounded={'md'}
         boxShadow={'lg'}
    >
      <Text
        color={'blue.400'}
        fontSize={'2xl'}
        fontWeight={'bold'}
        mt={'8px'}
        fontFamily={'sans-serif'}
        textAlign={'center'}
        textShadow={'1px 1px 0px black'}
        mb={'5'}
      >
        Sign Up
      </Text>

      {registerState === 1 && (
        <Flex flexDir={'column'} height={'440px'}
        mb={'80px'}
        >
          <FormControl isRequired>
            <FormLabel color={'black'}>Name</FormLabel>
            <Input
              type={'text'}
              placeholder={'Enter your name'}
              value={actions.name}
              onChange={(e) => setActions({ ...actions, name: e.target.value })}
              border={'2px solid'}
              color={'black'}
              borderColor={'gray.400'}
            />
          </FormControl>
          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Email</FormLabel>
            <Input
              type={'email'}
              placeholder={'Enter your email'}
              border={'2px solid'}
              color={'black'}
              value={actions.email}
              onChange={(e) => setActions({ ...actions, email: e.target.value })}
              borderColor={'gray.400'}
            />
          </FormControl>
          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Phone no</FormLabel>
            <Input
              type={'text'}
              color={'black'}
              placeholder={'Enter your phoneno'}
              border={'2px solid'}
              value={actions.phoneno}
              onChange={(e) => setActions({ ...actions, phoneno: e.target.value })}
              borderColor={'gray.400'}
            />
          </FormControl>
          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Collge</FormLabel>
            <Input
              type={'text'}
              color={'black'}
              placeholder={'Enter your phoneno'}
              border={'2px solid'}
              value={actions.college}
              onChange={(e) => setActions({ ...actions, college: e.target.value })}
              borderColor={'gray.400'}
            />
          </FormControl>
          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Password</FormLabel>
            <InputGroup>
              <Input
              color={'black'}
                type={showPassword ? 'text' : 'password'}
                border={'2px solid'}
                value={actions.password}
                placeholder='Enter your password'
                borderColor={'gray.400'}
                onChange={(e) => setActions({ ...actions,
                   password: e.target.value })}
              />
              <InputRightElement h={'70%'} justifySelf={'center'} alignSelf={'center'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setshowPassword((showPassword) => !showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>LinkedIn Profile Link</FormLabel>
            <Input
              type={'url'}
              placeholder={'Enter LinkedIn Profile Link'}
              border={'2px solid'}
              color={'black'}
              value={actions.linkidin}
              onChange={(e) => setActions({ ...actions, linkidin: e.target.value })}
              borderColor={'gray.400'}
            />
          </FormControl>
        </Flex>
      )}

      {registerState === 2 && (
        <Flex flexDir={'column'} height={'440px'}>
          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Github Profile Link</FormLabel>
            <Input
              type={'url'}
              color={'black'}
              placeholder={'Enter Github Profile Link'}
              border={'2px solid'}
              value={actions.github}
              onChange={(e) => setActions({ ...actions, github: e.target.value })}
              borderColor={'gray.400'}
            />
          </FormControl>

          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Programming Languages known</FormLabel>
            <Input
              type={'text'}
              placeholder={'Ex. JavaScript, HTML, etc.'}
              border={'2px solid'}
              color={'black'}
              value={actions.programminglanguage}
              onChange={(e) => setActions({ ...actions, programminglanguage: e.target.value })}
              borderColor={'gray.400'}
            />
          </FormControl>

          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Experience Level</FormLabel>
            <Select
              color={'gray.400'}
              border={'2px solid'}
              borderColor={'gray.400'}
              onChange={(e) => setActions({ ...actions, experience: e.target.value })}
            >
              <option value="" selected disabled hidden>
                Select level
              </option>
              <option value="beginner" style={{ color: 'black' }}>
                Beginner
              </option>
              <option value="intermediate" style={{ color: 'black' }}>
                Intermediate
              </option>
              <option value="advanced" style={{ color: 'black' }}>
                Advanced
              </option>
            </Select>
          </FormControl>

          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Degree</FormLabel>
            <Select
              onChange={(e) => setActions({ ...actions, degree: e.target.value })}
              color={'gray.400'}
              border={'2px solid'}
              borderColor={'gray.400'}
            >
              <option value="" selected disabled hidden>
                Select option
              </option>
              {departments.map((dep, i) => (
                <option style={{ color: 'black' }} key={i} value={dep}>
                  {dep}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired mt={'4'}>
            <FormLabel color={'black'}>Specialization</FormLabel>
            <Select
              onChange={(e) => setActions({ ...actions, sepcialization: e.target.value })}
              color={'gray.400'}
              border={'2px solid'}
              borderColor={'gray.400'}
            >
              <option value="" selected disabled hidden>
                Select specialization
              </option>
              {getSpecializations(actions.degree).map((value, i) => (
                <option key={i} value={value} style={{ color: 'black' }}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>

       
        </Flex>
      )}

      {registerState === 4 && (
        <Flex width={'100%'} alignItems={'center'} justify={'center'} height={'440px'} flexDir={'column'}>
          <FormControl isRequired mt={'4'}>
            <FormLabel mt={'-40'} color={'black'}>
              Upload Resume
            </FormLabel>
            <Flex mt={'30px'} width={'full'} alignItems={'center'}>
              <Input type='file' 
               hidden 
              ref={resumeref}
              onChange={handlechangefileresume}
              />
                          {      !resumeurl ?
                              <Button
                              mt={'20px'}
                              onClick={()=>resumeref.current.click()}
                              mx={'auto'}
                              justifySelf={'center'}
                              width={'36'}
                              bg={'blue.300'}
                              border={'2px solid'}
                              borderColor={'transparent'}
                              _hover={{ bg: 'blue.200' }}
                              color={'gray.800'}
                              h={'42px'}
                              my={'0'}
                            >
                              Upload File
                            </Button> : 
  <Flex position={'relative'}
  width={'full'}
  >
     <Box  
     // alignSelf={'center'}
     // justifySelf={'center'}
      w={'full'}
     mx={'auto'} 
     // alignItems={'center'}
     // justifyItems={'center'}
     // textAlign={'center'}
     >
    <Flex mt={''}
     width={'full'}
     alignItems={'center'}
     flexDir={'column'}
     alignSelf={'center'}
     justifyItems={'center'}>
    <BsFileEarmarkPdf  
     color='rgb(88, 164, 197)' 
     size="120px" />
     <Text 
     color={'black'}
     textAlign={'center'} width={'80%'} 
     mt={'0'} >
       {resumeurl?.name}
     </Text>
     <Button mt={'2'} colorScheme='blue' mr={'0'}
//  onClick={handlecreate} 
//  isLoading={loading}
>
     <a href={urlresume}  target="_blank"  
     rel="noopener noreferrer">
   View {resumetype}
    </a>
    </Button>
    </Flex>
     </Box>

     <CloseButton 
                  position={'absolute'}
                  top={'2'}
                  bg={'red.400'}
                  right={'2'}
                  fontSize={'10px'}
                  fontWeight={'29px'}
                  onClick={()=>{
                  setresumeurl(null)
                  }
              }/>

     </Flex>
              }     
            </Flex>
          </FormControl>
        </Flex>
      )}

      {registerState === 5 && (
        <Flex height={'440px'} width={'100%'} alignItems={'center'} justify={'center'} flexDir={'column'}>
          <Input type='file' hidden />
          <FormControl isRequired>
            <FormLabel mt={'-40'} color={'black'}>
              Certification
            </FormLabel>
            <Flex mt={'30px'} width={'full'} alignItems={'center'}>
              <Input
              hidden
              type='file'
              ref={cirtref}
              onChange={handlechangefilecirticate}
               
              />
                           {      !certificateurl ?
                              <Button
                              mt={'20px'}
                              onClick={()=>cirtref.current.click()}
                              mx={'auto'}
                              justifySelf={'center'}
                              width={'36'}
                              bg={'blue.300'}
                              border={'2px solid'}
                              borderColor={'transparent'}
                              _hover={{ bg: 'blue.200' }}
                              color={'gray.800'}
                              h={'42px'}
                              my={'0'}
                            >
                              Upload File
                            </Button> : 
  <Flex position={'relative'}
  width={'full'}
  >
     <Box  
     // alignSelf={'center'}
     // justifySelf={'center'}
      w={'full'}
     mx={'auto'} 
     // alignItems={'center'}
     // justifyItems={'center'}
     // textAlign={'center'}
     >
    <Flex mt={''}
     width={'full'}
     alignItems={'center'}
     flexDir={'column'}
     alignSelf={'center'}
     justifyItems={'center'}>
    <BsFileEarmarkPdf  
     color='rgb(88, 164, 197)' 
     size="120px" />
     <Text 
     color={'black'}
     textAlign={'center'} width={'80%'} 
     mt={'0'} >
       {certificateurl?.name}
     </Text>
     <Button mt={'2'} colorScheme='blue' mr={'0'}
//  onClick={handlecreate} 
//  isLoading={loading}
>
     <a href={urlcerti}  target="_blank"  
     rel="noopener noreferrer">
   View {certitype}
    </a>
    </Button>
    </Flex>
     </Box>

     <CloseButton 
                  position={'absolute'}
                  top={'2'}
                  bg={'red.400'}
                  right={'2'}
                  fontSize={'10px'}
                  fontWeight={'29px'}
                  onClick={()=>{
                  setcertificateurl(null)
                  }
              }/>

     </Flex>
              }     
            </Flex>
          </FormControl>
        </Flex>
      )}
      
      {registerState === 3 && (
        <Flex height={'440px'} width={'100%'} alignItems={'center'} justify={'center'} flexDir={'column'}>
          <Input type='file' hidden />
          <FormControl isRequired>
            <FormLabel mt={'-40'} color={'black'}>
              Internship
            </FormLabel>
            <Flex mt={'30px'} width={'full'} alignItems={'center'}>
              
              <Input
              hidden
              type='file'
              ref={internref}
              onChange={handlechangefileintership}
              />
              {      !intershipurl ?
                              <Button
                              mt={'20px'}
                              onClick={()=>internref.current.click()}
                              mx={'auto'}
                              justifySelf={'center'}
                              width={'36'}
                              bg={'blue.300'}
                              border={'2px solid'}
                              borderColor={'transparent'}
                              _hover={{ bg: 'blue.200' }}
                              color={'gray.800'}
                              h={'42px'}
                              my={'0'}
                            >
                              Upload File
                            </Button> 
                            : 
  <Flex position={'relative'}
  width={'full'}
  >
     <Box  
     // alignSelf={'center'}
     // justifySelf={'center'}
      w={'full'}
     mx={'auto'} 
     // alignItems={'center'}
     // justifyItems={'center'}
     // textAlign={'center'}
     >
    <Flex mt={''}
     width={'full'}
     alignItems={'center'}
     flexDir={'column'}
     alignSelf={'center'}
     justifyItems={'center'}>
    <BsFileEarmarkPdf  
     color='rgb(88, 164, 197)' 
     size="120px" />
     <Text 
     color={'black'}
     textAlign={'center'} width={'80%'} 
     mt={'0'} >
       {intershipurl?.name}
     </Text>
     <Button mt={'2'} colorScheme='blue' mr={'0'}
//  onClick={handlecreate} 
//  isLoading={loading}
>
     <a href={urlintern}  target="_blank"  
     rel="noopener noreferrer">
   View {interntype}
    </a>
    </Button>
    </Flex>
     </Box>

     <CloseButton 
                  position={'absolute'}
                  top={'2'}
                  bg={'red.400'}
                  right={'2'}
                  fontSize={'10px'}
                  fontWeight={'29px'}
                  onClick={()=>{
                  setinstershipurl(null)
                  }
              }/>

     </Flex>
              }     
            </Flex>
          </FormControl>
        </Flex>
      )}

      <Text color={'black'}
   textAlign={'center'}
   mt={'10px'}
   fontSize={'15px'}
   fontWeight={'550'}
   >
    ({registerState} of 5)
   </Text>

      <Flex alignSelf={'center'} mt={3} justifySelf={'center'}>
        {registerState < 5 ? (
          <Button
          width={'32'}
          my={'1'}
           mx={'auto'}
           borderRadius={'50px'}
            bg={'blue.400'}  
            _hover={{
              bg:'blue.300'
            }}
            color={'white'}
            onClick={() => setRegisterState((prev) => prev + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
           width={'32'}
           my={'1'}
            mx={'auto'}
            borderRadius={'50px'}
            bg={'blue.400'}  
            _hover={{
              bg:'blue.300'
            }}
            color={'white'}
            onClick={handleregister}
          >
            {loading ? <Spinner/> : 'Submit'}
          </Button>
        )}
      </Flex>

      <Flex alignSelf={'center'} mt={'2'} justifySelf={'center'}>
      {
        registerState !== 1&&
        <Text color={'blue.500'}
        textAlign={'center'}
        mt={'-1'}
        mb={'3'}
        fontSize={'sm'}
        fontWeight={'550'}
_hover={{
    textDecoration:'underline'
}}
        cursor={'pointer'}
        onClick={()=>setRegisterState((prev)=>prev - 1)}
        >
         Back
        </Text>
      }
      </Flex>
      <Flex color={'black'}
      textAlign={'center'}
      alignSelf={'center'}
      fontSize={'sm'}
      fontWeight={'medium'}
      gap={'2'} mb={'3'}
      >  
        <Text >
        Already have an account 
        </Text> 
        <Text color={'blue.400'}
        cursor={'pointer'}
        onClick={()=>setauth('Login')}>
            Login
        </Text>
        </Flex>
    </Flex>
  </Flex>
);
};

export default Register;