const {Sequelize}=require('sequelize');

const {config}=require('../config/config');
const setupModels=require('../db/models/index');

const USER=encodeURIComponent(config.dbUser);
const PASSWORD=encodeURIComponent(config.dbPassword);
//url de conexión
const URI=`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const sequelize= new Sequelize(URI,{
  dialect:'postgres',
  logging:true,
});
setupModels(sequelize);
//sequelize.sync(); Hacer el manejo de cambios por medio de migraciones


module.exports=sequelize;
