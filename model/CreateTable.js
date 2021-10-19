const {DataTypes} = require("sequelize");

module.exports = {CreateTable : async function Create(db,callback){
    post = await db.define('posts',{
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

    await post.sync({force:true});// bind with schema synch with postgre
    callback(post);


}}