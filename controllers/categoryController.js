const Category=require('../models/categoryModel');
module.exports.add_category=async(req,res)=>{
    try{
        return res.render('add_category');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.insertCategoryData=async(req,res)=>{
    try{
        req.body.status=true;
        let addData=await Category.create(req.body);
        if(addData){
            req.flash('success','Data inserted successfullly !')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.view_category=async(req,res)=>{
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
        let allRecord=await Category.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil(allRecord/per_page);
        let findData=await Category.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
            return res.render('view_category',{
                findData,
                search:search,
                totalPage:totalPage,
                currentPage:page,
                per_page:per_page,
            });
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
        let deleteData=await Category.findByIdAndDelete(req.params.id);
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
module.exports.editRecord=async(req,res)=>{
    try{
        let editData=await Category.findById(req.query.id);
        if(editData){
            req.flash('success','Data edited successfully !')
            return res.render('edit_category',{
                editData:editData,
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
module.exports.editCategoryData=async(req,res)=>{
    try{
        let findData=await Category.findByIdAndUpdate(req.params.id,req.body);
        if(findData){
            req.flash('success','Data edited successfully !')
            return res.redirect('/admin/category/view_category');
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
        let changeStatus=await Category.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStatus){
            req.flash('success','Deactivated successfully !')
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
        let changeStatus=await Category.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','activated successfully !')
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
module.exports.deleteMultipleRecords=async(req,res)=>{
    try{
        let deleteData=await Category.deleteMany({_id:{$in:req.body.categoryIds}});
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