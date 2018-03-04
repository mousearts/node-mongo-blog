const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Post = require('../model/post');


router.get("/", (req, res, next)=>{
    Post
    .find()
    .exec()
    .then(posts=>{
        console.log(posts);
        res.status(200).json({
            message:'success',
            data: posts
        })
    })
    .catch(err=>{
        console.log(err);
    })
});

router.post("/", (req, res, next)=>{
    console.log(req.body);
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(result=>{
        console.log(result)
        res.status(201).json({
            message: 'success',
            data: result
        })
    }).catch(err=>{
        console.log(err);
    })
})

router.patch("/:postId", (req, res, next)=>{
    const id = req.params.postId
    Post
    .update({_id: id},req.body)
    .exec()
    .then(()=>{
        return Post.findById(id).exec()        
    })
    .then(post=>{
        console.log(post)
        res.status(200).json({
            message: "Update success",
            data: post
        })
    })
})

router.delete('/:postId', (req, res, next)=>{
    const id = req.params.postId;
    Post
    .remove({
        _id: id
    })
    .exec()
    .then(results=>{
        console.log(results)
        res.status(200).json({
            message: 'success',
            data: results
        })
    }).catch(err=>{
        console.log(err);
        error:err
    })
})

module.exports = router;
