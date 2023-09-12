// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongooose");



const app = express();
// let items = [" buy Food ","Cook Food", "Eat Food"];
// let workItems = [];



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemsSchema = {
  name:String

};
const Item = mongoose.model("Item",itemsSchema);
const item1 = new Item({
  name:"Welcome to your todolist!"
});
const item2 = new Item({
  name:"Hit the + butoon to add a new item."
});
const item3 = new Item({
  name:"<--- Hit tis to delete an item."
});
const defaultItems = [item1, item2, item3];



app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: "Today", newListItems: items});
  });

app.post("/",function(req, res){
 var item = req.body.newitem;
 items.push(item);
 res.redirect("/");
});
app.get("/work",function(req, res){
  res.render("list",{ListTitle:"work List"})
})


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
