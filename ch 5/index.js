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

app.get('/',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'pages/index.html'))
    res.render('index')
})
app.get('/about',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about')
})
app.get('/contact',(req,res)=>{  
    // res.sendFile(path.resolve(__dirname,'pages/contact.html'))  
    res.render('contact')
})  
app.get('/post',(req,res)=>{  
    // res.sendFile(path.resolve(__dirname,'pages/post.html'))  
    res.render('post')

})


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})