const controllers={}
//import model and sequelize
var Employee = require('../model/Employee');
var Role = require('../model/Role');
var sequelize = require('../model/database');

//para migrar por si no tiene tabla
sequelize.sync();

//OBTENER POR ID UN EMPLEADO
controllers.get = async (req,res) => {
  const { id } = req.params;
  const data = await Employee.findAll({
      where: { id: id },
      include: [ Role ]
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data: data });
}

controllers.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const { username, password, email, name, lastname,creationDate,role } = req.body;
  // Update data
  const data = await Employee.update({
    username: username,
    password: password,
    email: email,
    name: name,
    lastname:lastname,
    creationDate:creationDate,
    roleId: role
  },
  {
    where: { id: id}
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  }) 
  res.json({success:true, data:data, message:"Actualización exitosa"});
}

controllers.list = async (req, res) => {

  const data = await Employee.findAll({
    include: [ Role ]
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  }); 

  res.json({success : true, data : data});

}

controllers.create = async (req,res) => {
  try {
    // data
    const { username, password, email, name, lastname,creationDate,role } = req.body;
    // create
    const data = await Employee.create({
      username: username,
      password: password,
      email: email,
      name: name,
      lastname:lastname,
      creationDate:creationDate,
      roleId: role
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

controllers.delete = async (req, res) => {

  try {

    // parameter post
    const { id } = req.body;
    // delete sequelize
    const response = await Employee.destroy({//destroy es eliminar 
      where: { id: id }
    })
    .then(function(data){
      const res = { success: true, deleted: data, message: "Usuario eliminado exitosamente" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, message: error.message }
      return res;
    })

    res.json(response);

  } catch (e) {

    const response = { success: false, message: e.message }
    res.json(response)

  }

}



//  controllers.testdata = async ( req, res) => {
  
//   const response = await sequelize.sync().then(function() {
//     //Create role
//      Role.create({
//         role:  'Views'
//     });

//     // create employee
//     Employee.create({
//         username:'jose2',
//         password:'1234',
//         email: 'jose@gmail.com',
//         name: 'Jose',
//         lastname: 'Jimenez',
//         creationDate:'2-04-2022',
//         roleId:2
//     });
     
    
//     //llamar todos los datos del users
//     const data =  Employee.findAll()
//     return data;
//   })
//   .catch(err => {
//     return err;
//   });
//   res.json({success :true ,data: response});
// }

// controllers.list = async ( req, res) => {

//     const data = await Employee.findAll();
//     res.json(data)

// }



module.exports=controllers;