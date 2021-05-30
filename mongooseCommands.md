// mongoose and mongo sandbox routes
// adds blog
app.get("/add-blog", (req, res) => {
const blog = new Blog({
title: "Second Blog",
snippet: "About the second blog",
body: "more about my second blog",
});
blog
.save()
.then((result) => {
res.send(result);
})
.catch((err) => console.log(err));
});

// retrieves all the blogs
app.get("/all-blogs", (req, res) => {
Blog.find()
.then((result) => {
res.send(result);
})
.catch((err) => {
console.log("Some error : " + err);
});
});

// Find a single blog
app.get("/single-blog", (req, res) => {
Blog.findById("60b315d264c2b1883c8baace")
.then((result) => {
res.send(result);
})
.catch((err) => console.log(err));
});
