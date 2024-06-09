const express = require("express");
const postController = require("../../controllers/post/postController");
const postRouter = express.Router();
const multer = require("multer");
const storage = require("../../utils/fileUpload");

//create instance MULTERlter
const upload = multer({ storage });

//Create POST
postRouter.post("/create", upload.single("image"), postController.createPost);

//GET List POST
postRouter.get("/", postController.fetchAllPost);

//Update POST
postRouter.put("/:postId", postController.updatePost);

//GET single POST
postRouter.get("/:postId", postController.fetchPost);

//Delete POST
postRouter.delete("/:postId", postController.deletePost);

module.exports = postRouter;
