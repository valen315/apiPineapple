//import sequelize
const Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK categoryID
var Category = require('./Category');

const nametable='products'
var Product = sequelize.define(nametable, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:Sequelize.STRING,
  description:Sequelize.STRING,
  quantity: Sequelize.INTEGER,
  unit_price: Sequelize.DECIMAL(17,2),
  picture: Sequelize.STRING,
  //LLAVE FORANEA
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // This is a reference to another model
    references: {
      model: Category,
      key: 'id'
    }
  }
},
{
	 timestamps: false,
});

Product.belongsTo(Category)

module.exports = Product