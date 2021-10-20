const db_instance = require('../database');
let create = require('./SyncTable');

let conn = require('../conn');

conn.validation(db_instance.sequelize,(msg,check)=>{

    console.log(msg)
    let data = db_instance.sequelize // if valid pass db to data and proceed with table
    if(check){
        create.CreateTable(data,(table)=>{
            query(table,(q)=>{
                console.log(q);
            })

        })
        
    }
})


// want to check connection then create table
async function query(data,callback){
    var q = await data.findAll()
    callback(q)
    
}