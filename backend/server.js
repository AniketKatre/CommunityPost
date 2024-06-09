const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const asyncHandler = require("express-async-handler");
const connectDB = require("./config/db");
// const Post = require("./models/Post/Post");
const PORT = process.env.PORT || 5001;
const postRouter = require("./router/post/postsRouter");
const userRouter = require("./router/user/userRouter");
const passport = require("./utils/passport-config");
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

//passport middleware
app.use(passport.initialize());

//routes handler
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

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
