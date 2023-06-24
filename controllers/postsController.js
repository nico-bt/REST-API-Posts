const mongoose = require("mongoose")
const Post = require("../models/Post")

// GET ALL POSTS
//---------------------------------------------------------------------------------
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})

    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// GET SINGLE POST
//---------------------------------------------------------------------------------
const getPost = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.postId)) {
      return res.status(404).json({ error: "Invalid id" })
    }

    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: "Not found. Wrong id or deleted post" })
    }

    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// CREATE POST
//---------------------------------------------------------------------------------
const createPost = async (req, res) => {
  const { title, content, creator } = req.body

  if (!title || !content || !creator) {
    return res.status(422).json({ error: "All fields are required" })
  }

  try {
    const newPost = await Post.create({ title, content, creator })
    return res.status(201).json(newPost)
  } catch (error) {
    return res.json(error)
  }
}

// DELETE POST
//---------------------------------------------------------------------------------
const deletePost = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).json({ error: "Invalid id" })
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId)

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" })
    }

    return res.status(200).json({ msg: "Post DELETED", deletedPost })
  } catch (error) {
    return res.json(error.message)
  }
}

// EDIT POST
//---------------------------------------------------------------------------------
const editPost = (req, res) => {
  res.status(200).json({ msg: `EDIT A POST POST id:${req.params.postId}` })
}

module.exports = { getAllPosts, getPost, createPost, deletePost, editPost }
