const mongoose=require('mongoose');
const multer=require('multer');
const sliderImg='/uploads/sliders';
const path=require('path');
const sliderSchema=mongoose.Schema({
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
    sliderImage:{
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
        cb(null,path.join(__dirname,'..',sliderImg));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    },
});
sliderSchema.statics.sliderUploadImg=multer({storage:storage}).single('sliderImage');
sliderSchema.statics.sliderImgPath=sliderImg;
const Slider=mongoose.model('Slider',sliderSchema);
module.exports=Slider;