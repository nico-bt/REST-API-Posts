const getAllPosts = (req, res) => {
  res.status(200).json({ msg: "GET ALL POSTS" })
}

const getPost = (req, res) => {
  res.status(200).json({ msg: `GET INDIVIDUAL POST id:${req.params.postId}` })
}

const createPost = (req, res) => {
  res.status(201).json({ msg: "CREATE A NEW POST" })
}

const deletePost = (req, res) => {
  res.status(200).json({ msg: `DELETE A POST POST id:${req.params.postId}` })
}

const editPost = (req, res) => {
  res.status(200).json({ msg: `EDIT A POST POST id:${req.params.postId}` })
}

module.exports = { getAllPosts, getPost, createPost, deletePost, editPost }
