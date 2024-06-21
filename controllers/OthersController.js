const OthersModel=require('../models/othersModel');
module.exports.add_Others=async(req,res)=>{
    return res.render('add_Others');
}
module.exports.insertOthersFieldData=async(req,res)=>{
    console.log(req.body);
    try{
        req.body.status=true;
        let othersData=await OthersModel.create(req.body);
        if(othersData){
            req.flash('success','Data is inserted! ');
            console.log('Data is inserted !');
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
        console.log('Something is wrong !');
        return res.redirect('back');
    }
}
module.exports.view_Others=async(req,res)=>{
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
        let allRecord=await OthersModel.find({
            $or:[
                {name:{$regex:search,$options:'i'}},
                {city:{$regex:search,$options:'i'}},
                {country:{$regex:search,$options:'i'}},
            ]

        }).countDocuments();
        let totalPage=Math.ceil((allRecord/per_page));
        let findData=await OthersModel.find({
            $or:[
                {name:{$regex:search,$options:'i'}},
                {city:{$regex:search,$options:'i'}},
                {country:{$regex:search,$options:'i'}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page);
        if(findData){
            return res.render('view_Others',{
                findData:findData,
                totalPage:totalPage,
                currentPage:page,
                per_page:per_page,
                search:search
            })
        }
        else{
            console.log(error);
            req.flash('error','something is wrong!');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','something is wrong !');
        return res.redirect('back');
    }
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
        let deleteData=await OthersModel.findByIdAndDelete(req.params.id);
        if(deleteData){
            req.flash('success','Data has been deleted !');
            return res.redirect('back');
        }
        else{
            console.log(error);
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','Something is wrong!');
        return res.redirect('back');
    }
}
module.exports.editRecord=async(req,res)=>{
    try{
        let findData=await OthersModel.findById(req.query.id);
        if(findData){
            console.log(findData);
            return res.render('edit_others',{
                findData:findData,
            })
        }
        else{
            console.log(error);
            req.flash('error','something is wrong!')
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        req.flash('error','something is wrong !');
        return res.redirect('back');
    }
}
module.exports.editOthersFieldData=async(req,res)=>{
    try{
        let updateData=await OthersModel.findByIdAndUpdate(req.params.id,req.body);
        if(updateData){
            console.log(updateData);
            req.flash('success','data has been updated !');
            return res.redirect('/admin/Others/view_Others');
        }
        else{
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
        let changeStatus=await OthersModel.findByIdAndUpdate(req.params.id,{status:false});
        if(changeStatus){
            req.flash('success','Record deactivated successfully!');
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
        let changeStatus=await OthersModel.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Data Activated successfully !');
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
        let deleteData=await OthersModel.deleteMany({_id:{$in:req.body.others_id}})
        if(deleteData){
            req.flash('success','Records deleted successfully !')
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