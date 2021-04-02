const Sequelize = require('sequelize');

const sequelize = new Sequelize('qluser','root','',{
    host: "localhost",
    dialect:"mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

const Database = {};

Database.Sequelize = Sequelize;
Database.sequelize = sequelize;
//table -- Object
Database.Users = require('../model/UserModel')(sequelize,Sequelize);


module.exports = Database;