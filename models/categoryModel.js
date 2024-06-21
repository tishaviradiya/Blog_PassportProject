const mongoose=require('mongoose');
const categorySchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    }
});
const Category=mongoose.model('Category',categorySchema);
module.exports=Category;