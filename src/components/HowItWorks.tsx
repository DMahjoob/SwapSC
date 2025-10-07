import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Upload, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account with your @usc.edu email and join the Trojan marketplace.",
    step: "01",
  },
  {
    icon: Upload,
    title: "List or Browse",
    description: "Post items you want to sell or browse listings from fellow USC students.",
    step: "02",
  },
  {
    icon: MessageCircle,
    title: "Connect & Trade",
    description: "Message sellers, arrange meetups on campus, and complete your trade safely.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Join your campus marketplace in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <step.icon className="w-16 h-16 mx-auto mb-6 mt-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
