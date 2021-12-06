const express =require('express');
const router =express.Router();

const EmployeeController= require('../controllers/EmployeeController') 

router.get('/employee/list', EmployeeController.list);
router.post('/employee/create',EmployeeController.create);
router.get('/employee/get/:id',EmployeeController.get);
router.post('/employee/update/:id', EmployeeController.update);
router.post('/employee/delete',EmployeeController.delete);


//router.get('/datatest',EmployeeController.testdata);


//router.get('/save',(req,res)=>{
  //  res.json({status:"Employeed saved"});
//})


module.exports=router;