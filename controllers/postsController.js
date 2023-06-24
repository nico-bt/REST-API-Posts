const Post = require("../models/Post")

const getAllPosts = (req, res) => {
  res.status(200).json({ msg: "GET ALL POSTS" })
}

const getPost = (req, res) => {
  res.status(200).json({ msg: `GET INDIVIDUAL POST id:${req.params.postId}` })
}

const createPost = async (req, res) => {
  const { title, content, imageUrl, creator } = req.body

  if (!title || !content || !imageUrl || !creator) {
    return res.status(422).json({ error: "All fields are required" })
  }

  try {
    const newPost = await Post.create({ title, content, imageUrl, creator })
    return res.status(201).json(newPost)
  } catch (error) {
    return res.json(error)
  }
}

const deletePost = (req, res) => {
  res.status(200).json({ msg: `DELETE A POST POST id:${req.params.postId}` })
}

const editPost = (req, res) => {
  res.status(200).json({ msg: `EDIT A POST POST id:${req.params.postId}` })
}

module.exports = { getAllPosts, getPost, createPost, deletePost, editPost }
