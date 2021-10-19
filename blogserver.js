const express = require('express')
const app = express()

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

            
            
    
    
    
    res.render('index') // pass ejs template 
})

app.use('/posts',PostRouter)