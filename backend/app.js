const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();


mongoose.connect("mongodb+srv://az:CXva2Xq8lxeRjRBI@cluster0-uufsh.azure.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed! try updating IP whitelist on Atlas");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/posts", postsRoutes);
module.exports = app;
//CXva2Xq8lxeRjRBI
