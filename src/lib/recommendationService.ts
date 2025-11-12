// src/lib/recommendationService.ts
import { API_URL } from '@/config/api';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  location: string;
  imageUrl: string;
}

export interface RecommendationRequest {
  clickedProduct: Product;
  allProducts: Product[];
  numRecommendations?: number;
}

export interface RecommendationResponse {
  recommendations: Product[];
  reasoning: string;
}

/**
 * Get product recommendations using Claude API
 * @param clickedProduct The product the user clicked on
 * @param allProducts All available products to choose from
 * @param numRecommendations Number of recommendations to return (default: 3)
 */
export async function getRecommendations(
  clickedProduct: Product,
  allProducts: Product[],
  numRecommendations: number = 3
): Promise<RecommendationResponse> {
  // Filter out the clicked product from recommendations
  const candidateProducts = allProducts.filter(
    (p) => p._id !== clickedProduct._id
  );

  if (candidateProducts.length === 0) {
    return {
      recommendations: [],
      reasoning: "No other products available for recommendations."
    };
  }

  // Prepare the prompt for Claude
  const prompt = `You are a product recommendation system for a USC student marketplace. 
A user just clicked on this product:

**Clicked Product:**
- Title: ${clickedProduct.title}
- Description: ${clickedProduct.description}
- Price: $${clickedProduct.price}
- Condition: ${clickedProduct.condition}
- Location: ${clickedProduct.location}

Here are all available products to recommend from:

${candidateProducts.map((p, idx) => `
**Product ${idx + 1}** (ID: ${p._id})
- Title: ${p.title}
- Description: ${p.description}
- Price: $${p.price}
- Condition: ${p.condition}
- Location: ${p.location}
`).join('\n')}

Based on the clicked product, recommend the ${Math.min(numRecommendations, candidateProducts.length)} MOST similar products from the list above. Consider:
1. Product category/type similarity
2. Price range similarity
3. Condition similarity
4. Use case similarity

Respond ONLY with valid JSON in this exact format (no markdown, no additional text):
{
  "recommendations": ["product_id_1", "product_id_2", "product_id_3"],
  "reasoning": "Brief explanation of why these products are similar"
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the text content
    const textContent = data.content
      .filter((item: any) => item.type === "text")
      .map((item: any) => item.text)
      .join("");

    // Parse the JSON response
    const cleanedText = textContent.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleanedText);

    // Map the product IDs back to full product objects
    const recommendedProducts = result.recommendations
      .map((id: string) => candidateProducts.find((p) => p._id === id))
      .filter(Boolean) as Product[];

    return {
      recommendations: recommendedProducts,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    
    // Fallback: return random products if API fails
    const shuffled = [...candidateProducts].sort(() => Math.random() - 0.5);
    return {
      recommendations: shuffled.slice(0, Math.min(numRecommendations, shuffled.length)),
      reasoning: "Unable to generate AI recommendations. Showing random similar items."
    };
  }
}

/**
 * Cache recommendations to avoid redundant API calls
 */
const recommendationCache = new Map<string, RecommendationResponse>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedRecommendations(
  clickedProduct: Product,
  allProducts: Product[],
  numRecommendations: number = 3
): Promise<RecommendationResponse> {
  const cacheKey = `${clickedProduct._id}-${allProducts.length}`;
  
  const cached = recommendationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const result = await getRecommendations(clickedProduct, allProducts, numRecommendations);
  recommendationCache.set(cacheKey, result);

  // Clear cache after duration
  setTimeout(() => {
    recommendationCache.delete(cacheKey);
  }, CACHE_DURATION);

  return result;
}
