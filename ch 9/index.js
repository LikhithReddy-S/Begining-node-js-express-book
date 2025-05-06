const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const BlogPost = require("./models/BlogPost.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());

const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const validateMiddleWare = require('./middleware/validationMiddleware')


app.get("/",homeController);

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

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

app.post("/posts/store",validateMiddleWare, storePostController);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
