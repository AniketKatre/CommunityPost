const express = require("express");
require("dotenv").config();
const cors = require("cors");
const asyncHandler = require("express-async-handler");
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
app.post(
  "/api/v1/posts/create",
  asyncHandler(async (req, res) => {
    //get payload
    const { title, description } = req.body;

    //find post in DB if exist
    const postFound = await Post.findOne({ title });
    if (postFound) {
      throw new Error("Post already exist");
    }
    const postCreated = await Post.create({ title, description });
    res.json({
      status: "Success",
      message: "Post Created Successfully",
      postCreated,
    });
  })
);
//GET List POST
app.get(
  "/api/v1/posts",
  asyncHandler(async (req, res) => {
    const listPost = await Post.find();
    res.json({
      status: "success get list of posts",
      listPost,
    });
  })
);

//Update POST
app.put(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
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
  })
);

//GET single POST
app.get(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    const postID = req.params.postId;
    const postFound = await Post.findById(postID);

    if (!postFound) {
      throw new Error("post not fund");
    }

    res.json({
      status: "Post fetched success",
      postFound,
    });
  })
);

//Delete POST
app.delete(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    const postID = req.params.postId;
    const post = await Post.findByIdAndDelete(postID);
    // if (!post) {
    //   throw new Error("post not fund");
    // }
    res.json({
      status: "Post Deleted success",
      post,
    });
  })
);

//not FOUND
app.use((req, res, next) => {
  res.status(404).json({ message: "ROute not found on our server" });
});

// error handler middleware
app.use((err, req, res, next) => {
  //prepare the error  message
  const message = err.message;
  const stack = err.stack;
  console.log(message);
  res.status(500).json({
    message,
    stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
