const {Pool}= require('pg');
const {config}=require('../config/config');

const USER=encodeURIComponent(config.dbUser);
const PASSWORD=encodeURIComponent(config.dbPassword);
//url de conexión
const URI=`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool=new Pool({connectionString:URI});
  //Conexion con cada parmetro
  // const pool=new Pool({
  //   host:'localhost',
  //   port:5432,
  //   user:'sabino',
  //   password:'admin2023',
  //   database:'my_store',
  // });

module.exports=pool;
