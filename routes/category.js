const express=require('express');
const routs=express.Router();
const categoryController=require('../controllers/categoryController');
routs.get('/add_category',categoryController.add_category);
routs.post('/insertCategoryData',categoryController.insertCategoryData);
routs.get('/view_category',categoryController.view_category);
routs.get('/deleteAdmin/:id',categoryController.deleteAdmin);
routs.get('/editRecord',categoryController.editRecord);
routs.post('/editCategoryData/:id',categoryController.editCategoryData);
routs.get('/deactive/:id',categoryController.deactive);
routs.get('/active/:id',categoryController.active);
routs.post('/deleteMultipleRecords',categoryController.deleteMultipleRecords);
module.exports=routs;