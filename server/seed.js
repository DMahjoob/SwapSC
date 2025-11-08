//FIXME code template for seeding data into the mongodb database,
// current data here has already been added to the database


// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { Product } from "./models/Product.js";
//
//
// dotenv.config();
//
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB connected for seeding"))
//     .catch((err) => console.error("MongoDB connection error:", err));
//
// // Sample data
// const sampleProducts = [
//     {
//         title: "Desk Chair",
//         price: 50,
//         description: "Comfortable desk chair in good condition.",
//         condition: "Used",
//         location: "USC Village",
//         imageUrl: "/dataUploads/deskChair.jpg",
//         isSold: false,
//         createdAt: new Date("2025-11-06T19:30:00.000Z"),
//     },
//     {
//         title: "Textbook: Data Structures & Algorithms",
//         price: 40,
//         description: "Covers all chapters, minimal notes.",
//         condition: "Lightly Used",
//         location: "Leavey Library",
//         imageUrl: "/dataUploads/textbook.png",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Desk Lamp",
//         price: 15,
//         description: "Bright LED lamp with flexible neck.",
//         condition: "New",
//         location: "New North",
//         imageUrl: "/dataUploads/deskLamp.webp",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Throw Pillow Set",
//         price: 20,
//         description: "Two decorative pillows, soft and comfy.",
//         condition: "New",
//         location: "The Lorenzo",
//         imageUrl: "/dataUploads/throwPillows.jpg",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Office Chair",
//         price: 45,
//         description: "Adjustable swivel chair, minor wear on armrests.",
//         condition: "Used",
//         location: "Parkside",
//         imageUrl: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?q=80&w=800",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "MacBook Air (2019)",
//         price: 550,
//         description: "13-inch model, great battery life, includes charger.",
//         condition: "Lightly Used",
//         location: "Cardinal Gardens",
//         imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Hoodie",
//         price: 25,
//         description: "Official bookstore hoodie, size M.",
//         condition: "Used",
//         location: "University Gateway",
//         imageUrl: "/dataUploads/hoodie.webp",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Wireless Headphones",
//         price: 60,
//         description: "Noise-cancelling over-ear headphones, works perfectly.",
//         condition: "Lightly Used",
//         location: "Doheny Library",
//         imageUrl: "/dataUploads/wirelessHeadphones.jpg",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Dorm Rug",
//         price: 35,
//         description: "4x6 beige rug, clean and soft.",
//         condition: "Used",
//         location: "USC Village",
//         imageUrl: "/dataUploads/rug.jpeg",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Skateboard",
//         price: 50,
//         description: "Complete board, good wheels and grip tape.",
//         condition: "Lightly Used",
//         location: "McCarthy Honors College",
//         imageUrl: "/dataUploads/skateboard.jpeg",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Bluetooth Speaker",
//         price: 30,
//         description: "Portable JBL-style speaker, excellent sound.",
//         condition: "New",
//         location: "Figueroa Street",
//         imageUrl: "/dataUploads/speaker.jpg",
//         isSold: false,
//         createdAt: new Date(),
//     },
//     {
//         title: "Potted Plant",
//         price: 10,
//         description: "Small succulent in ceramic pot, easy to maintain.",
//         condition: "Used",
//         location: "Cardinal Gardens",
//         imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800",
//         isSold: false,
//         createdAt: new Date(),
//     }
//     // add more products here
// ];
//
// async function seed() {
//     try {
//
//         await Product.insertMany(sampleProducts);
//         console.log("Sample products inserted!");
//         process.exit(0);
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// }
//
// seed();
