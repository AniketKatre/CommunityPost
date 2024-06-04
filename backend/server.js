const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const Post = require("./models/Post/Post");
const PORT = process.env.PORT || 5001;

const app = express();

//cnnect DB
connectDB();

//middleware
app.use(express.json());

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
//GET single POST
//Update POST
//Delete POST

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
