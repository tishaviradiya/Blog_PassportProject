const mongoose=require('mongoose');
const multer=require('multer');
const postsPath='/uploads/posts';
const path=require('path');
const postsSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    postsImage:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    created_date:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    }
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',postsPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    },
});
postsSchema.statics.uploadPostsImg=multer({storage:storage}).single('postsImage');
postsSchema.statics.postsImgPath=postsPath;
const postsModel=mongoose.model('postsModel',postsSchema);
module.exports=postsModel;