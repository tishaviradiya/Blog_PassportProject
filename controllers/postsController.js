const postsModel = require("../models/postsModel");
const moment=require('moment');
const fs=require('fs');
const path=require('path');
module.exports.add_posts=async(req,res)=>{
    try{
        return res.render('add_posts');
    }
    catch(err){
        console.log(err);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.insertPostsData=async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    try{
        var img='';
        if(req.file){
            img=postsModel.postsImgPath+'/'+req.file.filename;
        }
        req.body.postsImage=img;
        req.body.username=req.user.name;
        req.body.status=true;
        req.body.created_date=moment().format('LLL');
        let addData=await postsModel.create(req.body);
        if(addData){
            console.log(addData);
            req.flash('success','Data has been inserted !');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.view_posts=async(req,res)=>{
    try{
        console.log(req.query.search);
        let search='';
        if(req.query.search){
            search=req.query.search;
        }
        let page=0;
        let per_page=3;
        if(req.query.page){
            page=req.query.page;
        }
        let allRecord=await postsModel.find({
            $or:[
                {category:{$regex:search,$options:'i'}},
                {title:{$regex:search,$options:"i"}},
                {link:{$regex:search,$options:"i"}},
            ]
        }).countDocuments();
        let totalRecord=Math.ceil((allRecord/per_page));
        let findData=await postsModel.find({
            $or:[
                {category:{$regex:search,$options:'i'}},
                {title:{$regex:search,$options:"i"}},
                {link:{$regex:search,$options:"i"}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
            console.log(findData);
            res.render('view_posts',{
                findData:findData,
                search:search,
                totalRecord:totalRecord,
                currentPage:page,
                per_page:per_page,
            })
        }
        else{
            console.log(error);
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
        let findPosts=await postsModel.findById(req.params.id);
        if(findPosts){
            let imgPath=path.join(__dirname,'..',findPosts.postsImage);
            await fs.unlinkSync(imgPath);
        }
        let deleteData=await postsModel.findByIdAndDelete(req.params.id);
        if(deleteData){
            console.log(deleteData);
            req.flash('error','data has been deleted !');
            return res.redirect('back');
        }
        else{
            console.log(error);
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }

    }
    catch(err){
        console.log(err);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.editRecord=async(req,res)=>{
    try{
        let findData=await postsModel.findById(req.query.id);
        if(findData){
            return res.render('edit_posts',{
                findData:findData,
            })
        }
        else{
            console.log(error);
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.editPostsData=async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    try{
        if(req.file){
            let findPosts=await postsModel.findById(req.params.id);
            if(findPosts){
                let imagePath=path.join(__dirname,'..',findPosts.postsImage);
                await fs.unlinkSync(imagePath);
            }
            let img='';
            req.body.postsImage=postsModel.postsImgPath+'/'+req.file.filename;
        }
        else{
            let findPosts=await postsModel.findById(req.params.id);
            if(findPosts){
                req.body.postsImage=findPosts.postsImage;
            }
        }
        let updateData=await postsModel.findByIdAndUpdate(req.params.id,req.body);
        if(updateData){
            console.log(updateData);
            req.flash('success','Data has been updated!');
            return res.redirect('/admin/posts/view_posts');
        }
        else{
            console.log(error);
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.deactive=async(req,res)=>{
    try{
        let changeStatus=await postsModel.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStatus){
            req.flash('success','Record deactivated successfully !');
            return res.redirect('back');
        }
        else{
            req.flash('error','error');
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
        let changeStatus=await postsModel.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Record Activated successfully !');
            return res.redirect('back');
        }
        else{
            req.flash('error','error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.multipleDeleteRecords=async(req,res)=>{
    try{
        let deleteData=await postsModel.deleteMany({_id:{$in:req.body.postsId}})
        if(deleteData){
            req.flash('success','Records deleted successfully !')
            return res.redirect('back')
        }
        else{
            req.flash('error','Error')
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}