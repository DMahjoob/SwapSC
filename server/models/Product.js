import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    condition: String,
    location: String,
    imageUrl: String,
    isSold: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema, "products");
