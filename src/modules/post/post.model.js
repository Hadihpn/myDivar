const { Schema, model, Types } = require("mongoose");
const PostSchema = new Schema({
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true },
    content: { type: String, required: false },
    amount: { type: Number, required: false },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    province: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    district: { type: String, required: false },
    coordinate: { type: [Number], required: false },
    image: { type: [String], required: false, default: [] },
    options: { type: Object, default: {} }

}, {
    timestamps: true
})

const PostModel = model("Post", PostSchema)
module.exports = PostModel;