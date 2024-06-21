const Contact=require('../models/contactModel');
module.exports.view_contact=async(req,res)=>{
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
        let allRecord=await Contact.find({
            $or:[
                {name:{$regex:search,$options:"i"}},
                {email:{$regex:search,$options:"i"}},
                {message:{$regex:search,$options:"i"}},
                {subject:{$regex:search,$options:"i"}},
            ]
        }).countDocuments();
        let totalPage=Math.ceil(allRecord/per_page);
        let findData=await Contact.find({
            $or:[
                {name:{$regex:search,$options:"i"}},
                {email:{$regex:search,$options:"i"}},
                {message:{$regex:search,$options:"i"}},
                {subject:{$regex:search,$options:"i"}},
            ]
        });
        if(findData){
            return res.render('view_contact',{
                findData,
                search:search,
                totalPage:totalPage,
                per_page:per_page,
                currentPage:page,
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
module.exports.deleteMultipleRecords=async(req,res)=>{
    try{
        let deleteData=await Contact.deleteMany({_id:{$in:req.body.contactId}});
        if(deleteData){
            req.flash('success','Data deleted succeddfully !')
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
module.exports.deleteAdmin=async(req,res)=>{
    try{
        let deleteData=await Contact.findByIdAndDelete(req.params.id);
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