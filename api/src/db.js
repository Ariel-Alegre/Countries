require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity, Season } = sequelize.models;



// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// El método Sequelize belongsToMany()se utiliza para crear una asociación de muchos a muchos entre dos tablas. Dos tablas que tienen una relación Muchos a Muchos requieren una tercera tabla que actúa como unión o tabla de combinación. Cada registro en la tabla de unión hará un seguimiento de las claves principales de ambos modelos.

Country.belongsToMany(Activity, {through: 'countryactivity'})  // relaciono a mi modelo Country con Activity a travez de una nueva tabla llamada countryactivity.
Activity.belongsToMany(Country, {through: 'countryactivity'})   // relaciono a mi modelo Activity con Country a travez de una nueva tabla llamada countryactivity.
Activity.belongsToMany(Season, {through: 'activityseason'})     // relaciono a mi modelo Activity con  Season a travez de una nueva tabla llamada countryactivity.
Season.belongsToMany(Activity, {through: 'activityseason'})       // relaciono a mi modelo Season con  Activity a travez de una nueva tabla llamada countryactivity.


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
