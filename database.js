
const superuser = [{
  name:'admin',
  pswd:'5%*MhAk@72!'
}]

const user =[{
  name:'john',
  pswd:'5%*MhAk@72!'
}]

const Entry1 ={id:2,
  title:'Sec Post',
  main_text:'Greetings,this is my sec post copy/paste!I hope you learning programming but be careful not to burnout!!',
  author:'john',
  post_date:'2019-09-20'};


const Entry2 ={id:1,
  title:'First Post',
  main_text:'Greetings,this is my first post!I hope you learning programming but be careful not to burnout!!',
  author:'john',
  post_date:'2017-09-20'};

//const { Sequelize } = require('sequelize');
const { Sequelize, Op, Model, DataTypes,  QueryTypes} = require("sequelize");
var event = require('events');
const DBListen = new event.EventEmitter();
const sequelize = new Sequelize('blog', 'john', '5%*MhAk@72!', {
  host: 'localhost',
  dialect: 'postgres',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  //logging:(...msg) => console.log(msg)
});
//sequelize.define().sa

DBListen.on('valid',(data)=>{
  TableSync(user,data,(post)=>{ // save instance on table
    
    DBListen.emit('Synched',post);                   
    
  })
  

})


DBListen.on('Synched',(post)=>{
  // event for new posts
  
  setTimeout(()=>{DBListen.emit('Posted',{table:post,entry:Entry1})},5000)
  setTimeout(()=>{DBListen.emit('Posted',{table:post,entry:Entry2})},5000)
  
})
//data : table,info
DBListen.on('Posted',(data)=>{
  newpost(data.table,data.entry,(q)=>{
    console.log('Query: ',q);
  })

})
//###BEGIN VALIDATION####
Testconn(sequelize,(msg,check)=>{// db validation, for valid emit event for table sync
  console.log('###############################');
  console.log(msg);
  console.log('###############################');

  if(check){
    DBListen.emit('valid',sequelize);

  }
  
  // for more info see validations and constraints sequelize
  
})
//###BEGIN VALIDATION####

//######FUNCTIONS########
//Authenticate connection
async function Testconn(db,callback){
  try{
    await sequelize.authenticate();
    let check = true;
    //const query= await sequelize.query('SELECT * FROM posts', { type: QueryTypes.SELECT });
    
    
    callback('Connection to database established!!  ',check);
    
    
    
  }catch(e){
    let check = false;
    callback('Unable to connect : '+e,check);
  }

}

async function TableSync(uinfo,db,callback){

  let post = await db.define('posts',{
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
  })
  
  await post.schema(uinfo.name);
  await post.sync({force:true});// bind with schema synch with postgre
  callback(post);
 

  

}
/*INSERT INTO posts(id,title,main_text,author,post_date) VALUES(2,'Sec Post','Greetings,this is my first post!I hope you learning programming but be careful not to burnout!!','max','2019-09-20');
*/ 
//module.exports = [sdb,db,table,superuser[0],user[0]]


async function newpost(model,data,callback){ // save new entry to table on posted event
  
  let newuser = await model.build(data).save();
  let q = await model.findAll();
  callback(q);
}
//######FUNCTIONS########


     