const express =require('express');
const router =express.Router();

const RoleController= require('../controllers/RoleController')

router.get('/role/list', RoleController.list);

module.exports=router;