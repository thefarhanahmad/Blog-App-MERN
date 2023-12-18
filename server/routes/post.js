const express = require('express')
const router = express.Router()

const {createPost, getAllPost, findPostById, deletePost, updatePost} = require("../controllers/post")

router.post("/create",createPost)
router.get("/all-posts",getAllPost)
router.get("/post-details/:postId",findPostById)
router.delete("/delete-post/:postId",deletePost)
router.put("/update-post/:postId",updatePost)

module.exports = router;