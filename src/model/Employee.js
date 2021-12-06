//import sequelize
const Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK roleID
var Role = require('./Role');

const nametable='user'
var Employee = sequelize.define(nametable, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username:Sequelize.STRING,
  password:Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  lastname: Sequelize.STRING,
  creationDate:Sequelize.DATE,
  //LLAVE FORANEA
  roleId: {
    type: Sequelize.INTEGER,
    // This is a reference to another model
    references: {
      model: Role,
      key: 'id'
    }
  }
},
{
	 timestamps: false,
});

Employee.belongsTo(Role)

module.exports = Employee