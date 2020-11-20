"use strict";

//External packages
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var session = require("express-session");

//Self modules
var indexPage = require("./routes/Authentication/indexPage.js");
var recruiterLogin = require("./routes/Authentication/recruiterLogin.js");
var recruiterSignup = require("./routes/Authentication/recruiterSignup.js");
var studentSignup = require("./routes/Authentication/studentSignup.js");
var recruiterDashboard = require("./routes/Dashboard/recruiterDashboard.js");
var studentDashboard = require("./routes/Dashboard/studentDashboard.js");
var recruiterProfile = require("./routes/Profile/recruiterProfile.js");
var studentProfile = require("./routes/Profile/studentProfile.js");
var recruiterPostSch = require("./routes/Scholarships/recruiterPostSch.js");
var studentApplySch = require("./routes/Scholarships/studentApplySch.js");
var viewProfile = require("./routes/Profile/viewProfile.js");

//create app
var app = express();

//app settings
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "marskey" }));

//serve static files
app.use(express.static("public"));

//connect to mongodb
var DB;
var DB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/Scholarly";

var mongoClient = new mongodb.MongoClient(DB_URL, { useNewUrlParser: true });
mongoClient.connect(function(err) {
  if (err) {
    console.log("Error connecting to MongoDB");
  } else {
    console.log("Connection to MongoDB database established");
  }
  DB = mongoClient.db("Scholarly");

  //save the DB variable for all routes
  app.locals.DB = DB;
});

//app routes
app.get("/", indexPage.getData);
app.post("/", indexPage.postData);

app.get("/recruiterLogin", recruiterLogin.getData);
app.post("/recruiterLogin", recruiterLogin.postData);

app.get("/recruiterLogout", recruiterLogin.logout);

app.get("/studentLogout", indexPage.logout);

app.get("/signUp_recruiter", recruiterSignup.getData);
app.post("/signUp_recruiter", recruiterSignup.postData);

app.get("/recruiterDash", recruiterDashboard.getData);

app.get("/recruiterProfile", recruiterProfile.getData);
app.post("/recruiterProfile", recruiterProfile.postData);

app.get("/recruiterPostSch", recruiterPostSch.getData);
app.post("/recruiterPostSch", recruiterPostSch.postData);

app.get("/signupStudent", studentSignup.getData);
app.post("/signupStudent", studentSignup.postData);

app.get("/studentDash", studentDashboard.getData);
app.get("/studentDash/:searchSch", studentDashboard.getData);

app.get("/studentProfile", studentProfile.getData);

app.get("/viewProfile/:studentId", viewProfile.getData);

app.get("/viewProfile", viewProfile.getData);

app.get("/studentApply/:schId", studentApplySch.getData);
app.post("/studentApply/:schId", studentApplySch.postData);

const port = process.env.PORT || 3030;
console.log("App Running");
app.listen(port, () => console.log(`Listening on port ${port}..`));
