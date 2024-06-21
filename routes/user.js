const express=require('express');
const routs=express.Router();
const userController=require('../controllers/userController');
const commentModel=require('../models/commentModel');
routs.get('/',userController.home);
routs.get('/blogSingle/:id', userController.blogSingle);
routs.post('/addPostComment',commentModel.uploadImages,userController.addPostComment);
// about
routs.get('/about',userController.about);
// contact
routs.get('/contact',userController.contact);
routs.post('/insertContactData',userController.insertContactData);
routs.get('/contactView',userController.contactView);
routs.get('/work-3-columns',userController.work3_columns);
module.exports=routs;