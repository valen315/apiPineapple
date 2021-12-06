const controllers={}
//import model and sequelize
var Category = require('../model/Category');
var sequelize = require('../model/database');

//para migrar por si no tiene tabla
sequelize.sync();

controllers.list = async (req, res) => {

    const data = await Category.findAll()
    .then(function(data){
      return data;
    })
    .catch(error => {
      return error;
    }); 
  
    res.json({success : true, data : data});
  
}

module.exports=controllers;