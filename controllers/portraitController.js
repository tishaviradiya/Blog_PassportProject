const portraitModel=require('../models/portraitModel');
const path=require('path');
const fs=require('fs');
module.exports.add_portrait=async(req,res)=>{
    return res.render('add_portrait');
}
module.exports.insertportraitData=async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    try{
        var img='';
        if(req.file){
            img=portraitModel.portraitImgPath+'/'+req.file.filename;
        }
        req.body.portraitImg=img;
        req.body.status=true;
        let addData=await portraitModel.create(req.body);
        if(addData){
            req.flash('success','Data is properly inserted !');
            console.log(addData);
            return res.redirect('back');
        }
        else{
            req.flash('error','Something is wrong !');
            console.log('Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Something is wrong !');
        console.log('Something is Wwrong !');
        return res.redirect('back');
    }
}
module.exports.view_portrait=async(req,res)=>{
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
        let allRecord=await portraitModel.find({
            $or:[
                {name:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil((allRecord/per_page));
        let findData=await portraitModel.find({
            $or:[
                {name:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
            console.log(findData);
            return res.render('view_portrait',{
                findData:findData,
                search:search,
                totalPage:totalPage,
                currentPage:page,
            })
        }
        else{
            req.flash('error','Something is wrong!');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong!');
        return res.redirect('back');
    }
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
        let findPortrait=await portraitModel.findById(req.params.id);
        if(findPortrait){
            let imgPath=path.join(__dirname,'..',findPortrait.portraitImg);
            await fs.unlinkSync(imgPath);
        }
        let deleteData=await portraitModel.findByIdAndDelete(req.params.id);
        if(deleteData){
            req.flash('success','Data has been deleted !');
            return res.redirect('back');
        }
        else{
            console.log(error);
            req.flash('error','something is wrong!');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','something is wrong!');
        return res.redirect('back');
    }
}
module.exports.editRecord=async(req,res)=>{
    try{
        let findData=await portraitModel.findById(req.query.id);
        if(findData){
            console.log(findData);
            return res.render('edit_portrait',{
                findData:findData,
            })
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.editportraitData=async(req,res)=>{
    try{
        if(req.file){
            let findPortrait=await portraitModel.findById(req.params.id);
            if(findPortrait){
                let imgPath=path.join(__dirname,'..',findPortrait.portraitImg);
                await fs.unlinkSync(imgPath);
            }
            let img='';
            req.body.portraitImg=portraitModel.portraitImgPath+'/'+req.file.filename;
        }
        else{
            let findPortrait=await portraitModel.findById(req.params.id);
            if(findPortrait){
                req.body.portraitImg=findPortrait.portraitImg;
            }
        }
        let updateData=await portraitModel.findByIdAndUpdate(req.params.id,req.body);
        if(updateData){
            req.flash('success','Data has been updated !');
            return res.redirect('/admin/portrait/view_portrait');
        }
        else{
            console.log(error);
            req.flash('error','something is wrong !');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong!');
        return res.redirect('back');
    }
}
module.exports.deactive=async(req,res)=>{
    try{
        let changeStatus=await portraitModel.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStatus){
            req.flash('success','Record has successfully deactivated !');
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
        let changeStatus=await portraitModel.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Record activated successfully !');
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
        let deleteData=await portraitModel.deleteMany({_id:{$in:req.body.portraitId}});
        if(deleteData){
            req.flash('success','Records deleted successfully !')
            return res.redirect('back')
        }
        else{
            req.flash('error','error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}