
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATA_URL+"/postsDB");

const postSchema = {
  title : String,
  content : String
}
const Post = mongoose.model("Post",postSchema);
const homeStartingContent = "# Welcome to My Weekly Achievements Blog .Hi, I'm Kuruva Pavani, a web developer and a lifelong learner. I created this blog to document and share my weekly achievements in coding, learning, and personal growth.Every week, I post about the new skills I learned, the projects I completed, and the challenges I faced. I also share the resources, tools, and tips that helped me along the way.My goal is to inspire and motivate other developers and learners to pursue their passions, overcome their obstacles, and achieve their goals.If you are interested in web development, MongoDB, Node, Express, or any other topics related to coding and learning, you are in the right place!.Here are some of my latest posts. You can view a post by clicking on See More which redirects to another page with the post id..You can find me on:- [LinkedIn](https://www.linkedin.com/in/kuruva-pavani-10388b27b)- [GitHub](https://github.com/kuruvapavani).I would love to hear from you, so feel free to reach out and say hi!. Thank you for visiting my blog. I hope you enjoyed it and found it useful. See you next week!";
const aboutContent = "Hello, and welcome to my blog! My name is Kuruva Pavani, and I am a web developer and a lifelong learner. I created this blog to document and share my weekly achievements in coding, learning, and personal growth.I have always been passionate about web development and technology.I enjoy building websites and applications that are functional, beautiful, and user-friendly.I also love learning new things and challenging myself. I believe that learning is a lifelong journey, and that we can always improve ourselves and our skills. That's why I set weekly goals for myself and track my progress on this blog. I write about the new skills I learned, the projects I completed, and the challenges I faced. I also share the resources, tools, and tips that helped me along the way.You can check my other projects on github. Feel free to contact me";
const contactContent = "If you have any questions, comments, or suggestions about my blog or my weekly achievements, I would love to hear from you. You can also contact me if you want to collaborate, hire me, or just say hi. You can reach me by sending me an email at [pavanikuruva2109@gmail.com]. You can also follow me on [instagram](pavani._21) , [LinkedIn](https://www.linkedin.com/in/kuruva-pavani-10388b27b). I will do my best to get back to you within 24 hours. I usually reply by email, but if you prefer a different method, please let me know in your message. Thank you for reaching out to me. I appreciate your interest and support. I look forward to hearing from you and reading your message.";

const home = new Post({
  title : "Home",
  content : homeStartingContent
})

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async function (req, res) {
  try {
    const posts = await Post.find({});
    res.render(__dirname + "/views/home.ejs", {
      homepage: homeStartingContent,
      posts: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/about",function(req,res){
  res.render(__dirname + "/views/about.ejs",{homepage : aboutContent });
})

app.get("/contact",function(req,res){
  res.render(__dirname + "/views/contact.ejs",{homepage : contactContent });
})

app.get("/compose",function(req,res){
  res.render(__dirname + "/views/compose.ejs",{homepage : contactContent });
})

app.post("/",function(req,res){
  const postTitle = req.body.title;
  const postContent = req.body.content;
  const newPost = new Post({
    title : postTitle,
    content:postContent
  });
  newPost.save();
  res.redirect("/");
});


app.get("/posts/:testing",function(req,res){
  Post.find({_id : req.params.testing}).then(posts=>{
    posts.forEach(function(post){
      res.render(__dirname+"/views/post.ejs",{post : post});
    })

  }).catch (err => {
      console.error (err);
    });
})
let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});