const express = require("express");
const { requiredSignin } = require("../common-middleware");
const {
  createBlogPost,
  deleteBlogPost,
  fetchAllBlogPosts,
} = require("../controllers/blogPost");
const router = new express.Router();
const BlogPost = require("../models/blogPost");

// post an blog
router.post("/create/blogpost", requiredSignin, createBlogPost);

// delete a blog
router.delete("/delete/blogpost/:id", requiredSignin, deleteBlogPost);

// get all opinions of all users
router.get("/get/allblogposts", requiredSignin, fetchAllBlogPosts);

module.exports = router;
