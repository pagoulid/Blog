

//######FUNCTIONS########


async function Table(uinfo,db){
  // how to check first if table exists
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
  
  //await post.schema(uinfo.name);
  
  await post.sync({force:true});// bind with schema synch with postgre
  return post;
 

  

}










// SOS ignore above
 module.exports =   {validation: async function validconnect(db,callback){

  try{
    await db.authenticate();
    let check = true;
    //const query= await sequelize.query('SELECT * FROM posts', { type: QueryTypes.SELECT });
    
    
    callback('Connection to database established!!  ',check);
    
    
    
  }catch(e){
    let check = false;
    callback('Unable to connect : '+e,check);
  }


 }};