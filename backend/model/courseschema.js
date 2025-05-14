import mongoose from "mongoose";

const lessonschema=new mongoose.Schema({
    name:{
        type:String,
    },
    rating:{
        type:Number,
        default:10
    },
    slides:[{
        title:{
            type:String,
        },
        content:{
            type:String
        }
    }],
    test:[{
        question:{
            type:String
        },
        answer:{
            type:String
        },
        options:[{
            option:{
                type:String
            }
        }]
    }],
    result:{
      type:String
    },
    marks:{
        type:Number,
        default:0
    }
},{timestamps:true})



const courseschema=new mongoose.Schema({
    name:{
        type:String,
    },
    title:{
        type:String
    },
    img:{
        type:String
    },
    level:{
        type:String
    },
    // Batch:{
    //     type:String
    // }
    // ,
    trainer:{
        type:String,
    },
    duration:{
        type:String
    },
    lesson:[lessonschema]
},{timestamps:true})


const coursemodel = mongoose.model('Course',courseschema)
export default coursemodel