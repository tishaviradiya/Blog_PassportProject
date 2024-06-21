const express=require('express');
const routs=express.Router();
const adminController=require('../controllers/adminController');
const Admin=require('../models/adminModel');
const passport=require('passport');
routs.get('/dashboard',passport.checkAuth,adminController.dashboard);
routs.get('/',adminController.login);
routs.post('/singIn',passport.authenticate('local',{failureRedirect:'/admin/',failureFlash:'Invalid Credentials!'}),adminController.singIn);
routs.get('/logout',async(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        return res.redirect('/admin');
    })
});
routs.get('/profile',passport.checkAuth,adminController.profile);
routs.get('/password',adminController.password);
routs.post('/resetPass',adminController.resetPass);
routs.get('/add_admin',passport.checkAuth,adminController.addAdmin);
routs.get('/view_admin',passport.checkAuth,adminController.viewAdmin);
routs.post('/insertAdminData',Admin.uploadImage,adminController.insertAdminData);
routs.get('/deleteAdmin/:id',adminController.deleteAdmin);
routs.get('/editRecord',passport.checkAuth,adminController.editAdmin);
routs.post('/editAdminData/:id',Admin.uploadImage,adminController.editAdminData);
// forgetPass
routs.get('/forgetPass',adminController.forgetPass);
routs.post('/checkEmailForget',adminController.checkEmailForget);
routs.get('/otpPage',adminController.otpPage);
routs.post('/verifyOtp',adminController.verifyOtp);
routs.get('/changePass',adminController.changePass);
routs.post('/resetAdminPass',adminController.resetAdminPass);
// status
routs.get('/deactive/:id',adminController.deactive);
routs.get('/active/:id',adminController.active);
// multipleDeleteRecords
routs.post('/multipleDeleteRecords',adminController.multipleDeleteRecords);
// slider
routs.use('/slider',passport.checkAuth,require('./slider'));
// Idea
routs.use('/Idea',passport.checkAuth,require('./Idea'));
// portrait
routs.use('/portrait',passport.checkAuth,require('./portrait'));
// Others
routs.use('/Others',passport.checkAuth,require('./Others'));
// posts
routs.use('/posts',passport.checkAuth,require('./posts'));
// comments
routs.use('/comments',passport.checkAuth,require('./comments'));
// about
routs.use('/about',passport.checkAuth,require('./about'));
// contact
routs.use('/contact',passport.checkAuth,require('./contact'));
// category
routs.use('/category',passport.checkAuth,require('./category'));
// add_subCategory
routs.use('/subCategory',passport.checkAuth,require('./subCategory'));
module.exports=routs;