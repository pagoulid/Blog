const express = require('express')
const router = express.Router()
const Parser = require('body-parser')
const axios = require('axios');// line 58 test post data on homepage through axios


let db_info = require('../model/model');// info has db_table and user{name,pswd}
let username = db_info.user.name;
let tablename = db_info.table.getTableName();
let ID_count = 0;

let Instance = require('./Instance');

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


router.get('/'+username+'/:id',async(req,res)=>{// create new post for user
    let reqtitle = req.params.id.replace(/%20/g,' ').split(':');// want to find post given this title
    Entry = await db_info.table.findOne({where:{title:reqtitle}});
    
    res.render('Post',{Entry:Entry})
})

router.post('/'+username+'0',async(req,res)=>{// passing 0 to ignore it testing on blogserver
    

    //add count rows here make comparison with prev id(must be serial) and post data to homepage
    let {count,rows} = await db_info.table.findAndCountAll();
    let Entries = new Instance(rows,count);
    Entries.Tail((Last_id)=>{
        let data ={id: Last_id+1,title:req.body.title,main_text:req.body.main_text
            ,author:username,post_date:new Date()} // increment id from last id element


            let response = new Promise((resolve,reject)=>{
                res.end()
                resolve('reponse OK')})
            Promisechain(axios.default,db_info.table,response);
            //save new entry warning sos for : in title messages
            /*db_info.table.build(data).save().then(()=>{
                // want a get request to main page
        
                axios.default.post('/',{Entries:Entries})
                
        
                //axios.post('/../../',{Entries:Entries})// pass Entries on blogserver in oorder not to redefine them
                //res.redirect('/../../')// testing with blogserver to see if consumes the data
                
            }).then(()=>{res.end()}).catch((e)=>{
                console.log(e)
                res.end('Error')
            })*/

    })
    
// chaining promises func for
// After saving post -> axios.post-> res.end this response
// Maybe return new promise on which send first response then axios
function Promisechain(axios,table,resp){

    return table.build(data).save().then(()=>{
        return resp.then((msg)=>{



            console.log(msg);
            return axios.post('/',{Entries:'check'}).then(()=>{

                console.log('Process worked OK')
           })
        })
    })


}
    
    
    
    
    
    
    
    
    // compare id with last id to see if it is unique
    
    // UniqueID with callback
    // save post after creation
    /*db_info.table.build(data).save().then(()=>{
        // want a get request to main page
        

        res.redirect('/../../')// testing with blogserver to see if consumes the data
        
    }).catch((e)=>{
        console.log(e)
        res.end('Error')
    })*/
    

    
    

    
    

   
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


