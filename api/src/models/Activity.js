const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,           
      allowNull: false,                 
    },
    difficulty: {
     type: DataTypes.STRING,               
     allowNull: false,                       
     values: ["Principiante", "Aficionado", "Normal", "Profesional", "Experto"],  
    },
    duration: {
      type: DataTypes.INTEGER,           
      allowNull: false,                 
    },
  }, {timestamps: false});
};
