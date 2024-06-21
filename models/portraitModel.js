const mongoose=require('mongoose');
const multer=require('multer');
const portraitImage='/uploads/portraits';
const path=require('path');
const portraitSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    portraitImg:{
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
        cb(null,path.join(__dirname,'..',portraitImage));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});
portraitSchema.statics.uploadPortrait=multer({storage:storage}).single('portraitImg');
portraitSchema.statics.portraitImgPath=portraitImage;
const portraitModel=mongoose.model('portraitModel',portraitSchema);
module.exports=portraitModel;