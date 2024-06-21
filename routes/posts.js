const express=require('express');
const routs=express.Router();
const postsController=require('../controllers/postsController');
const postsModel=require('../models/postsModel');
routs.get('/add_posts',postsController.add_posts);
routs.post('/insertPostsData',postsModel.uploadPostsImg,postsController.insertPostsData);
routs.get('/view_posts',postsController.view_posts);
routs.get('/deleteAdmin/:id',postsController.deleteAdmin);
routs.get('/editRecord',postsController.editRecord);
routs.post('/editPostsData/:id',postsModel.uploadPostsImg,postsController.editPostsData);
// status
routs.get('/deactive/:id',postsController.deactive);
routs.get('/active/:id',postsController.active);
// multipleDeleteRecords
routs.post('/multipleDeleteRecords',postsController.multipleDeleteRecords);
module.exports=routs;