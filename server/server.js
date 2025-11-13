import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { Product } from "./models/Product.js";


// link to mongo database
const MONGO_URI="mongodb+srv://mgfreema:FXEQ2jmZARgsKsCZ@swapsc-cluster.dyerqqz.mongodb.net/swapsc?retryWrites=true&w=majority";
const PORT = 5000;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors()); // should allow from any origin
app.use(express.json());
// Serve the public folder
app.use(express.static(path.join(__dirname, "../public")));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => res.send("Server running ✅"));

// used by browse page to get all the product listings from mongo database
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithFullUrl = products.map(p => ({
            ...p._doc,
            imageUrl: `${'https://swapsc-db.onrender.com' || 'http://localhost:5000'}${p.imageUrl}`,
        }));

        res.json(productsWithFullUrl);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// server/server.js - Updated search endpoint with better error handling

// Replace your existing search endpoint with this:

// endpoint to search for products by title with price and condition
app.get("/api/products/search", async (req, res) => {
    try {
        const { title, priceRange, condition } = req.query;

        const query = {};

        // Search by title (partial, case-insensitive)
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        // Filter by price range
        if (priceRange && priceRange !== "Any") {
            if (priceRange.startsWith("<")) {
                const maxPrice = Number(priceRange.slice(1).replace("$", ""));
                query.price = { $lt: maxPrice };
            } else if (priceRange.includes("-")) {
                const [min, max] = priceRange.split("-").map(s => Number(s.replace("$", "")));
                query.price = { $gte: min, $lte: max };
            } else if (priceRange.endsWith("+")) {
                const minPrice = Number(priceRange.slice(1, -1).replace("$", ""));
                query.price = { $gte: minPrice };
            }
        }

        // Filter by condition
        if (condition && condition !== "Any") {
            query.condition = condition;
        }

        console.log("Search query:", query);

        const products = await Product.find(query);

        console.log(`Found ${products.length} products`);

        const productsWithFullUrl = products.map(p => ({
            ...p._doc,
            imageUrl: `${'https://swapsc-db.onrender.com' || 'http://localhost:5000'}${p.imageUrl}`,
        }));

        res.json(productsWithFullUrl);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ 
            error: "Server error", 
            message: err.message,
            details: "Failed to search products"
        });
    }
});

// to be used to add products to the page (implement)
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// could be used to get a recommended product? work on logic for this, could integrate with user-specific data
// if adding a user database
app.get("/api/recommendations/:category", async (req, res) => {
    const category = req.params.category;
    const recs = await Product.find({ category }).limit(3);
    res.json(recs);
});

// GET single product by _id for the ProductPage.tsx
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product); //TODO remove
        if (!product) return res.status(404).json({ error: "Product not found" });


        // prepend backend URL for image
        const fullProduct = {
            ...product._doc,
            imageUrl: `${'https://swapsc-db.onrender.com' || 'http://localhost:5000'}${product.imageUrl}`
        };

        res.json(fullProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
