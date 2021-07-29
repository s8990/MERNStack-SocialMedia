const mongoose = require("mongoose");

const PostModel = require("../models/Post");
const UserModel = require("../models/User");

// Create a Post
const addPost = async (req, res) => {
  const newPost = new PostModel({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    description: req.body.description,
    picture: `images/post/${req.file.filename}`,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json({ data: { message: savedPost } });
  } catch (error) {
    return res.status(500).json({ data: { error: error } });
  }
};

// Update a Post
const editPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res
        .status(200)
        .json({ data: { message: "Post has been updated successfully" } });
    } else {
      res
        .status(403)
        .json({ data: { error: "You can update only your Post" } });
    }
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// Delete a Post
const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res
        .status(200)
        .json({ data: { message: "Post has been deleted successfully" } });
    } else {
      res
        .status(403)
        .json({ data: { error: "You can delete only your Post" } });
    }
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// Like and Dislike a Post
const postLikeHandler = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(201).json("The Post has been liked successfully");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The Post has beed unliked successfully");
    }
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// Get a Post By id
const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// Get Timeline Posts
const getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.params.userId);
    const userPosts = await PostModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return PostModel.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// Get User's All Posts
const getUserAllPosts = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    const posts = await PostModel.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

module.exports = {
  addPost,
  editPost,
  deletePost,
  postLikeHandler,
  getPostById,
  getTimelinePosts,
  getUserAllPosts,
};
