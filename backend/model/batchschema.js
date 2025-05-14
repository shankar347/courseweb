import mongoose from "mongoose";


const batchschema=new mongoose.Schema({
    
    coursename:{
        type:String,
    },
    name:{
        type:String,
        default:''
    },

    batchstudents:[{
        studentid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        name:{
            type:String
        },
        email:{
            type:String
        },
        phoneno:{
            type:String
        }
}],

    batchsize:{
        type:Number,
        default:0
    }
},{timestamps:true})

const batchmodel=mongoose.model('Batch',batchschema)

export default batchmodel