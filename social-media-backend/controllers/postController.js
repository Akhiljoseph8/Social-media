const post = require('../Models/postModel')
const mongoose = require("mongoose");

//adding post to database
exports.addPost = async (req, res) => {
  const { like, caption, username } = req.body
  const image = req.file.filename
  const userId = req.payload
  try {
    const newPost = new post({
      like, caption, image, userId, username
    })
    await newPost.save()
    res.status(200).json(newPost)

  } catch (err) {
    res.status(406).json(err)
  }
}

//fetching all posts
exports.getPost = async (req, res) => {
  try {
    const result = await post.find()
    if (result) {
      res.status(200).json(result)

    } else {
      res.status(401).json("No Posts")
    }
  } catch (err) {
    res.status(406).json(err)
  }
}



exports.like = async (req, res) => {
  try {
    const userId = req.payload;
    const { postId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "postId and userId are required" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const posts = await post.findById(postId);
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already liked the post
    const likeIndex = posts.likedBy.findIndex((id) => id.toString() === userId);
    if (likeIndex === -1) {
      // User hasn't liked the post, so like it
      posts.likedBy.push(userObjectId);
      posts.likes += 1;
    } else {
      // User already liked, so unlike it
      posts.likedBy.splice(likeIndex, 1);
      posts.likes -= 1;
    }
    await posts.save(); 
    res.status(200).json({ message: "Like updated", likes: posts.likes, likedBy: posts.likedBy });
  } catch (err) {
    console.error("Error in like API:", err);
    res.status(500).json({ error: "Server error" });
  }
};


//adding new comment to datbase
exports.addComment = async (req, res) => {
  try {
    const { postId, comment, userId, username } = req.body;
    if (!postId || !comment) {
      return res.status(400).json({ message: "Post ID and comment text are required" });
    }
    // Find the post and add the comment
    const posts = await post.findById(postId);
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userId: userId,
      username: username,
      comment,
    };

    posts.comments.push(newComment);
    await posts.save();

    res.status(200).json({ message: "Comment added successfully", comments: posts.comments });
  } catch (err) {
    console.error("Error in addComment API:", err);
    res.status(500).json({ error: "Server error" });
  }
};


//comments fetching
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    const posts = await post.findById(postId).populate("comments.userId", "username");

    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ comments: posts.comments });
  } catch (err) {
    console.error("Error in getComments API:", err);
    res.status(500).json({ error: "Server error" });
  }
};
