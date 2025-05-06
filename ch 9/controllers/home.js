const BlogPost = require('../models/BlogPost')

module.exports = async (req,res)=>{
    try {
        const blogposts = await BlogPost.find({});
        res.render('index',{
            blogposts,
        })
    }catch (error){
        console.error("Error while fecting blogs ",error);
        res.status(500).send("Something went wrong while fecting blogs")
    }

}