const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
const ejs = require('ejs')
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