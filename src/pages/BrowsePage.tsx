// src/pages/BrowsePage.tsx - Updated with Recommendation Popup
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";
import { recordListingClick } from "@/lib/listingClickTracker";
import { RecommendationPopup } from "@/components/RecommendationPopup";
import { incrementClickCount, shouldShowRecommendations } from "@/lib/clickCounterService";
import { ClickProgressIndicator } from "@/components/ClickProgressIndicator";
import { toast } from "sonner";

type Listing = {
    _id: string;
    title: string;
    imageUrl: string;
    price: number;
    condition: string;
    location: string;
    description: string;
};

const BrowsePage = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => res.json())
            .then((data) => setListings(data))
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    const handleListingClick = (listing: Listing) => {
        recordListingClick({
            id: listing._id,
            name: listing.title,
            clickedAt: new Date().toISOString(),
        });

        // Increment click count
        const newCount = incrementClickCount();

        // Check if we should show recommendations
        if (shouldShowRecommendations()) {
            // Show recommendation popup
            setSelectedListing(listing);
            setShowRecommendations(true);
        } else {
            // Not enough clicks yet, go directly to product page
            const remaining = 2 - newCount; // CLICK_THRESHOLD is 2
            if (remaining > 0) {
                toast.info(`Click ${remaining} more product${remaining > 1 ? 's' : ''} to unlock personalized recommendations!`, {
                    duration: 2000,
                });
            }
            navigate(`/listing/${listing._id}`);
        }
    };

    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Browse Listings</h1>
            <button
                type="button"
                onClick={() => navigate("/home")}
                className="w-full text-sm text-muted-foreground hover:text-foreground mt-1 mb-4"
            >
                ← Back to home
            </button>

            {/* Progress Indicator */}
            <ClickProgressIndicator />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                    <Card
                        key={listing._id}
                        className="hover:shadow-lg transition cursor-pointer"
                        onClick={() => handleListingClick(listing)}
                    >
                        <img
                            src={listing.imageUrl}
                            alt={listing.title}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <CardHeader>
                            <CardTitle>{listing.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-primary font-semibold">${listing.price}</p>
                            <p className="text-sm text-muted-foreground">{listing.condition}</p>
                            <p className="text-sm text-muted-foreground">{listing.location}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recommendation Popup */}
            {selectedListing && (
                <RecommendationPopup
                    clickedProduct={selectedListing}
                    allProducts={listings}
                    open={showRecommendations}
                    onOpenChange={setShowRecommendations}
                />
            )}
        </div>
    );
};

export default BrowsePage;
