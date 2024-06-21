const commentModel=require('../models/commentModel');
const path=require('path');
const fs=require('fs');
module.exports.view_comments=async(req,res)=>{
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
        let allrecord=await commentModel.find({
            $or:[
                
                {name:{$regex:search,$options:'i'}},
                {email:{$regex:search,$options:'i'}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil(allrecord/per_page);
        let findData=await commentModel.find({
            $or:[
                
                    {name:{$regex:search,$options:'i'}},
                    {email:{$regex:search,$options:'i'}},

                
            ]
        }).skip(page*per_page)
        .limit(per_page).populate('postId').exec();
        if(findData){
            return res.render('view_comments',{
                findData:findData,
                search:search,
                totalPage:totalPage,
                currentPage:page,
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
module.exports.deleteComments=async(req,res)=>{
    try{
        let findData=await commentModel.findById(req.params.id);
        if(findData){
            let imagePath=path.join(__dirname,'..',findData.commentImage);
            await fs.unlinkSync(imagePath);
        }
        let deleteData=await commentModel.findByIdAndDelete(req.params.id);
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
module.exports.multipleDeleteRecords=async(req,res)=>{
    try{
        let deleteData=await commentModel.deleteMany({_id:{$in:req.body.commentId}});
        if(deleteData){
            req.flash('success','Data deleted successfullly !')
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
        let changeStaus=await commentModel.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStaus){
            req.flash('success','Deactivated successfully!')
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
        let changeStaus=await commentModel.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStaus){
            req.flash('success','Activated successfully !')
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