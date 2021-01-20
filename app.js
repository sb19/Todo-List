const express = require("express");

const bodyParser = require("body-parser");

const { send } = require("process");
const { access } = require("fs");

const app = express();
// to set ejs engine
app.set("view engine", "ejs");
// to set path for static files
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
//to store todo-list
let todo = ["read books", "workout"];

app.get("/", (req, res) => {
  let dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthArr = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //date object
  let dateObj = new Date();
  //to extract day as 0-6
  let day = dayArr[dateObj.getDay()];
  //to extract month as 0-11
  let month = monthArr[dateObj.getMonth()];
  // to extract date as 1-31
  let date = dateObj.getDate();
  //display index.ejs with the given elements for dynamic data
  res.render("index", { date: date, day: day, month: month, todo: todo });
});

app.post("/", (req, res) => {
  //to get the data which is entered in remove todo input
  const removeTodo = req.body.removeTodo;
  //to remove the  'remove todo' data from todo array
  const index = todo.indexOf(removeTodo);
  if (index > -1) {
    todo.splice(index, 1);
  }
  //add data which is enterd in "add todo" input
  todo.push(req.body.newTodo);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
