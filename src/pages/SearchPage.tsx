import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Search } from "lucide-react";
import { useEffect } from "react";
import {API_URL} from "@/config/api.ts";

const SearchPage = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [condition, setCondition] = useState("");

    const suggestedSearches = [
        "Couch",
        "Mattress",
        "Game Day Tickets",
        "Television"
    ];

    const handleSearch = async () => {
        const params = new URLSearchParams();
        setLoading(true);

        if (searchTerm) params.append("title", searchTerm);
        if (priceRange && priceRange !== "Any") params.append("priceRange", priceRange);
        if (condition && condition !== "Any") params.append("condition", condition);

        try {
            const response = await fetch(`${API_URL}/api/products/search?${params.toString()}`);
            const data = await response.json();

            console.log("Search results:", data);
            setResults(data);
            // TODO: store in state and render
            setLoading(false);
        } catch (err) {
            console.error("Error fetching search results:", err);
            setResults([]);
            setLoading(false);
        }
    };


    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div
                        className="flex items-center justify-center gap-2 mb-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <ShoppingBag className="w-8 h-8 text-primary"/>
                        <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SwapSC
            </span>
                    </div>
                    <p className="text-muted-foreground">USC Student Marketplace</p>
                </div>

                <Card className="border-2 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Search Marketplace
                        </CardTitle>
                        <CardDescription className="text-center">
                            Find what you need from fellow Trojans
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Suggested Searches */}
                        <div className="flex flex-wrap justify-center gap-2">
                            <span>Suggested Searches:</span>
                            {suggestedSearches.map((item) => (
                                <Button
                                    key={item}
                                    variant="outline"
                                    className="text-sm"
                                    onClick={() => setSearchTerm(item)}
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>

                        {/* Search Box */}
                        <div className="space-y-2">
                            <Label htmlFor="search">Search for a product</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    id="search"
                                    placeholder="e.g. mini fridge, USC hoodie..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="space-y-4">
                            <div>
                                <Label className="text-base font-medium">Price Range</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {["<$20", "$20-40", "$40-80", "$80-120", "$120+", "Any"].map((range) => (
                                        <Button
                                            key={range}
                                            variant={priceRange === range ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setPriceRange(range)}
                                        >
                                            {range}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-medium">Condition</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {["New", "Lightly Used", "Used", "Any"].map((cond) => (
                                        <Button
                                            key={cond}
                                            variant={condition === cond ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCondition(cond)}
                                        >
                                            {cond}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <Button className="w-full mt-4" onClick={handleSearch}>
                            Search
                        </Button>

                        {/* Back button */}
                        <button
                            type="button"
                            onClick={() => navigate("/home")}
                            className="w-full text-sm text-muted-foreground hover:text-foreground mt-2"
                        >
                            ← Back to home
                        </button>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full max-w-2xl mt-6 space-y-4">
                {
                    results.map((product) => (
                        <Card key={product._id} className="shadow-md border">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-t-md"
                            />
                            <CardContent>
                                <CardTitle>{product.title}</CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                                <p className="font-semibold mt-2">${product.price}</p>
                                <p className="text-sm text-muted-foreground">{product.condition}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    View
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchPage;
