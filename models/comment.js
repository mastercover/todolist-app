import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authorName: String,
    body: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
