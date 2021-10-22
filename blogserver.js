const express = require('express')
let Instance = require('./posts/Instance'); // instance object for implememting extra features
const app = express()

// pass Table
let db_info = require('./model/model');
console.log('Table name :   ',db_info.table.getTableName())
const PostRouter=require('./posts/PostRouter')

let username = db_info.user.name;

let PostToSave= false;
let GlobalPost = null;


app.listen(5002)
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.set('view engine','ejs');

///////OPTIMZING WITH AXIOS





app.post('/posts/'+username,async(req,res)=>{
    let counter =await db_info.table.count();
    let data = null
    if(counter>0){
        let last_id = await db_info.table.findOne({where:{id:counter}})
        keys=Object.entries(last_id);
        val = Object.values(keys[0][1]);
        data ={id: val[0] + 1,title:req.body.title,main_text:req.body.main_text
            ,author:username,post_date:new Date()} // increment id from last id element

    }
    else{
       data ={id: 1,title:req.body.title,main_text:req.body.main_text
            ,author:username,post_date:new Date()} // increment id from last id element
    }
    
    
    PostToSave=true;
    await db_info.table.build(data).save();
    let {count,rows} = await db_info.table.findAndCountAll();

    
    // main goal to pass entries
    let response = new Promise((resolve,reject)=>{
        
        GlobalPost=new Instance(rows,count);
        res.redirect('/');
        resolve('reponse OK')})


    
    setTimeout(async ()=>{response.then((msg)=>{console.log(msg)}).catch((e)=>{console.log(e)})},3000);



})





app.get('/',async(req,res) =>{
    if(PostToSave==true){
        PostToSave=false;
        
        
        res.render('index',{Entries:GlobalPost})

    }
    else{
        let {count,rows} = await db_info.table.findAndCountAll();

        let Entries = new Instance(rows,count);
        res.render('index',{Entries:Entries});
    }
    
})


app.use('/posts',PostRouter)