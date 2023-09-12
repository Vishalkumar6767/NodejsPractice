//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const homeStartingContent = "Baja 3 wheelers are usually designed with a lightweight and rugged construction, emphasizing off-road performance. They often feature a tubular steel frame with a roll cage for safety.Three-Wheel  Unlike traditional four-wheelers, Baja 3 wheelers have a single wheel at the front and two wheels at the rear. This configuration helps provide enhanced maneuverability and stability in rough terrain.Suspension: Baja 3 wheelers typically feature long-travel suspension systems with adjustable shocks. This design allows for better absorption of bumps, jumps, and rough terrain, enabling the vehicle to handle off-road obstacles with greater ease..";
const aboutContent = "Bajaj Auto has a significant focus on innovation and technology. The company has collaborated with international partners like KTM, Triumph, and Kawasaki to develop and manufacture motorcycles with advanced features and performance capabilities. Bajaj Auto is also known for its expertise in the field of fuel-efficient and environmentally friendly vehicles..";
const contactContent = " ceo  Vishal Kumar Mobile 8541804492 Email kumarvishal27697@gmail.com";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set('strictQuery', false);


mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title:String,
  content:String
};
const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.redirect("/");

});

// app.get("/posts/:postName", function(req, res){
//   const requestedTitle = _.lowerCase(req.params.postName);

//    posts.forEach(function(post){
//     const storedTitle = _.lowerCase(post.title);

//     if (storedTitle === requestedTitle) {
//       res.render("post", {
//         title: post.title,
//         content: post.content
//       });
//     }
//   });

// })



// chat Gpt Solution

// app.get("/posts/:postName", function(req, res){
//   const requestedTitle = _.lowerCase(req.params.postName);

//   Post.findOne({title: requestedTitle}, function(err, post){
//     if (!err) {
//       res.render("post", {
//         title: post.title,
//         content: post.content
//       });
//     }
//   });
// });


// app.get("/posts/:postName", function(req, res){
//   const requestedTitle = _.lowerCase(req.params.postName);

//   Post.findOne({ title: requestedTitle }, function(err, post) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (post) {
//         res.render("post", {
//           title: post.title,
//           content: post.content
//         });
//       }
//     }
//   });
// });

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, async(err, post)=>{
    if(err){
      console.log("error in in post")
    }
    res.render("post", {
      title: post.Title,
      content: post.content
    });
  });
});





app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
