var Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable='category';//nombre de la tabla

var Category = sequelize.define(nametable, {
  category: Sequelize.STRING
},
{
    //remove create y update
	 timestamps: false,
});

module.exports = Category