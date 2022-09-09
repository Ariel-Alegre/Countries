const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "season",
    {
      name: {
        type: DataTypes.STRING,  
        allowNull: false,        
      },
    },
    { timestamps: false } 
  )   
};
