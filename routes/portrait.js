const express=require('express');
const routs=express.Router();
const portraitController=require('../controllers/portraitController');
const portraitModel=require('../models/portraitModel');
routs.get('/add_portrait',portraitController.add_portrait);
routs.post('/insertportraitData',portraitModel.uploadPortrait,portraitController.insertportraitData);
routs.get('/view_portrait',portraitController.view_portrait);
routs.get('/deleteAdmin/:id',portraitController.deleteAdmin);
routs.get('/editRecord',portraitController.editRecord);
routs.post('/editportraitData/:id',portraitModel.uploadPortrait,portraitController.editportraitData);
// status
routs.get('/deactive/:id',portraitController.deactive);
routs.get('/active/:id',portraitController.active);
// multipleDeleteRecords
routs.post('/multipleDeleteRecords',portraitController.multipleDeleteRecords);
module.exports=routs;