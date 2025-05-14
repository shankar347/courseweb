import mongoose from "mongoose";

const reportschema=new mongoose.Schema({
    username:{
        type:String,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    email:{
        type:String,
    },
    degree:{
        type:String
    },
    level:{
        type:String,
    },
    coursetitle:{
        type:String,
    },
    totalmarks:{
        type:String
    },
    report:{
        type:Array
    },
    college:{
        type:String
    },
    date:{
       type:String
    }
},{timestamps:true})

const reportmodel=mongoose.model('Report',reportschema)

export default reportmodel

