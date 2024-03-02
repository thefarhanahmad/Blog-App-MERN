const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPost,
  findPostById,
  deletePost,
  updatePost,
} = require("../controllers/post");
const  auth  = require("../middleware/auth-middleware");

router.post("/create", auth, createPost);
router.get("/all-posts", getAllPost);
router.get("/post-details/:postId", findPostById);
router.delete("/delete-post/:postId", deletePost);
router.put("/update-post/:postId", updatePost);

module.exports = router;
