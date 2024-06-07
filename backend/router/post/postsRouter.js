const express = require("express");
const Post = require("../../models/Post/Post");
const asyncHandler = require("express-async-handler");
// const createPost = require("../../controllers/post/postController");
const postController = require("../../controllers/post/postController");
const postRouter = express.Router();
//Create POST
postRouter.post("/posts/create", postController.createPost);

//GET List POST
postRouter.get("/posts", postController.fetchAllPost);

//Update POST
postRouter.put("/posts/:postId", postController.updatePost);

//GET single POST
postRouter.get("/posts/:postId", postController.fetchPost);

//Delete POST
postRouter.delete("/posts/:postId", postController.deletePost);

module.exports = postRouter;
