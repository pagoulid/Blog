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



module.exports = router



