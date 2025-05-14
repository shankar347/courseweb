import jwt from 'jsonwebtoken'

const generatetoken=(res,userid)=>{
   
   const token=jwt.sign({userid},process.env.JWT_SECRET,{
    expiresIn:'15d'
   })

   res.cookie('token',token,{
    maxAge:15*24*60*60*1000,
    sameSite:'strict',
    httpOnly:true
   })
   return token    
}



export default generatetoken