import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="USC students exchanging items on campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">USC Community Only</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Buy & Sell Within the{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Trojan Family
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 animate-fade-in-up [animation-delay:200ms]">
            Your trusted marketplace for second-hand goods. Sustainable, safe, and exclusively for USC students.
          </p>
          
          // In the Hero component, update the buttons section:
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:400ms]">
            <Button variant="hero" size="lg" className="text-lg" onClick={() => navigate('/signup')}>
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroSecondary" size="lg" className="text-lg" onClick={() => navigate('/login')}>
              List an Item
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground animate-fade-in [animation-delay:600ms]">
            🎓 Verified @usc.edu email required
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
