const express = require("express");
const path = require("path");
const fs = require("fs")
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
const PORT = 3000;
mongoose
  .connect("mongodb://127.0.0.1/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.use(express.static("public"));
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());

const BlogPost = require("./models/BlogPost.js");
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/index.html'))
  // res.render('index')
  try {
    const blogposts = await BlogPost.find({});
    res.render("index", {
      blogposts,
    });
  } catch (error) {
    console.error("Error while fecting blogs ", error);
    res.status(500).send("Something went wrong while fetching blogs");
  }
});
app.post("/search", async (req, res) => {
  console.log(req.body);
  const searchQuery = req.body.query;
  try {
    const blogpost = await BlogPost.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    res.render("index", { blogposts: blogpost });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});
app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render("about");
});
app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render("contact");
});
app.get("/post/:id", async (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/post.html'))
  try {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render("post", { blogpost });
  } catch (error) {
    console.log(error);
  }
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
// app.post("/posts/store", async (req, res) => {
//   let image = req.files.image;
//   try {
//     await image.mv(path.resolve(__dirname,'public/img',image.name))
//     await BlogPost.create({...req.body
//         ,image:'/img/'+image.name});
//     console.log("Successfully added blog");
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error occurred while adding the blog");
//   }
// });
app.post("/posts/store", async (req, res) => {
    // Check if image is present
    if (!req.files || !req.files.image) {
      return res.status(400).send("No image uploaded");
    }
  
    const image = req.files.image;
  
    // Define the target directory
    const uploadDir = path.resolve(__dirname, 'public/img');
  
    // Ensure 'public/img' directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    // Final image path
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
  });
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
