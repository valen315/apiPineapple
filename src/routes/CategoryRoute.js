const express =require('express');
const router =express.Router();

const CateroryController= require('../controllers/CategoryController')

router.get('/category/list', CateroryController.list);

module.exports=router;