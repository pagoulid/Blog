const express = require('express')
let Instance = require('./posts/Instance'); // instance object for implememting extra features
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
    
    let {count,rows} = await db_info.table.findAndCountAll();

    let Entries = new Instance(rows,count);
    res.render('index',{Entries:Entries});
    
})

app.use('/posts',PostRouter)