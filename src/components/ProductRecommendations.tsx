// src/components/ProductRecommendations.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";
import { 
  getRecommendations, 
  type Product,
  type RecommendationResponse 
} from "@/lib/recommendationService";
import { recordListingClick } from "@/lib/listingClickTracker";

interface ProductRecommendationsProps {
  currentProduct: Product;
  allProducts: Product[];
  numRecommendations?: number;
}

export const ProductRecommendations = ({
  currentProduct,
  allProducts,
  numRecommendations = 3
}: ProductRecommendationsProps) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getRecommendations(
          currentProduct,
          allProducts,
          numRecommendations
        );
        setRecommendations(result);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setError("Unable to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    if (currentProduct && allProducts.length > 0) {
      fetchRecommendations();
    }
  }, [currentProduct._id, allProducts.length]);

  const handleProductClick = (product: Product) => {
    recordListingClick({
      id: product._id,
      name: product.title,
      clickedAt: new Date().toISOString(),
    });
    navigate(`/listing/${product._id}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">You Might Also Like</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !recommendations || recommendations.recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-primary mt-1" />
        <div>
          <h3 className="text-xl font-semibold mb-1">You Might Also Like</h3>
          <p className="text-sm text-muted-foreground">{recommendations.reasoning}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.recommendations.map((product) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary font-semibold text-lg mb-2">
                ${product.price}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{product.condition}</Badge>
                <Badge variant="secondary" className="text-xs">
                  {product.location}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
