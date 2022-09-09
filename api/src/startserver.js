"use strict";
const axios = require("axios");
//const sequelize = require("sequelize");
const { Country, Season } = require("./db.js");

const ApiCountries = async () => {
  const res = await axios.get("https://restcountries.com/v3/all"); 
  const data = res.data.map((country) => {    
   let cap;  
    if (!country.capital) {              
      cap = "No se encontro la capital";  
    } else if (country.capital.length === 1) { 
      cap = country.capital[0];              
    } else if (country.capital.length > 1) {    
      cap = country.capital.join(", ");           
    }
    return {                             
      id: country.cca3,
      name: country.name.common,
      imgflag: country.flags[0],
      continent: country.region,
      capital: cap,
      subregion: country.subregion ? country.subregion : "No se encontro la subregion" ,
      area: country.area,
      population: country.population,
    };
  });

  for (const info of data) {       
    const [row, created] = await Country.findOrCreate({            
      where: { id: info.id },                                              
      defaults: {                                                          
        id: info.id,
        name: info.name,
        imgflag: info.imgflag,
        continent: info.continent,
        capital: info.capital,
        subregion: info.subregion,
        area: info.area,
        population: info.population,
      },
    });
  }
};



module.exports ={                     
  startServer: async () => {         
    try {
      await Season.create({    
        name: "Otoño",         
      });
      await Season.create({    
        name: "Invierno",         
      });
      await Season.create({       
        name: "Primavera",        
      });
      await Season.create({      
        name: "Verano",         
      }); 
      await ApiCountries();     
    } catch (e) {
      console.log("startserver.js error: ", e);
    }
},
};

