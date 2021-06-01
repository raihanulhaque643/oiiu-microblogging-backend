const express = require('express');
const { requiredSignin } = require('../common-middleware');
const router = new express.Router();
const BlogPost = require('../models/blogPost');


// post an blog
router.post('/create/blogpost', requiredSignin, async (req, res) => {
    const blogPost = new BlogPost({
        ...req.body,
        owner: req.user._id
    })
    try {
        await blogPost.save();
        res.status(201).send(blogPost)
    } catch (e) {
        res.status(400).send(e);
    }
})

// delete a blog
router.delete('/delete/blogpost/:id', requiredSignin, async (req, res) => {
    const _id = req.params.id;
    try {
        const blogPost = await BlogPost.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!blogPost) {
            return res.status(404).send()
        }
        res.send(blogPost);
    } catch (e) {
        res.status(500).send(e);
    }
})

// get all opinions of all users
router.get('/get/allblogposts', requiredSignin, async (req, res) => {
    try {
        const blogPosts = await BlogPost.find({}).sort( { createdAt: -1 } ).populate('owner', '_id firstName lastName email').
        exec(function (err, blogposts) {
          if (err) return res.status(500).send({e});
          res.send(blogposts)
        });
    } catch (e) {
        res.status(500).send({e});
    }
})

module.exports = router;
