const BlogPost = require('../models/BlogPost')
const fs = require("fs")
const path = require('path');


module.exports = async (req, res) => {
    if (!req.files || !req.files.image) {
      return res.status(400).send("No image uploaded");
    }
    const image = req.files.image;
    const uploadDir = path.resolve(__dirname, 'public/img');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const imagePath = path.join(uploadDir, image.name);
  
    try {
      await image.mv(imagePath); // Move file to public/img/
      
      await BlogPost.create({
        ...req.body,
        image: '/img/' + image.name // Store relative path in DB
      });
  
      console.log("Successfully added blog");
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while adding the blog");
    }
  }