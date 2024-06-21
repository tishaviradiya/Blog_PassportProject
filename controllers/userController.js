const Slider=require('../models/sliderModel');
const ideaModel=require('../models/ideaModel');
const OthersModel=require('../models/othersModel');
const portraitModel=require('../models/portraitModel');
const postsModel=require('../models/postsModel');
const commentModel=require('../models/commentModel');
const About=require('../models/aboutModel');
const contactModel=require('../models/contactModel');
const Category=require('../models/categoryModel');
const subCategory=require('../models/subCategoryModel');
const moment=require('moment');
const nodemailer=require('nodemailer');
module.exports.home=async(req,res)=>{
    try{
        let displaySliderData=await Slider.find({status:true});
        let displayOfferData=await ideaModel.find({status:true});
        let OthersData=await OthersModel.find({status:true});
        let portraitData=await portraitModel.find({status:true});
        let postsData=await postsModel.find({status:true});
        if(displaySliderData){
            return res.render('userPanel/home',{
                displaySliderData:displaySliderData,
                displayOfferData:displayOfferData,
                OthersData:OthersData,
                portraitData:portraitData,
                postsData:postsData,
            });
        }
        else{
            req.flash('error','Something is Wrong !')
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Something is Wrong !')
        return res.redirect('back');
    }

}
module.exports.blogSingle=async(req,res)=>{
    try{
        let postData=await postsModel.find({}).sort({_id:-1}).limit(3);
        console.log(postData);
        let commentData=await commentModel.find({postId:req.params.id});
        let allIds=await postsModel.find({}).select('_id');
        let current;
        allIds.map((v,i)=>{
            if(v._id==req.params.id){   
                current=i;
            }
        })
        let findData=await postsModel.findById(req.params.id);
        if(findData){
            return res.render('userPanel/blogSingle',{
                findData,
                pos:current,
                allIds:allIds,
                commentData:commentData,
                postData,
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
module.exports.addPostComment=async(req,res)=>{
    try{
        let img='';
        if(req.file){
            img=commentModel.iPath+'/'+req.file.filename;
        }
        req.body.status=true;
        req.body.commentImage=img;
        req.body.created_date=moment().format('LLL');
        let addData=await commentModel.create(req.body);
        if(addData){
            req.flash('success','Comments Added !');
            return res.redirect('back');
        }
        else{
            req.flash('error','Error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.about=async(req,res)=>{
    try{
        let findData=await About.find();
        if(findData){
            return res.render('userPanel/about',{
                findData:findData,
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
module.exports.contact=async(req,res)=>{
    try{
        return res.render('userPanel/contact');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.insertContactData=async(req,res)=>{
    try{
        let addData=await contactModel.create(req.body);
        if(addData){
            let checkEmail=await contactModel.findOne({email:req.body.email});
            if(checkEmail){
                var msg=`<a href= " http://localhost:8001/contactView">Click Here</a>`
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // Use `true` for port 465, `false` for all other ports
                    tls: {
                        rejectUnauthorized: false // Disable SSL verification
                    },
                    auth: {
                      user: "tishaviradiya@gmail.com",
                      pass: "wckhvillclctkhxn",
                    },
                  });
                  const info = await transporter.sendMail({
                    from: '"Maddison Foo Koch 👻" <tishaviradiya@gmail.com>', // sender address
                    to: "tishaviradiya@gmail.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: msg, // html body
                  });
                  console.log(addData);
                  return res.redirect('/contactView')    
            }
            else{
                console.log('Invalid Email !');
                return res.redirect('back');
            }
                
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
module.exports.contactView=async(req,res)=>{
    try{
        return res.render('userPanel/contactView');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.work3_columns=async(req,res)=>{
    try{
        let categoryData=await Category.find();
        let subCategoryData=await subCategory.find();
        if(categoryData){
            return res.render('userPanel/work3_columns',{
                categoryData,
                subCategoryData
            });
        }
        else{
            console.log('error');
            req.flash('error','Error')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}