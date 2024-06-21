const mongoose=require('mongoose');
const othersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    }
})
const OthersModel=mongoose.model('OthersModel',othersSchema);
module.exports=OthersModel;