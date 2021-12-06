var Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable='images';//nombre de la tabla

var Image = sequelize.define(nametable, {
  image:Sequelize.STRING
    /* id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    type:Sequelize.STRING,
    name:Sequelize.STRING,
    dato: Sequelize.BLOB('medium'), */
},
{
    //remove create y update
	 timestamps: false,
});

module.exports = Image