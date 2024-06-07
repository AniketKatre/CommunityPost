const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
  //CREATE POST
  createPost: asyncHandler(async (req, res) => {
    //get payload
    const { description } = req.body;

    const postCreated = await Post.create({ description });
    res.json({
      status: "Success",
      message: "Post Created Successfully",
      postCreated,
    });
  }),

  // LIST
  fetchAllPost: asyncHandler(async (req, res) => {
    const listPost = await Post.find();
    res.json({
      status: "success get list of posts",
      listPost,
    });
  }),

  //Get Single post by ID
  fetchPost: asyncHandler(async (req, res) => {
    const postID = req.params.postId;
    const postFound = await Post.findById(postID);

    if (!postFound) {
      throw new Error("post not fund");
    }

    res.json({
      status: "Post fetched success",
      postFound,
    });
  }),

  //UPDATE
  updatePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not Found");
    }

    //updated post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );

    res.json({
      status: "Post updated successsfully",
      updatedPost,
    });
  }),

  // DELETE POST
  deletePost: asyncHandler(async (req, res) => {
    const postID = req.params.postId;
    const post = await Post.findByIdAndDelete(postID);
    if (!post) {
      throw new Error("post not fund");
    }
    res.json({
      status: "Post Deleted success",
      post,
    });
  }),
};

module.exports = postController;
