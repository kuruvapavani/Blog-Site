
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/postsDB");

const postSchema = {
  title : String,
  content : String
}
const Post = mongoose.model("Post",postSchema);
// let posts = [];
const homeStartingContent = "home Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "about Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "contact Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const home = new Post({
  title : "Home",
  content : homeStartingContent
})

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  Post.find({}).then(posts=>{
    res.render(__dirname + "/views/home.ejs",{homepage : homeStartingContent , posts : posts});
  }).catch (err => {
      console.error (err);
    });
})


app.get("/about",function(req,res){
  res.render(__dirname + "/views/about.ejs",{homepage : aboutContent });
})

app.get("/contact",function(req,res){
  res.render(__dirname + "/views/contact.ejs",{homepage : contactContent });
})

app.get("/compose",function(req,res){
  res.render(__dirname + "/views/compose.ejs",{homepage : contactContent });
})

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

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


app.listen(port, function() {
  console.log("Server started on port " + port);
});
