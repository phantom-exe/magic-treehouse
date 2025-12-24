import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TreePine, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Snowfall from "@/components/Snowfall";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-night flex items-center justify-center relative overflow-hidden">
      <Snowfall intensity="light" />
      <div className="fixed inset-0 vignette pointer-events-none z-20" />

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border border-primary/30 mb-6">
          <TreePine className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">This page got lost in the snow ❄️</p>
        <Button asChild className="rounded-full px-8 py-6 text-lg glow-gold">
          <Link to="/"><Home className="w-5 h-5 mr-2" />Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
