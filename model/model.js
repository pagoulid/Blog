//Table creation

const db = require('../database.js');
const {DataTypes} = require("sequelize");

let Table = db.sequelize.define('posts',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    title:{
      type: DataTypes.CHAR(200),
      allowNull:false,
      unique:true
    },
    main_text:{
      type: DataTypes.CHAR(1000),
      allowNull:false,
      unique:true
    },
    author:{
      type: DataTypes.CHAR(10),
      allowNull:false
    },
    post_date:{
      type: DataTypes.DATE,
      allowNull:false
    }


  },{

    freezeTableName: true
  });

module.exports = {table:Table,user:db.user}