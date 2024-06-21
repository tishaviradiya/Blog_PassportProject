const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const imgPath='/uploads/about';
const aboutSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    }
});
const storage=multer.diskStorage({
    destination:(re,file,cb)=>{
        cb(null,path.join(__dirname,'..',imgPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});
aboutSchema.statics.uploadImages=multer({storage:storage}).single('image');
aboutSchema.statics.iPath=imgPath;
const About=mongoose.model('About',aboutSchema);
module.exports=About;