const mongoose = require("mongoose")
const Post = require("../models/Post")

//Obs: req.user has the user._id added by the isAuth middleware

// GET ALL POSTS
//---------------------------------------------------------------------------------
const getAllPosts = async (req, res) => {
  // Pagination. url query for pagination --> ?page=<numberPageHere>
  const currentPage = req.query.page || 1
  const itemsPerPage = 5
  let totalItems

  try {
    totalItems = await Post.find({}).countDocuments()

    const posts = await Post.find()
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)

    return res.status(200).json({ totalItems, itemsPerPage, posts })
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
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(422).json({ error: "All fields are required" })
  }

  try {
    const newPost = await Post.create({ title, content, creator: req.user })
    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// DELETE POST
//---------------------------------------------------------------------------------
const deletePost = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).json({ error: "Invalid id" })
  }

  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Check if post belogns to user. toString() to compare mongoDB Objects
    if (req.user.toString() !== post.creator.toString()) {
      return res.status(401).json({ error: "This post IS NOT yours to delete" })
    } else {
      const deletedPost = await Post.findByIdAndDelete(post._id)
      return res.status(200).json({ msg: "Post DELETED", deletedPost })
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

// EDIT POST
//---------------------------------------------------------------------------------
const editPost = async (req, res) => {
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(422).json({ error: "All fields are required" })
  }

  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).json({ error: "Invalid id" })
  }

  try {
    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: "Not found. Wrong id or deleted post" })
    }

    // Check if post belogns to user. toString() to compare mongoDB Objects
    if (req.user.toString() !== post.creator.toString()) {
      return res.status(401).json({ error: "This post IS NOT yours to edit" })
    }

    post.title = title
    post.content = content
    const updatedPost = await post.save()

    res.status(200).json(updatedPost)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { getAllPosts, getPost, createPost, deletePost, editPost }
