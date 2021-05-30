const express = require("express");
// Database Model
const Blog = require("../models/blog");
const router = express.Router();
// blog routes
// Get all the blogs
router.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

// Create a new blog
// Doing post request to /blogs because that is where our form is sending the data to. If confused look at create.ejs file
router.post("/blogs", (req, res) => {
  // Able to request the form body because we are using a middleware "app.use(express.urlencoded({ extended: true }));" which is giving the data from the form
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => console.log(error));
});
router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// Get the blog with particular id
router.get("/blogs/:id", (req, res) => {
  // getting the id
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    // details page render gareko.. aako result lai chai blog bhanne variable ma store gareko. details page ma access garna milxa bhanera
    res.render("details", { blog: result, title: "blog Details" });
  });
});
// Delete request
router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    res
      .json({
        redirect: "/blogs",
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
