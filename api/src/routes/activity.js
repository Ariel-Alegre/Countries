"use strict";
const express = require("express");
const router = express.Router();
const { Country, Activity, Season } = require("../db.js"); 

router.use(express.json());   

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body; 
    
    const [activity, created] = await Activity.findOrCreate({ 
      where: { name: name }, 
      defaults: {       
        difficulty: difficulty,
        duration: duration,
      },
    });

    const table = await Country.findAll({ where: { id: countries } }); 

    for (const data of table) {   
      await data.addActivity(activity.dataValues.id); 
    }
    const seasons = await Season.findAll({ where: { name: season } }); 

    for (let info of seasons) {  
      await info.addActivity(activity.dataValues.id);
    }
    res.status(200).send(activity);   
  } catch (error) {
    console.log("tenemos un problema",error);  
  }
});

router.get("/:name", async (req, res) => {
  try {
    let { name } = req.params;            

    let activity = await Activity.findOne({ 
      where: { name: name },
      include: Season,                    
    });
    if (activity !== null) { 
      res.json(activity);    
    } else {
      res.status(400).send("Page not Found"); 
    }
  } catch (error) {
    console.log("error en activity.js: ", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const activity = await Activity.findAll({ attributes: ["name", "id"] }); 
    if (activity.length !== 0) { 
      res.json(activity);
    } else {
      res.json([{ name: "No hay actividades guardadas" }]);
    }
  } catch (error) {
    console.log("error en activity.js: " ,error);
  }
});

module.exports = router;
