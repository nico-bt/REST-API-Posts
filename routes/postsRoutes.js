const express = require("express")
const router = express.Router()
const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  editPost,
} = require("../controllers/postsController")

// GET /posts --> get all posts
router.get("/", getAllPosts)

// GET /posts/:id --> get individual post
router.get("/:postId", getPost)

// POST /posts --> Create new post
router.post("/", createPost)

// DELETE /posts/id --> Delete a post
router.delete("/:postId", deletePost)

// PUT /posts/id --> Update a post
router.put("/:postId", editPost)

module.exports = router
