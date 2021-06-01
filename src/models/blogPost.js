const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    likes: [],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
