import { Link } from "react-router-dom";
import { BookOpen, Calendar, Search, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Hero Section with Brand */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl mb-8">
          <BookOpen className="w-24 h-24 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">
          StudyRez
        </h1>
        <p className="text-xl text-white/90 text-center max-w-md mb-12">
          Find and reserve study rooms for your academic success
        </p>
        
        <div className="w-full max-w-md space-y-4">
          <Link to="/login" className="block">
            <Button 
              size="lg" 
              className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full h-14 text-lg font-semibold shadow-lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-border">
        <div className="flex justify-around items-center py-4 max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-primary">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <Link to="/find-room" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Bookings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
