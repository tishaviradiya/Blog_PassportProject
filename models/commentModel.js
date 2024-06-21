const mongoose=require('mongoose');
const multer=require('multer');
const imgPath='/uploads/comments';
const path=require('path');
const commentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    commentImage:{
        type:String,
        required:true,
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postsModel"
    },
    created_date:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    },
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imgPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});
commentSchema.statics.uploadImages=multer({storage:storage}).single('commentImage');
commentSchema.statics.iPath=imgPath;
const commentModel=mongoose.model('commentModel',commentSchema);
module.exports=commentModel;