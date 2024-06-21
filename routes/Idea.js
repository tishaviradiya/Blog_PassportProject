const express=require('express');
const routs=express.Router();
const IdeaController=require('../controllers/IdeaController');
routs.get('/Idea_addSlider',IdeaController.Idea_addSlider);
routs.post('/insertOfData',IdeaController.insertOfData);
routs.get('/view_Idea',IdeaController.view_Idea);
routs.get('/deleteAdmin/:id',IdeaController.deleteAdmin);
routs.get('/editRecord',IdeaController.editRecord);
routs.post('/editIdeaData/:id',IdeaController.editIdeaData);
// status
routs.get('/deactive/:id',IdeaController.deactive);
routs.get('/active/:id',IdeaController.active);
// multipleDeletsRecord
routs.post('/multipleDeletsRecord',IdeaController.multipleDeletsRecord);
module.exports=routs;