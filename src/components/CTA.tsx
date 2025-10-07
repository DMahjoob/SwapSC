import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in">
          Ready to Start Trading?
        </h2>
        <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-in-up">
          Join hundreds of USC students buying and selling sustainably within the Trojan community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:200ms]">
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground shadow-lg"
          >
            Browse Listings
          </Button>
        </div>
        <p className="mt-6 text-sm text-primary-foreground/80 animate-fade-in [animation-delay:400ms]">
          No credit card required • Free to join • Verified USC students only
        </p>
      </div>
    </section>
  );
};

export default CTA;
