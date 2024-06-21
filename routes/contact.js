const express=require('express');
const routes=express.Router();
const contactController=require('../controllers/contactController')
routes.get('/view_contact',contactController.view_contact);
routes.post('/deleteMultipleRecords',contactController.deleteMultipleRecords);
routes.get('/deleteAdmin/:id',contactController.deleteAdmin);
module.exports=routes;