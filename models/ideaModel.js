const mongoose=require('mongoose');
const ideaSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    },
});
const ideaModel=mongoose.model('ideaModel',ideaSchema);
module.exports=ideaModel;