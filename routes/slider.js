const express=require('express');
const routs=express.Router();
const Slider=require('../models/sliderModel');
const sliderController=require('../controllers/sliderController');
// add
routs.get('/add_slider',sliderController.add_slider);
routs.post('/insertSliderData',Slider.sliderUploadImg,sliderController.insertSliderData);
routs.get('/view_slider',sliderController.view_slider);
routs.get('/deleteAdmin/:id',sliderController.deleteAdmin);
routs.get('/editRecord',sliderController.editRecord);
routs.post('/editSliderData/:id',Slider.sliderUploadImg,sliderController.editSliderData);
// status
routs.get('/deactive/:id',sliderController.deactive);
routs.get('/active/:id',sliderController.active);
// multipleDeleteRecords
routs.post('/multipleDeleteRecords',sliderController.multipleDeleteRecords);
module.exports=routs;