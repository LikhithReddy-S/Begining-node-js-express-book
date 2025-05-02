const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/index.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/about.html'))
})
app.get('/contact',(req,res)=>{  
    res.sendFile(path.resolve(__dirname,'pages/contact.html'))  
})  
app.get('/post',(req,res)=>{  
    res.sendFile(path.resolve(__dirname,'pages/post.html'))  
})


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})