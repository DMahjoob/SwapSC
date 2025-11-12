// src/pages/ProductPage.tsx - Updated version
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { API_URL } from '@/config/api';
import { ArrowLeft, ShieldCheck, MapPin, Star, MessageCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const fallbackSeller = {
  id: "seller-usc",
  name: "USC Student",
  avatarUrl: "",
  rating: 4.8,
  sales: 23,
  joined: "2024",
  location: "Los Angeles, CA",
  bio: "Buying & selling around campus. Flexible meetups at Village / Leavey.",
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the current product
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error(err);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  // Fetch all products for recommendations
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error loading products for recommendations:", err);
      }
    };
    fetchAllProducts();
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  const seller = listing?.seller ?? fallbackSeller;

  if (!listing) {
    return (
      <div className="min-h-screen bg-muted/20 p-6 flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Listing not found.</p>
        <Button onClick={() => navigate("/browse")}>Back to Browse</Button>
      </div>
    );
  }

  const handleBuy = () => {
    toast.success("Great! We've notified the seller you're interested. Check your messages.");
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message first.");
      return;
    }
    toast.success("Message sent to seller!");
    setMessage("");
  };

  const initials = seller.name
    .split(" ")
    .map((s: string) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl p-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Image */}
          <Card className="lg:col-span-2 overflow-hidden">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-[420px] object-cover"
            />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{listing.title}</CardTitle>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{listing.condition}</Badge>
                    <div className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">${listing.price}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {listing.description ?? "No description provided."}
                </p>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Meet in public campus spots. Inspect the item before paying.
              </div>
            </CardContent>
          </Card>

          {/* Right: Actions + Seller */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interested?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleBuy}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now / Make Offer
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Seller
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message {seller.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="offer">Offer (optional)</Label>
                        <Input
                          id="offer"
                          placeholder="e.g. $70 if we meet tonight"
                          value={offer}
                          onChange={(e) => setOffer(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="msg">Message</Label>
                        <Textarea
                          id="msg"
                          placeholder="Hi! Is this still available?"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={5}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSendMessage}>Send</Button>
                        <Button variant="outline" onClick={() => setMessage("")}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{seller.name}</div>
                    <div className="text-xs text-muted-foreground">{seller.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {seller.rating?.toFixed(1) ?? "4.8"} rating
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div>{seller.sales ?? 0} sales</div>
                </div>

                {seller.bio && (
                  <p className="text-sm text-muted-foreground">{seller.bio}</p>
                )}

                <Button variant="secondary">View Profile</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommendations Section */}
        {allProducts.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-8" />
            <ProductRecommendations
              currentProduct={listing}
              allProducts={allProducts}
              numRecommendations={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
