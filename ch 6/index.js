const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')

const app = express()
const PORT = 3000
mongoose.connect('mongodb://127.0.0.1/my_database')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


app.set('view engine','ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded())

const BlogPost = require('./models/BlogPost.js')
app.get('/',async (req,res)=>{
    // res.sendFile(path.resolve(__dirname,'pages/index.html'))
    // res.render('index')
    try {
        const blogposts = await BlogPost.find({});
        res.render('index',{
            blogposts
        })
    } catch (error){    
        console.error('Error while fecting blogs ',error);
        res.status(500).send("Something went wrong while fetching blogs");
    }

})
app.post('/search',async (req,res)=>{
    console.log(req.body);
    const searchQuery = req.body.query;
    try{
        const blogpost = await BlogPost.find({
            title : {$regex : searchQuery,$options:'i'},
        })
        res.render('index',{blogposts: blogpost})
    } catch (error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
})
app.get('/about',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about')
})
app.get('/contact',(req,res)=>{  
    // res.sendFile(path.resolve(__dirname,'pages/contact.html'))  
    res.render('contact')
})  
app.get('/post/:id',async (req,res)=>{  
    // res.sendFile(path.resolve(__dirname,'pages/post.html')) 
    try{
    const blogpost = await (BlogPost.findById(req.params.id));
    res.render ('post',{blogpost})
    } catch (error){
        console.log(error)
    }

})
app.get('/posts/new',(req,res)=>{
    res.render('create')
})
app.post('/posts/store', async (req, res) => {
    try {
      await BlogPost.create(req.body)
      console.log("Successfully added blog");
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.status(500).send('Error occurred while adding the blog')
    }
});


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})