import { ShoppingBag, Mail, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SwapSC
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The trusted marketplace for USC students to buy and sell second-hand goods sustainably within the Trojan community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          </div>


        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SwapSC. All rights reserved. Built for the USC community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
