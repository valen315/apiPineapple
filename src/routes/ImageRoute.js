const express =require('express');
const router =express.Router();

const ImageController= require('../controllers/ImageController') 

//-----RUTA PARA LISTAR IMAGEN-------------
//router.get('/image/list', ImageController.controllers.list);


//--------RUTA PARA CREAR IMAGEN---------
/* const diskstorage=multer.diskStorage({
    destination:path.join(__dirname,'../images'),
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '-pc-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')
 */

router.post('/image/post', ImageController.upload,ImageController.addProduct);
router.get('/image/get', ImageController.getAllProducts)

//------------------RUTA PARA ACTUALIZAR IMAGEN------------

//------------------RUTA PARA ELIMINAR IMAGEN---------------





module.exports=router