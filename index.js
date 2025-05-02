const express = require('express')
const path = require('path')
const PORT = 3000

const app = express()
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'about.html'))
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'contact.html'))
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})