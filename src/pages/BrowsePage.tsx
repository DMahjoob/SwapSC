import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleListings } from "@/data/sampleData";
import { useNavigate } from "react-router-dom";

const BrowsePage = () => {
    const navigate = useNavigate();

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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sampleListings.map((listing) => (
                    <Card
                        key={listing.id}
                        className="hover:shadow-lg transition cursor-pointer"
                        onClick={() => navigate(`/listing/${listing.id}`)}
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
        </div>
    );
};

export default BrowsePage;
