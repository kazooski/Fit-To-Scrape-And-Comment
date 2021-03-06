// dependecies 
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");


// // Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newscraper");
var db = mongoose.connection;

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newscraper";

// var db = mongoose.connect(MONGODB_URI);


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to Mongoose!");
})

// Routes

app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});


app.get("/scrape", function(req,res) {
    axios.get("https://www.crunchyroll.com/news").then(function(response) {
  
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);
  
      // An empty array to save the data that we'll scrape
      // var results = [];
  
      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $("li.news-item").each(function(i, element) {
  
        // var title = $(element).children().text();
        var title = $(element).find("h2").text();
        var link = $(element).find("a").attr("href");
  
        // Save these results in an object that we'll push into the results array we defined earlier
        // results.push({
        db.scrapedData.insert({
          title: title,
          link: link
        });
      });
      
      // Log the results once you've looped through each of the elements found with cheerio
      // console.log(results);
      // push results into MongoDB database scrapedData
      // db.scrapedData.insertMany(
      //   [ results ]
      // );
  
    });
  
  
  
});
  

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  