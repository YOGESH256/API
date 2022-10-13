const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;

const commentSchema = new mongoose.Schema({
  user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: [1, "Empty String"],
  },
    modelRef: {
        type: Schema.Types.ObjectId,
        refPath: "onModel",
        required: true,
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Post"],
    },



} , {
  timestamps : true
})


module.exports = mongoose.model("Comment" , commentSchema);
