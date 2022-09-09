const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("country", {
    id: {
      type: DataTypes.STRING(3),    
      allowNull: false,            
      unique: true,                 
      primaryKey: true,            
    },
    name: {
      type: DataTypes.STRING,        
      allowNull: false,             
    },   
    imgflag: {
      type: DataTypes.STRING,  
      validate: {              
        isUrl: true,          
      },
      allowNull: false,        
    },
    continent: {
      type: DataTypes.STRING,  
      allowNull: false,        
    }, 
    capital: {
      type: DataTypes.STRING,  
      allowNull: false,       
    },
    subregion: {
      type: DataTypes.STRING, 
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,  
    }
  } , {timestamps: false} );
  
};
