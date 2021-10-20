const express = require('express')
const router = express.Router()
const Parser = require('body-parser')

let db_info = require('../model/model');// info has db_table and user{name,pswd}
let username = db_info.user.name;
let tablename = db_info.table.getTableName();
let ID_count = 0;

const Postgre = require('../conn')

const {ParameterizedQuery: PQ} = require('pg-promise');

let counter = 0;


//const Article = require('./../db_table/Schema')
let article = null
router.use(Parser.urlencoded({ extended: true })) // use it to read query

router.get('/',(req,res)=>{
    //console.log(user)
    res.redirect('/'+tablename+'/'+username)//takes local/posts as origin only at parameters:'/'
    //res.render('createPost')
})

router.get('/'+username,(req,res)=>{// create new post for user

    res.render('createPost')
})

router.post('/'+username,async(req,res)=>{
    ID_count = await AddCount();
    var data ={id: 101,title:req.body.title,main_text:req.body.main_text
        ,author:username,post_date:new Date()}// difference date() date


    
    // save post after creation
    db_info.table.build(data).save().then(()=>{
        // want a get request to main page
        //res.end('posted')
        res.redirect('/../../')// testing with blogserver to see if consumes the data
    }).catch((e)=>{
        console.log(e)
        res.end('Error')
    })
    

    
    

    
    

    //test
    //let info = await db_info.table.findAll();
    //console.log(info)
    //res.end('posted!')
})


async function AddCount(){
    return ID_count+1;
}
/*router.get('/'+user.name,(req,res)=>{
   
    res.render('createPost')
   
})/

/*
router.post('/'+user.name,(req,res)=>{
    console.log(req.body)
    counter = counter +1
    let title = new String(req.body.title)
    
    let main = new String(req.body.main_text)
    
    let data ={
        ID:counter,
        Title:title,
        Main: main,
        Author: user.name,
        Release_date: new Date().toLocaleDateString()
    }
    let date =new Date().toLocaleDateString()
    if(data.Title.length<200 && data.Main.length<1000){
        console.log(data.Title.length)
       /* const addEntry= new PQ('INSERT INTO posts(id,title,main_text,author,post_date) VALUES($1,$2,$3,$4,$5)');
        addEntry.values=[counter,title,main,user.name,date]

        user_conn.none(addEntry).then(()=>{
            console.log('Entry added!!')
        }).catch((error)=>{
            console.log('Error',error)   
        })*/

     //   user_conn.one('INSERT INTO posts(id,title,main_text,author,post_date) VALUES($1,$2,$3,$4,$5)',[counter,title,main,user.name,date]).then(()=>{
       //     console.log('Entry added!!')
       // }).catch((error)=>{
        //    console.log('Error',error)   
        //})
        //res.send('Works!!')
    //}
        
    //res.render('createPost')
//})

module.exports = router
/*
router.get('/test',(req,res)=>{
    res.render('test')
    //res.send('Articles section')
})


//##################
router.get('/test?title=mhtsake',(req,res)=>{

    res.render('post',{text:'mhtsake',description:'Talking about games all day',date:new Date().toLocaleDateString()})
})
/*
BlogPost((Posts)=>{
    Posts.forEach(Post =>{

        router.get('/test?title='+Post.title,(req,res)=>{

            res.render('post',{text:Post})
        })
    })
})

async function BlogPost(callback){
    let Posts = await Article.find()
    return  callback(Posts)
}

*/

//##################
/*
router.post('/test',async (req,res)=>{
    //console.log(req.body) // use it later for mongodb
    article = new Article({
        title:req.body.title,
        description:req.body.description,
        date:new Date().toLocaleDateString()
    })
    
    article = await article.save()
    //res.send(200,req.body)
    res.redirect('/../../')
    //res.send('Post added'
   
    
})

*/


