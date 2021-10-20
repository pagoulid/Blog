






// func for further implemantation to db validation

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