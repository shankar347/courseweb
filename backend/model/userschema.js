import mongoose from "mongoose";


const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
          default:''
    },
    email:{
        type:String,
        required:true,
          default:''
    },
    password:{
        type:String,
        required:true,
          default:''
    },
    college:{
      type:String,
    },
    phoneno:{
        type:String,
        required:true,
          default:''
    },
    github:{
        type:String,
        default:''
    },
    linkedin:{
        type:String,
          default:''
    },
    programminglanguage:{
        type:String,
          default:''
    },
    degree:{
        type:String,
          default:''
    },
    specialization:{
        type:String,
          default:''
    },
    experience:{
          type:String,
          default:''
    },
    internship:{
        type:String,
          default:''
    },
    totalmarks:{
      type:Number,
      default:0
    },
    resume:{
        type:String,
          default:''
    },
    certificate:{
        type:String,
          default:''
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    istrainer:{
        type:Boolean,
        default:false
    },
    course:{
      type:String,
    }
},{timestamps:true})


const User=mongoose.model('User',userschema)

export default User