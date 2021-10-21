// Database Creation

const User ={
    name:'john',
    pswd:'5%*MhAk@72!'
  }

const { Sequelize, Op, Model, DataTypes,  QueryTypes} = require("sequelize");

const db = new Sequelize('blog', User.name, User.pswd, {
    host: 'localhost',
    dialect: 'postgres',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    //logging:(...msg) => console.log(msg)
  });

module.exports = {
    sequelize:db,user:User
}