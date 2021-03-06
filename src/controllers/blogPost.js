const BlogPost = require("../models/blogPost");

exports.createBlogPost = async (req, res) => {
  const blogPost = new BlogPost({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await blogPost.save();
    res.status(201).send(blogPost);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!blogPost) {
      return res.status(404).send();
    }
    res.send(blogPost);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.fetchAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .populate("owner", "_id firstName lastName email")
      .exec(function (err, blogposts) {
        if (err) return res.status(500).send({ e });
        res.send(blogposts);
      });
  } catch (e) {
    res.status(500).send({ e });
  }
};

exports.reactToBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ _id: req.params.id });

    if (!blogPost) {
      return res.status(404).send();
    }

    const _userId = req.user._id;

    if (blogPost.likes.includes(_userId)) {
      const ind = blogPost.likes.indexOf(_userId);
      if (ind > -1) blogPost.likes.splice(ind, 1);
    } else {
      blogPost.likes.unshift(_userId);
    }

    await blogPost.save();
    res.send(blogPost);
  } catch (e) {
    res.status(400).send(e);
  }
};
