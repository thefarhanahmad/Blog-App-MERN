const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;

// create post handler
const createPost = async (req, res, next) => {
  try {
    // fetch post
    const { title, description, UserId } = req.body;
    //  console.log("data from reqbody : ",req.body)

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    //  fetch image and validate
    const imageFile = req.files.image;
    // console.log("image file : ",imageFile)
    const supportedType = ["jpg", "jpeg", "png"];
    const fileType = imageFile.name.split(".")[1].toLowerCase();
    const supportedFile = supportedType.includes(fileType);

    if (!supportedFile) {
      return res.status(400).json({
        success: false,
        message: "Image format not supported",
      });
    }

    const options = {
      folder: "BlogPost",
      resource_type: "image",
    };

    const response = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      options,
      (err, result) => {
        if (err) {
          console.log("getting error while uploading image");
          return res.json({
            message: "getting some error while uploading image",
          });
        }
        console.log("image uploaded : ", result);
      }
    );

    const post = await Post.create({
      title: title,
      description: description,
      imageUrl: response.secure_url,
      author: UserId,
    });

    res.status(200).json({
      success: true,
      message: "Post Created successfully",
      post: post,
    });
  } catch (error) {
    next(error)
  }
};

// get all post handler
const getAllPost = async (req, res, next) => {
  try {
    const post = await Post.find().populate("author").sort({ createdAt: -1 });
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch all post",
      });
    }
    return res.status(200).json({
      success: true,
      message: "post fetched successfully",
      posts: post,
    });
  } catch (error) {
   
    next(error)
  }
};

// find post by id handler
const findPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch id",
      });
    }

    const post = await Post.findById(postId).populate("author");

    return res.status(200).json({
      success: true,
      message: "post fetched successfully",
      post: post,
    });
  } catch (error) {
    
    next(error)
  }
};

// deleted post handler
const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch id",
      });
    }

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "post deleted successfully",
      post: post,
    });
  } catch (error) {
   
    next(error)
  }
};

// update post handler
const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { newTitle, newDescription } = req.body;

    console.log("post id",postId)
    console.log("new title and desc",newTitle,newDescription)

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
       title: newTitle,
       description:newDescription,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "failed to update  post",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post Updated successfully",
      post: updatedPost,
    });
  } catch (error) {
   
    next(error)
  }
};

module.exports = { createPost, getAllPost, findPostById, deletePost,updatePost };
