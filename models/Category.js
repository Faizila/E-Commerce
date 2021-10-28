// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection.js');

// Create a new Sequelize model for Category
class Category extends Model {}

// set up fields and rules for Category model
Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// export
module.exports = Category;
