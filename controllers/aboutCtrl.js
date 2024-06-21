const About=require('../models/aboutModel');
const path=require('path');
const fs=require('fs');
module.exports.add_about=async (req,res)=>{
    try{
        return res.render('add_about');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.addAboutData=async(req,res)=>{
    try{
        let img='';
        if(req.file){
             img=await About.iPath+'/'+req.file.filename;
        }
        req.body.image=img;
        req.body.status=true;
        let addData=await About.create(req.body);
        if(addData){
            req.flash('success','Data inserted Successfully!');
            console.log('Data Inserted !');
            return res.redirect('back');
        }
        else{
            console.log('error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.view_about=async(req,res)=>{
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
        let allRecord=await About.find({
            $or:[
                {name:{$regex:search,$options:"i"}},
                {professiong:{$regex:search,$options:"i"}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil(allRecord/per_page)
        let findData=await About.find({
            $or:[
                {name:{$regex:search,$options:"i"}},
                {professiong:{$regex:search,$options:"i"}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
        return res.render('view_about',{
            findData:findData,
            search:search,
            totalPage:totalPage,
            currentPage:page,
            per_page:per_page
            });
        }
        else{
            console.log('error');
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
        let findData=await About.findById(req.params.id);
        if(findData){
            let imagePath=path.join(__dirname,'..',findData.image);
            await fs.unlinkSync(imagePath);
        }
        else{
            req.flash('error','Error')
            return res.redirect('back');
        }
        let deleteData=await About.findByIdAndDelete(req.params.id);
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
        let editData=await About.findById(req.query.id);
        if(editData){
            return res.render('edit_about',{
                editData:editData,
            });
        }
        else{
            console.log(err);
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editAboutData=async(req,res)=>{
    try{
        if(req.file){
            var findData=await About.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(imagePath);
            }
            let img='';
            req.body.image=About.iPath+'/'+req.file.filename;
        }
        else{
            var findData=await About.findById(req.params.id);
            if(findData){
                req.body.image=findData.image;
            }
        }
        let editData=await About.findByIdAndUpdate(req.params.id,req.body);
        if(editData){
            req.flash('success','Data edited successfully !')
            return res.redirect('/admin/about/view_about');
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
        let changeStatus=await About.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStatus){
            req.flash('success','Deactivated successfully !');
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
        let changeStatus=await About.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','acctivated successfully !')
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
        let deleteData=await About.deleteMany({_id:{$in:req.body.aboutId}});
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