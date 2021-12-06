//const controllers={}

//import model and sequelize
var Image = require('../model/Image');
var sequelize = require('../model/database');
// image Upload
var path=require('path')
const fs = require('fs')
var multer=require('multer')

//para migrar por si no tiene tabla
sequelize.sync();

const addProduct = async (req, res) => {
  const data = await Image.create({
        image: req.file.originalname
      })
  // .then(function(data){
  //   const res = { success: true, data: data, message:"Guardo exitosamente" }
  //   return res;
  // })
  // .catch(error =>{
  //   const res = { success: false, message: "ERROR ADDPRODUCT"+error }
  //   return res;
  // })
  res.status(200).send(data)
  console.log(data)

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, '../Images'))
        //cb(null, 'Images/')
        //uploads / images
        //destination:path.join(__dirname,'../images'),
    },
    filename: (req, file, cb) => {
        //cb(null, Date.now() + path.extname(file.originalname))
        cb(null,file.originalname)
    }
})

const upload = multer({
  storage: storage,
  //limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')


const getAllProducts = async (req, res) => {

  let products = await Image.findAll({})
  res.status(200).send(products)

}

//----------------LISTAR IMAGEN-----------
// controllers.list =( req, res) => {
//   Image.findAll()
//   .then((image)=>{
//     image.map(img=>{
//       fs.writeFileSync(path.join(__dirname,'../dbImages/' + img.name+'-pc.png'),img.dato)
//       //return res.send(`File has been uploaded.`);
//     })
//     /* const imageDB=fs.readFileSync(path.join(__dirname,'../dbImages/'))
//     res.json(imageDB) */;
//   })
//   .then(function(){
//     const imageDB=fs.readFileSync(path.join(__dirname,'../dbImages/'))
//     let student = JSON.parse(imageDB);
//     console.log(student);
//     //res.send(`db imageeees`);
//   })
//   .catch(error => {
//     return error;
//   }); 
//   //res.json(imageDB);
// }



//--------------------CREAR IMAGEN---------

// controllers.create = (req,res) => {
//   try {
//     console.log(req.file);

//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }

//      Image.create({
//         type : req.file.mimetype ,
//         name : req.file.originalname,
//         dato : fs.readFileSync(path.join(__dirname, '../images/'+ req.file.filename))
//       })
//       /* .then((image) => {
//         fs.writeFileSync(path.join(__dirname,'../dbImages/' + image.name+'-pc.png'),image.dato)
//         return res.send(`File has been uploaded.`);
//       }); */
//        .then(function(data){
//         const res = { success: true, data: data, message:"Creado exitosamente" }
//         return res;
//       })
    

//   }catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }

// }


module.exports={
  addProduct,
  getAllProducts,
  upload
}