const Admin=require('../models/adminModel');
const Slider=require('../models/sliderModel');
const IdeaModel=require('../models/ideaModel');
const portrait=require('../models/portraitModel');
const othersModel=require('../models/othersModel');
const Post=require('../models/postsModel');
const commentModel=require('../models/commentModel');
const About=require('../models/aboutModel');
const Contact=require('../models/contactModel');
const Category=require('../models/categoryModel');
const subCategory=require('../models/subCategoryModel');
const nodemailer=require('nodemailer');
const path=require('path');
const fs=require('fs');
module.exports.dashboard=async(req,res)=>{
    let findAdmin=await Admin.find({}).countDocuments();
    let sliderData=await Slider.find({}).countDocuments();
    let ideaThemeData=await IdeaModel.find({}).countDocuments();
    let portraitModel=await portrait.find({}).countDocuments();
    let othersData=await othersModel.find({}).countDocuments();
    let postsData=await Post.find({}).countDocuments();
    let commentData=await commentModel.find({}).countDocuments();
    let aboutData=await About.find({}).countDocuments();
    let contactData=await Contact.find({}).countDocuments();
    let categoryData=await Category.find({}).countDocuments();
    let subCategoryData=await subCategory.find({}).countDocuments();
    if(findAdmin){ 
    return res.render('dashboard',{
        adminData:req.user,
        findAdmin:findAdmin,
        sliderData:sliderData,
        ideaThemeData:ideaThemeData,
        portraitModel:portraitModel,
        othersData:othersData,
        postsData:postsData,
        commentData:commentData,
        aboutData:aboutData,
        contactData,
        categoryData,
        subCategoryData
    });
    }
}
module.exports.addAdmin=async(req,res)=>{
    return res.render('add_admin',{
        adminData:req.user,
    });
}
module.exports.viewAdmin=async(req,res)=>{
    console.log(req.query.search);
    let search='';
    if(req.query.search){
        search=req.query.search;
    }
    var page=0;
    var per_page=2;
    if(req.query.page){
        page=req.query.page;
    }
    let allRecord=await Admin.find({
        $or:[
            
            {name:{$regex:search,$options:'i'}},
            {email:{$regex:search,$options:"i"}},
            {hobby:{$regex:search,$options:"i"}},
            {city:{$regex:search,$options:"i"}},
        ]
    }).countDocuments();
    let totalPage=Math.ceil((allRecord/per_page));
    let adminData=await Admin.find({
        $or:[
            
        {name:{$regex:search,$options:'i'}},
        {email:{$regex:search,$options:"i"}},
        {hobby:{$regex:search,$options:"i"}},
        {city:{$regex:search,$options:"i"}},
    ]
    })
    .skip(page*per_page)
    .limit(per_page);

    return res.render('view_admin',{
    adminRecord:adminData,
    adminData:req.user,
    search:search,
    totalPage:totalPage,
    currentPage:page,
    per_page:per_page,
    });
}
module.exports.insertAdminData=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        var img='';
        if(req.file){
            img=Admin.iPath+'/'+req.file.filename;
        }
        req.body.name=req.body.fname+' '+req.body.lname;
        req.body.image=img;
        req.body.status=true;
        let adminData=await Admin.create(req.body);
        if(adminData){
            req.flash('success','Data  Inserted properly!' );
            console.log('Admin Record inserted');
            return res.redirect('/admin/add_admin');
        }
        else{
            console.log('something is wrong!');
            return res.redirect('/admin/add_admin');
        }
    }
    catch(err){
        console.log(`something is wrong! ${err}`);
        return res.redirect('/admin/add_admin');
    }
    
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
            let single=await Admin.findById(req.params.id);
        if(single){
            let imagePath=path.join(__dirname,'..',single.image);
            await fs.unlinkSync(imagePath);
        }
        else{
            console.log('wrong!');
            return res.redirect('back');
        }
        let del=await Admin.findByIdAndDelete(req.params.id);
        if(del){
            req.flash('success','Data has been deleted!');
            console.log(del);
            return  res.redirect('back');
        }
        else{
            console.log('something wrong!');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editAdmin=async(req,res)=>{
    let findAdmin=await Admin.findById(req.query.id);
   res.render('edit_admin',{
    adminRecord:findAdmin,
    adminData:req.user,
   });
}
module.exports.editAdminData=async(req,res)=>{
    if(req.file){
        let findData=await Admin.findById(req.params.id);
        if(findData){
            let imagePath=path.join(__dirname,'..',findData.image);
            await fs.unlinkSync(imagePath);
        }
        var img='';
        req.body.image=Admin.iPath+'/'+req.file.filename;
    }
    else{
        let findData=await Admin.findById(req.params.id);
        if(findData){
            req.body.image=findData.image;
            req.body.name=req.body.fname+' '+req.body.lname;
        }
    }
    let editData=await Admin.findByIdAndUpdate(req.params.id,req.body);
    if(editData){
        req.flash('success','Data edited successfully !')
        return res.redirect('/admin/view_admin');
    }
    else{
        console.log('error');
        return res.redirect('back');
    }
}
module.exports.login=async(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard');
    }
    res.render('login');
}
module.exports.singIn=async(req,res)=>{
   try{
            req.flash('success','Login Successfully!');
            return res.redirect('/admin/dashboard');
        }
   
   catch(err){
        console.log('Something is wrong!');
        return res.redirect('back');
   }
}

module.exports.profile=async(req,res)=>{
    return res.render('profile',{
        adminData:req.user,
    });
}
module.exports.password=async(req,res)=>{
    return res.render('password');
}
module.exports.resetPass=async(req,res)=>{
   try{
    if(req.user.password==req.body.cpass){
        if(req.body.cpass!=req.body.newpass){
            if(req.body.newpass==req.body.conpass){
              let checkPass=  await Admin.findByIdAndUpdate(req.user.id,{
                    password:req.body.newpass,
                });
                if(checkPass){
                    return res.redirect('/admin/logout');
                }
                else{
                    console.log(error);
                    return res.redirect('back');
                }
            }
            else{
                console.log('new password and confirm password are not same!');
                return res.redirect('back');
            }
        }
        else{
            console.log('current password and new password are same!');
            return res.redirect('back');
        }
    }
    else{
        console.log('current password is wrong !');
        return res.redirect('back');
    }
   }
   catch(err){
        console.log(err);
        return res.redirect('back');
   }
}
module.exports.forgetPass=async(req,res)=>{
    return res.render('forgetPass');
}
module.exports.checkEmailForget=async(req,res)=>{
    try{
        let checkEmail=await Admin.findOne({email:req.body.email});
        if(checkEmail){
            var otp=Math.round(Math.random()*1000000);
            var msg=`Your OTP is here ${otp}`;
            res.cookie('otp',otp);
            res.cookie('email',req.body.email);
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "tishaviradiya@gmail.com",
                  pass: "wckhvillclctkhxn",
                },
              });
              const info = await transporter.sendMail({
                from: '"Fred Foo 👻" <tishaviradiya@gmail.com>', // sender address
                to: "tishaviradiya@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "msg", // html body
              });
            return res.redirect('/admin/otpPage');
        }
        else{
            console.log('Invalid Email!');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.otpPage=async(req,res)=>{
    return res.render('checkOtp');
}
module.exports.verifyOtp=async(req,res)=>{
    return res.redirect('/admin/changePass');
}
module.exports.changePass=async(req,res)=>{
    return res.render('changeAdminPass');
}
module.exports.resetAdminPass=async(req,res)=>{
    try{
        if(req.body.newpass==req.body.conpass){
            var email=req.cookies.email;
            let checkEmail=await Admin.findOne({email:email});
            if(checkEmail){
                let changePass=await Admin.findByIdAndUpdate(checkEmail.id,{
                    password:req.body.newpass,
                })
                if(changePass){
                    res.clearCookie('otp')
                    res.clearCookie('email');
                    return res.redirect('/admin');
                }
                else{
                    console.log('wrong!');
                    return res.redirect('back');
                }
            }
            else{
                console.log('Invalid Email!');
                return res.redirect('back');
            }
        }
        else{
            console.log('new password and confirm password are not same!');
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
        let changeStatus=await Admin.findByIdAndUpdate(req.params.id,{status:false});
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
        let changeStatus=await Admin.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Record successfully activated !');
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
        let deleteAdmin=await Admin.deleteMany({_id:{$in:req.body.adminId}});
        if(deleteAdmin){
            req.flash('success','Record deleted !')
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