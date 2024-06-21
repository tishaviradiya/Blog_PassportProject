const Slider=require('../models/sliderModel');
const path=require('path');
const fs=require('fs');
module.exports.add_slider=async(req,res)=>{
    return res.render('add_slider');
}
module.exports.insertSliderData=async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    try{
        var img='';
        if(req.file){
            img=Slider.sliderImgPath+'/'+req.file.filename;
        }
        req.body.sliderImage=img;
        req.body.status=true;
        let addSliderData=await Slider.create(req.body);
        if(addSliderData){
            req.flash('success','Record inserted Successfully !')
            return res.redirect('back');
        }
        else{
            req.flash('error','Something is wrong !')
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Something is wrong !');
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.view_slider=async(req,res)=>{
    try{
        console.log(req.query.search);
        let search='';
        if(req.query.search){
            search=req.query.search;
        }
        var page=0;
        var per_page=3;
        if(req.query.page){
            page=req.query.page
        }
        let allRecord=await Slider.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {link:{$regex:search,$options:"i"}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil(allRecord/per_page);

        let findData=await Slider.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {link:{$regex:search,$options:"i"}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
            console.log(findData);
            return res.render('view_slider',{
                findData:findData,
                search:search,
                totalPage:totalPage,
                currentPage:page,
            });
        }
        else{
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Something is wrong !');
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deleteAdmin=async(req,res)=>{
    console.log(req.params.id);
    try{
        let findSlider=await Slider.findById(req.params.id);
        if(findSlider){
            let imgPath=path.join(__dirname,'..',findSlider.sliderImage);
            await fs.unlinkSync(imgPath);
        }
        let deleteSlider=await Slider.findByIdAndDelete(req.params.id);
        if(deleteSlider){
            req.flash('success','Data deleted successfully !');
            return res.redirect('back');
        }
        else{
            req.flash('error','Something is wrong!');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Something is wrong!');
        return res.redirect('back');
    }
    
}
module.exports.editRecord=async(req,res)=>{
    try{
        let findData=await Slider.findById(req.query.id);
        if(findData){
            return res.render('edit_slider',{
                findData:findData,
            })
        }
        else{
            req.flash('error','Something is wrong!');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','something is wrong !');
        return res.redirect('back');
    }
}
module.exports.editSliderData=async(req,res)=>{
    try{
        if(req.file){
            let findData=await Slider.findById(req.params.id);
            if(findData){
                let imgPath=path.join(__dirname,'..',findData.sliderImage);
                await fs.unlinkSync(imgPath);
            }
            let img='';
            req.body.sliderImage=Slider.sliderImgPath+'/'+req.file.filename;
        }
        else{
            let findData=await Slider.findById(req.params.id);
            if(findData){
                req.body.sliderImage=findData.sliderImage;
            }
        }
        let updateData=await Slider.findByIdAndUpdate(req.params.id,req.body);
        if(updateData){
            console.log('data has been updated!');
            req.flash('success','Data has been Updated !');
            return res.redirect('/admin/slider/view_slider');
        }
        else{
            console.log('wrong');
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Wrong !');
        req.flash('error','Something is wrong!');
        return res.redirect('back');
    }
}
module.exports.deactive=async(req,res)=>{
    try{
        let changeStatus=await Slider.findByIdAndUpdate(req.params.id,{status:false});
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
        let changeStatus=await Slider.findByIdAndUpdate(req.params.id,{status:true});
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
        let deleteData=await Slider.deleteMany({_id:{$in:req.body.sliderId}});
        if(deleteData){
            req.flash('success','Records deleted successfully !')
            return res.redirect('back');
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