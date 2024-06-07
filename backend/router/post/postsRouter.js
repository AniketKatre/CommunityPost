const express = require("express");
const postController = require("../../controllers/post/postController");
const postRouter = express.Router();
const multer = require("multer");
const storage = require("../../utils/fileUpload");

//create instance MULTERlter
const upload = multer({ storage });

//Create POST
postRouter.post(
  "/posts/create",
  upload.single("image"),
  postController.createPost
);

//GET List POST
postRouter.get("/posts", postController.fetchAllPost);

//Update POST
postRouter.put("/posts/:postId", postController.updatePost);

//GET single POST
postRouter.get("/posts/:postId", postController.fetchPost);

//Delete POST
postRouter.delete("/posts/:postId", postController.deletePost);

module.exports = postRouter;
