const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// First(Blog) ko le database ma kun collection sanga kura garne bhanera bhanxa, second(blogSchema) le chai kun kun field haru db ma halne bhanera define garxa
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
