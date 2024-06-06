const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const Post = require("./models/Post/Post");
const PORT = process.env.PORT || 5001;

const app = express();

//cnnect DB
connectDB();

//middleware
app.use(express.json());
//corse middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

//routes
//Create POST
app.post("/api/v1/posts/create", async (req, res) => {
  try {
    //get payload
    const postData = req.body;
    const postCreated = await Post.create(postData);
    res.json({
      status: "Success",
      message: "Post Created Successfully",
      postCreated,
    });
  } catch (error) {
    res.json(error);
  }
});
//GET List POST
app.get("/api/v1/posts", async (req, res) => {
  try {
    const listPost = await Post.find();
    res.json({
      status: "success get list of posts",
      listPost,
    });
  } catch (error) {
    res.json(error);
  }
});

//Update POST
app.put("/api/v1/posts/:postId", async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
});

//GET single POST
app.get("/api/v1/posts/:postId", async (req, res) => {
  try {
    const postID = req.params.postId;
    const postFound = await Post.findById(postID);

    if (!postFound) {
      throw new Error("post not fund");
    }

    res.json({
      status: "Post fetched success",
      postFound,
    });
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
});

//Delete POST
app.delete("/api/v1/posts/:postId", async (req, res) => {
  try {
    const postID = req.params.postId;
    const post = await Post.findByIdAndDelete(postID);
    // if (!post) {
    //   throw new Error("post not fund");
    // }
    res.json({
      status: "Post Deleted success",
      post,
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
