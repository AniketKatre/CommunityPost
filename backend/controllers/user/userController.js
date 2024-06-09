const User = require("../../models/User/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const userController = {
  //REGISTER
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //check user exist
    const userFound = await User.findOne({ username, email });
    if (userFound) {
      throw new Error("User Already exist");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // register user
    const userRegister = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // send the response
    res.status(201).json({
      status: "success",
      message: "user register successfully",
      userRegister,
    });
  }),

  // LOGIN
  login: asyncHandler(async (req, res, next) => {
    // const {} = req.body;
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      console.log(user);
      // check user in DB
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      //generate Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //   console.log(token);
      // set token into cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      //   console.log(info);

      //send the res
      res.json({
        status: "success",
        message: "Login Success",
        username: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),
  // Profile
  //UPDATE PROFILE
};

module.exports = userController;
