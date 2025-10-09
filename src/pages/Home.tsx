// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, PlusCircle, Search } from "lucide-react";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5371687786277747";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <ShoppingBag className="w-7 h-7 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SwapSC
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/search")}>
              Search
            </Button>
            <Button onClick={() => navigate("/listing/new")}>
              New Listing
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl">Welcome, Trojan!</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                className="h-24 text-lg flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/listing/new")}
              >
                <PlusCircle className="w-6 h-6" />
                Add New Listing
              </Button>

              <Button
                variant="outline"
                className="h-24 text-lg flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/search")}
              >
                <Search className="w-6 h-6" />
                Search Listings
              </Button>
            </div>

            {/* (Optional) Quick tips / recent activity area */}
            <div className="mt-8 text-sm text-muted-foreground">
              Tip: Include clear photos and honest descriptions for faster swaps.
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
