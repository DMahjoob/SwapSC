// src/components/ClickProgressIndicator.tsx (OPTIONAL)
import { useEffect, useState } from "react";
import { getClickCount, getClicksRemaining } from "@/lib/clickCounterService";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export const ClickProgressIndicator = () => {
  const [clicksRemaining, setClicksRemaining] = useState(getClicksRemaining());

  useEffect(() => {
    // Update on mount
    setClicksRemaining(getClicksRemaining());

    // Listen for storage changes (if user opens multiple tabs)
    const handleStorageChange = () => {
      setClicksRemaining(getClicksRemaining());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Don't show anything if user has already unlocked recommendations
  if (clicksRemaining === 0) {
    return null;
  }

  const clickCount = getClickCount();
  const total = 2; // CLICK_THRESHOLD

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium">
            Click {clicksRemaining} more product{clicksRemaining > 1 ? "s" : ""} to unlock AI-powered recommendations!
          </p>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i < clickCount ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
