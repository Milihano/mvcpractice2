'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init({
    sn: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true
    },
    customer_id: {
        type: DataTypes.STRING,
        primaryKey: true   
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {  
      type: DataTypes.STRING,
    },
    password: {  
      type: DataTypes.STRING,
    },
    email: {  
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    is_phone_verified:{  
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    passwordsalt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};