// src/components/RecommendationPopup.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, X, ArrowRight } from "lucide-react";
import {
  getRecommendations,
  type Product,
  type RecommendationResponse,
} from "@/lib/recommendationService";
import { recordListingClick } from "@/lib/listingClickTracker";

interface RecommendationPopupProps {
  clickedProduct: Product;
  allProducts: Product[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecommendationPopup = ({
  clickedProduct,
  allProducts,
  open,
  onOpenChange,
}: RecommendationPopupProps) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const result = await getRecommendations(clickedProduct, allProducts, 3);
        setRecommendations(result);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [open, clickedProduct._id]);

  const handleProductClick = (product: Product) => {
    recordListingClick({
      id: product._id,
      name: product.title,
      clickedAt: new Date().toISOString(),
    });
    onOpenChange(false);
    navigate(`/listing/${product._id}`);
  };

  const handleContinueToProduct = () => {
    onOpenChange(false);
    navigate(`/listing/${clickedProduct._id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <DialogTitle className="text-2xl">Before You Go...</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Based on your interest in{" "}
            <span className="font-semibold text-foreground">
              {clickedProduct.title}
            </span>
            , you might also like these items
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-3 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-40" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recommendations && recommendations.recommendations.length > 0 ? (
          <>
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Why these?</span>{" "}
                {recommendations.reasoning}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {recommendations.recommendations.map((product) => (
                <Card
                  key={product._id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-lg font-bold text-primary mb-2">
                      ${product.price}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {product.condition}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.location}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recommendations available at this time.</p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleContinueToProduct}
          >
            View {clickedProduct.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="px-6"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
