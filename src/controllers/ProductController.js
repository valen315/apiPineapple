const controllers={}
//import model and sequelize
var Product = require('../model/Product');
var Category = require('../model/Category');
var sequelize = require('../model/database');
// image Upload
var path=require('path')
var multer=require('multer')

//para migrar por si no tiene tabla
sequelize.sync();

/*  controllers.testdata = async ( req, res) => {
  
  const response = await sequelize.sync().then(function() {
    //Create categoria
     Category.create({
        category: 'Fruta'
    });

    // create pruducto
    Product.create({
        name:'Manzana',
        description:'verde recien traida',
        quantity: 300,
        unit_price: 20,
        picture: 'Manzana-Smith.jpg',
        categoryId:1
    });
     
    
    //llamar todos los datos del users
    const data =  Product.findAll()
    return data;
  })
  .catch(err => {
    return err;
  });
  res.json({success :true ,data: response});
  }  */


  // 1. create product
 const addProduct = async (req, res) => {

  let info = {
      name:req.body.name,
      description:req.body.description,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
      categoryId:req.body.categoryId,
      picture: req.file.originalname,
  }

  const product = await Product.create(info)
  res.status(200).send(product)
  console.log(product)

} 

/* const addProduct  = async (req,res) => {
  try {
    // data
    //const id = req.params.id
    const { name, description, quantity, unit_price,category }= req.body;
    const {picture}=req.file.originalname
    // create
    const data = await Product.create({
      name: name,
      description: description,
      quantity: quantity,
      unit_price: unit_price,
      picture:picture,
      categoryId:category.id
    })
    .then(function(data){
      const res = { success: true, data: data, message:"Guardo exitosamente" }
      return res;
    })
    .catch(error =>{
      const res = { success: false, message: error }
      return res;
    })

    res.json(data);

  } catch (e) {
    const data = { success: false, message: error }
    res.json(data);
  }
}

 */
// 2. get all products

 const getAllProducts = async (req, res) => {
   let products = await Product.findAll({
     include:[ Category ]
   })
   res.status(200).send(products)
 }


 // 3. get single product

const getOneProduct = async (req, res) => {

  let id = req.params.id
  let product = await Product.findOne(
    {
      where: { id: id },
      include: [ Category ]
  }  
  )
  res.status(200).send(product)

}
  // 4. update Product
 const updateProduct = async (req, res) => {

  let id = req.params.id

  let info = {
    name:req.body.name,
    description:req.body.description,
    quantity: req.body.quantity,
    unit_price: req.body.unit_price,
    categoryId:req.body.categoryId,
    picture: req.file.originalname,
  }

  const product = await Product.update(info, { where: { id: id }})

  res.status(200).send(product + 'Product update')
 

}
// 5. delete product by id

const deleteProduct = async (req, res) => {

  let id = req.params.id
  
  await Product.destroy({ where: { id: id }} )

  res.status(200).send('Product is deleted !')

}
// 6. Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null,path.join(__dirname, '../Images'))
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
      const fileTypes = /jpeg|jpg|PNG|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('picture')


module.exports={
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  upload,
  controllers
};
