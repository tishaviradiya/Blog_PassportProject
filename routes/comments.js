const express=require('express');
const routs=express.Router();
const commentController=require('../controllers/commentController');
routs.get('/view_comments',commentController.view_comments);
routs.get('/deleteComments/:id',commentController.deleteComments);
routs.post('/multipleDeleteRecords',commentController.multipleDeleteRecords);
routs.get('/deactive/:id',commentController.deactive);
routs.get('/active/:id',commentController.active);
module.exports=routs;