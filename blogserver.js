const express = require('express')
let Instance = require('./posts/Instance'); // instance object for implememting extra features
const app = express()
const axios = require('axios');// line 58 test post data on homepage through axios
// pass Table
let db_info = require('./model/model');
console.log('Table name :   ',db_info.table.getTableName())
const PostRouter=require('./posts/PostRouter')
//const Article = require('./db_table/Schema')
let username = db_info.user.name;

let PostToSave= false;
let GlobalPost = null;

const articlestest = [{
    title:'New video game Terminator versus Gouligator',
    description: 'Awesome movie',
    date: new Date().toLocaleDateString()
}]
app.listen(5002)
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.set('view engine','ejs');

///////OPTIMZING WITH AXIOS





app.post('/posts/john',async(req,res)=>{

    let {count,rows} = await db_info.table.findAndCountAll();
    let Entries = new Instance(rows,count);
    GlobalPost = new Instance(rows,count);

    let data ={id: -1,title:req.body.title,main_text:req.body.main_text
        ,author:username,post_date:new Date()} // increment id from last id element

    GlobalPost.Tail((Last_id)=>{
        
            data.id = Last_id+1;  
            //pass entries on post homepage
            //Works but must somehow pass Entries on chain
           
    })


    PostToSave=true;
    // set promise to end this res and pass it to the chain
    // main goal to pass entries
    let response = new Promise((resolve,reject)=>{
        res.end()
        resolve('reponse OK')})


    setTimeout(()=>{Promisechain(axios.default,db_info.table,data,response)},3000);



})

app.post('/',(req,res)=>{
    //console.log('Item passed:   ',req.body.Info);
    //console.log('Type:  ',typeof(req.body.Entries));
    PostToSave = true;
    GlobalPost = new Instance(req.body.Info,req.body.len);
    /*Entries.PostLoop((Entry)=>{
        console.log('item:  ',Entry);
    })*/
    // axios.get , true false state rendering index or Postindex
    res.redirect('/');
    //res.render('Postindex',{Entries:Entries})
})




///////Promise chain func
function Promisechain(axios,table,data,resp){

    return table.build(data).save().then(()=>{
        return resp.then((msg)=>{



            console.log(msg);
            // post_data is already a dict containing len,rows to be passed on homepage
            return app.emit('GET','/')//.then(()=>{

                //console.log('Process worked OK')
          // })
        })
    })


}





/////////////
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