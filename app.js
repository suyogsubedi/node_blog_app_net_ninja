const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const { render } = require("ejs");

// express app
const app = express();
// Mongodb Connection
const dbURI =
  "mongodb+srv://admin:admin@nodeblog.swlg3.mongodb.net/nodeBlog?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // We are listening to port only after the db gets connected
  .then((result) => {
    app.listen(3000);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

// Self made middleware
app.use((req, res, next) => {
  console.log("A request is made");
  console.log("host: " + req.hostname);
  next();
});
// Morgan (third party middleware)
app.use(morgan("dev"));

// middleware and static files
app.use(express.static("public"));
// Parses the data into a usable format for post request
// This takes the url encoded data into a object
app.use(express.urlencoded({ extended: true }));
// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use(blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
