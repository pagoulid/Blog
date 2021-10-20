const express = require('express')
const app = express()

// pass Table
let db_info = require('./model/model');
console.log('Table name :   ',db_info.table.getTableName())
const PostRouter=require('./posts/PostRouter')
//const Article = require('./db_table/Schema')




const articlestest = [{
    title:'New video game Terminator versus Gouligator',
    description: 'Awesome movie',
    date: new Date().toLocaleDateString()
}]
app.listen(5002)
app.use(express.urlencoded({ extended: false }))
app.set('view engine','ejs')


app.get('/',async(req,res) =>{
    
    //req.query.date = new Date().toLocaleDateString()
    
    
    //const articles = await Article.find()

            
            
    
    
    var store = await db_info.table.findAll(); // returns array iterator object type
    store = new Array(store[0]);
    store.forEach((item)=>{
        item =item.toJSON();
        
        console.log('##ITEM###')
        console.log(item.id)// object type
        console.log(item.title)
        console.log('##ITEM###')
    })
    //console.log(typeof(store));
   /* var Iterator = store.values()
    var val = Iterator.next();
    while(val!= null){
        
        console.log('#######VALUEEE#####')
        console.log(val.value)
        val = Iterator.next();

    }*/
    
    
    //console.log('DATA   :',store);
    //res.render('index',{text:store}) // pass ejs template 
    res.render('index')
})

app.use('/posts',PostRouter)