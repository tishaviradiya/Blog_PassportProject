const ideaModel=require('../models/ideaModel');
module.exports.Idea_addSlider=async(req,res)=>{
    return res.render('Idea_addSlider');
}
module.exports.insertOfData=async(req,res)=>{
    console.log(req.body);
    try{
        req.body.status=true;
        let addData=await ideaModel.create(req.body);
        if(addData){
            req.flash('success','Data inserted Properly !');
            console.log(addData);
            return res.redirect('back');
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
module.exports.view_Idea=async(req,res)=>{
    try{
        console.log(req.query.search);
        let search='';
        if(req.query.search){
            search=req.query.search;
        }
        let page=0;
        let per_page=2;
        if(req.query.page){
            page=req.query.page
        }
        let allRecord=await ideaModel.find({
            $or:[
                {title:{$regex:search,$options:'i'}},
                {name:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil((allRecord/per_page));
        let findData=await ideaModel.find({
            $or:[
                {title:{$regex:search,$options:'i'}},
                {name:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
            console.log(findData);
            return res.render('view_Idea',{
                findData:findData,
                search:search,
                totalPage:totalPage,
                currentPage:page,
            })
        }
        else{
            console.log(error);
            req.flash('error','Something is wrong !');
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
        let deleteData=await ideaModel.findByIdAndDelete(req.params.id);
        if(deleteData){
            req.flash('success','Data has been deleted !');
            return res.redirect('back');
        }
        else{
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        req.flash('error','Something is wrong!');
        return res.redirect('back');
    }
}
module.exports.editRecord=async(req,res)=>{
    try{
         let findData=await ideaModel.findById(req.query.id);
            if(findData){
                return res.render('edit_ideaPage',{
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
module.exports.editIdeaData=async(req,res)=>{
    try{
        let updateData=await ideaModel.findByIdAndUpdate(req.params.id,req.body);
        if(updateData){
            console.log(updateData);
            req.flash('success','Data has been updated!');
            return res.redirect('/admin/Idea/view_Idea');
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
        let changePass=await ideaModel.findByIdAndUpdate(req.params.id,{status:false});
        if(changePass){
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
        let changeStatus=await ideaModel.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Record has been Activated !');
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
module.exports.multipleDeletsRecord=async(req,res)=>{
    try{
        let deleteData=await ideaModel.deleteMany({_id:{$in:req.body.idea_id}})
        if(deleteData){
            req.flash('success','Records deleted successfully !')
            return res.redirect('back')
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