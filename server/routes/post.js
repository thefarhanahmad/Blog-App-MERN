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

// Routes to perform CRUD Operations
router.post("/posts", auth, createPost);
router.get("/posts", getAllPost);
router.get("/posts/:id", findPostById);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);

module.exports = router;
