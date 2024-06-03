const mongoose = require("mongoose");

//schema
const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    image: {
      type: Object,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nextEarningDate: {
      type: Date,
      default: () => {
        new Date(new Date().getFullYear, new Date().getMonth() + 1, 1);
      },
    },
    thisMonthEarnings: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    viewsCount: { type: Number, default: 0 },

    //intercations
    Likes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    disLikes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    viewers: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //comments'
    comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },

    //flag of moderations
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//models
const postModel = mongoose.model("Plan", postSchema);

module.exports = postModel;
