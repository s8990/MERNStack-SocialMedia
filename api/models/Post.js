const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: true,
};

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    picture: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  schemaOptions
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
