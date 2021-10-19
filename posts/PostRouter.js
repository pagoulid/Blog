const express = require('express')
const router = express.Router()
const Parser = require('body-parser')



const Postgre = require('./../database')
const {ParameterizedQuery: PQ} = require('pg-promise');
const superuser_conn = Postgre[0]
const user_conn = Postgre[1]
const SchemaTable = Postgre[2]

const superuser = Postgre[3]
const user = Postgre[4]
let counter = 0;


//const Article = require('./../db_table/Schema')
let article = null
router.use(Parser.urlencoded({ extended: true })) // use it to read query

router.get('/',(req,res)=>{
    //console.log(user)
    res.redirect('/posts/'+user.name)
    //res.render('createPost')
})


router.get('/'+user.name,(req,res)=>{
    //console.log(user)
    /*var post ={
        title:'',
        main_text:'',

    }*/
    res.render('createPost')
    //res.render('createPost')
})


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

        user_conn.one('INSERT INTO posts(id,title,main_text,author,post_date) VALUES($1,$2,$3,$4,$5)',[counter,title,main,user.name,date]).then(()=>{
            console.log('Entry added!!')
        }).catch((error)=>{
            console.log('Error',error)   
        })
        //res.send('Works!!')
    }
        
    //res.render('createPost')
})

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


