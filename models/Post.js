const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      max: 200,
      required: true
    },
    desc: {
      type: String,
      max: 500,
      required: true
    },
    likes: {
      type: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
      default: [],
    },

    comments: {
      type: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
      default: [],
    }
  },
  { timestamps: true }
);




module.exports = mongoose.model("Post", PostSchema);
