var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'prueba1',//nombre del database
  'root', //user
  'beto1594', //password
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
//sequelize.sync()

module.exports = sequelize;