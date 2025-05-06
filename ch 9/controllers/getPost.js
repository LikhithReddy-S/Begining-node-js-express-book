const BlogPost = require('../models/BlogPost')

module.exports = async (req,res)=>{
    try {
        const blogpost = await BlogPost.findById(req.params.id)
        res.render('post',{
            blogpost
        })
    }catch (error){
        console.error("Error while fecting blog",error);
        res.status(500).send("Unable to fetch blog");
    }
}