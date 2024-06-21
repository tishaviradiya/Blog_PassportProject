const express=require('express');
const routs=express.Router();
const OthersController=require('../controllers/OthersController');
routs.get('/add_Others',OthersController.add_Others);
routs.post('/insertOthersFieldData',OthersController.insertOthersFieldData);
routs.get('/view_Others',OthersController.view_Others);
routs.get('/deleteAdmin/:id',OthersController.deleteAdmin);
routs.get('/editRecord',OthersController.editRecord);
routs.post('/editOthersFieldData/:id',OthersController.editOthersFieldData);
// status
routs.get('/deactive/:id',OthersController.deactive);
routs.get('/active/:id',OthersController.active);
// multipleDeleteRecords
routs.post('/multipleDeleteRecords',OthersController.multipleDeleteRecords);
module.exports=routs;