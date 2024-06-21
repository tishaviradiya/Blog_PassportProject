const subCategory=require('../models/subCategoryModel');
const Category=require('../models/categoryModel');
const moment=require('moment');
const path=require('path');
const fs=require('fs');
module.exports.add_subCategory=async(req,res)=>{
    try{
     
        let findData=await Category.find();
        if(findData){ 
            return res.render('add_subCategory',{
                findData:findData,
            })
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.insertsubCategoryData=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        let img='';
        if(req.file){
            img=await subCategory.iPath+'/'+req.file.filename;
        }
        req.body.image=img;
        req.body.created_date=moment().format('LLL');
        req.body.status=true;
        let addData=await subCategory.create(req.body);
        if(addData){
            req.flash('success','Data inserted successfully !')
            return res.redirect('back');
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.view_subCategory=async(req,res)=>{
    try{
        let search='';
        if(req.query.search){
            search=req.query.search;
        }
        let page=0;
        let per_page=2;
        if(req.query.page){
            page=req.query.page;
        }
        let allRecord=await subCategory.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {message:{$regex:search,$options:"i"}},
                {category:{$regex:search,$options:"i"}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil(allRecord/per_page);
        let findData=await subCategory.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {message:{$regex:search,$options:"i"}},
                {category:{$regex:search,$options:"i"}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page).populate('categoryId').exec();
        if(findData){
            return res.render('view_subCategory',{
                findData,
                search:search,
                totalPage:totalPage,
                currentPage:page,
                per_page:per_page,
            })
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
        let findData=await subCategory.findById(req.params.id);
        if(findData){
            let imagePath=path.join(__dirname,'..',findData.image);
            await fs.unlinkSync(imagePath);
        }
        let deleteSubCategory=await subCategory.findByIdAndDelete(req.params.id);
        if(deleteSubCategory){
            req.flash('success','Data deleted successfully !')
            return res.redirect('back');
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editRecord=async(req,res)=>{
    try{
        let editData=await subCategory.findById(req.query.id);
        if(editData){
            return res.render('edit_subCategory',{
                editData,
                
            });
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editsubCategoryData=async(req,res)=>{
    try{
        if(req.file){
            let findData=await subCategory.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(imagePath);
            }
            let img='';
            img=await subCategory.iPath+'/'+req.file.filename;
            req.body.image=img;
        }
        else{
            let findData=await subCategory.findById(req.params.id);
            if(findData){
                req.body.image=findData.image;
            }
        }
        let editsubCategoryData=await subCategory.findByIdAndUpdate(req.params.id,req.body);
        if(editsubCategoryData){
            req.flash('success','Data edited successfully !')
            return res.redirect('/admin/subCategory/view_subCategory');
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deleteMultipleRecords=async(req,res)=>{
    try{
        let deleteData=await subCategory.deleteMany({_id:{$in:req.body.subCategoryId}});
        if(deleteData){
            req.flash('success','Data deleted successfully !')
            return res.redirect('back');
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deactive=async(req,res)=>{
    try{
        let changeStatus=await subCategory.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStatus){
            req.flash('success','Deactivated successsfully !')
            return res.redirect('back');
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.active=async(req,res)=>{
    try{
        let changeStatus=await subCategory.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Activated successfully !')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}