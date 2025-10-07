import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Leaf, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "USC Community Only",
    description: "Trade with fellow Trojans. Every user is verified with a @usc.edu email for your peace of mind.",
    color: "text-[hsl(var(--feature-1))]",
  },
  {
    icon: Leaf,
    title: "Sustainable Shopping",
    description: "Give items a second life and reduce waste. Shop sustainably while saving money.",
    color: "text-[hsl(var(--feature-3))]",
  },
  {
    icon: Zap,
    title: "Quick & Easy",
    description: "List items in seconds, browse effortlessly, and connect instantly with buyers and sellers.",
    color: "text-[hsl(var(--feature-2))]",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Built-in trust with verified students. Meet on campus, chat securely, and trade with confidence.",
    color: "text-[hsl(var(--feature-4))]",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SwapSC
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The trusted marketplace built exclusively for the USC community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
