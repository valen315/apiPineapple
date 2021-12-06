const express =require('express');
const router =express.Router();

const ProductController= require('../controllers/ProductController') 

router.post('/product/addProduct', ProductController.upload , ProductController.addProduct)
router.get('/product/allProducts', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getOneProduct)
router.put('/product/:id',ProductController.upload, ProductController.updateProduct)
router.delete('/product/:id', ProductController.deleteProduct)

/* router.get('/employee/list', EmployeeController.list);
router.post('/employee/create',EmployeeController.create);
router.get('/employee/get/:id',EmployeeController.get);
router.post('/employee/update/:id', EmployeeController.update);
router.post('/employee/delete',EmployeeController.delete);
 */
// Products router
// router.get('/:id', productController.getOneProduct)

// router.put('/:id', productController.updateProduct)

// router.delete('/:id', productController.deleteProduct)

//router.get('/product/datatest',ProductController.controllers.testdata);

module.exports=router;