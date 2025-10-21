export interface Listing {
    id: number;
    title: string;
    price: string;
    condition: string;
    location: string;
    imageUrl: string;
    description: string;
}

export const sampleListings: Listing[] = [
    {
        id: 1,
        title: "Mini Fridge",
        price: "80",
        condition: "Used",
        location: "USC Village",
        imageUrl: "/dataUploads/miniFridge.jpg",
        description: "Compact fridge, works great, pickup near Target.",
    },
    {
        id: 2,
        title: "Textbook: Data Structures & Algorithms",
        price: "40",
        condition: "Lightly Used",
        location: "Leavey Library",
        imageUrl: "/dataUploads/textbook.png",
        description: "Covers all chapters, minimal notes.",
    },
    {
        id: 3,
        title: "Desk Lamp",
        price: "15",
        condition: "New",
        location: "New North",
        imageUrl: "/dataUploads/deskLamp.webp",
        description: "Bright LED lamp with flexible neck.",
    },
    {
        id: 4,
        title: "Office Chair",
        price: "45",
        condition: "Used",
        location: "Parkside",
        imageUrl: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?q=80&w=800",
        description: "Adjustable swivel chair, minor wear on armrests.",
    },
    {
        id: 5,
        title: "MacBook Air (2019)",
        price: "550",
        condition: "Lightly Used",
        location: "Cardinal Gardens",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800",
        description: "13-inch model, great battery life, includes charger.",
    },
    {
        id: 6,
        title: "Throw Pillow Set",
        price: "20",
        condition: "New",
        location: "The Lorenzo",
        imageUrl: "/dataUploads/throwPillows.jpg",
        description: "Two decorative pillows, soft and comfy.",
    },
    {
        id: 7,
        title: "Hoodie",
        price: "25",
        condition: "Used",
        location: "University Gateway",
        imageUrl: "/dataUploads/hoodie.webp",
        description: "Official bookstore hoodie, size M.",
    },
    {
        id: 8,
        title: "Wireless Headphones",
        price: "60",
        condition: "Lightly Used",
        location: "Doheny Library",
        imageUrl: "/dataUploads/wirelessHeadphones.jpg",
        description: "Noise-cancelling over-ear headphones, works perfectly.",
    },
    {
        id: 9,
        title: "Dorm Rug",
        price: "35",
        condition: "Used",
        location: "USC Village",
        imageUrl: "/dataUploads/rug.jpeg",
        description: "4x6 beige rug, clean and soft.",
    },
    {
        id: 10,
        title: "Skateboard",
        price: "50",
        condition: "Lightly Used",
        location: "McCarthy Honors College",
        imageUrl: "/dataUploads/skateboard.jpeg",
        description: "Complete board, good wheels and grip tape.",
    },
    {
        id: 11,
        title: "Bluetooth Speaker",
        price: "30",
        condition: "New",
        location: "Figueroa Street",
        imageUrl: "/dataUploads/speaker.jpg",
        description: "Portable JBL-style speaker, excellent sound.",
    },
    {
        id: 12,
        title: "Potted Plant",
        price: "10",
        condition: "Used",
        location: "Cardinal Gardens",
        imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800",
        description: "Small succulent in ceramic pot, easy to maintain.",
    }
];
