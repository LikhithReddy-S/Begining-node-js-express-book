module.exports = (req,res)=>{
    if(!req.files || req.body.title){
        return res.render('/posts/new')
    }
    next()
}