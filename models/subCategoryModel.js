const mongoose=require('mongoose');
const multer=require('multer');
const imgPath='/uploads/subCategory';
const path=require('path');
const subCategorySchema=mongoose.Schema({
    title:{
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
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    created_date:{
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
        cb(null,path.join(__dirname,'..',imgPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})
subCategorySchema.statics.uploadImages=multer({storage:storage}).single('image');
subCategorySchema.statics.iPath=imgPath;
const subCategory=mongoose.model('subCategory',subCategorySchema);
module.exports=subCategory;