import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug:  { type: String, unique: true },
    excerpt: String,
    content: { type: String, required: true },
    coverImage: String,
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

postSchema.index({ title: "text", content: "text", tags: "text" });

postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Post", postSchema);
