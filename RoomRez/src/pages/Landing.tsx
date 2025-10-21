import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#5DBAAA] flex flex-col items-center justify-center p-6">
      <div className="space-y-8 text-center">
        <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-lg">
          <BookOpen className="w-16 h-16 text-[#5DBAAA]" strokeWidth={2} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">StudyRez</h1>
          <p className="text-white/90 text-lg">
            Reserve your study space,<br />anywhere.
          </p>
        </div>

        <Button
          onClick={() => navigate("/select-university")}
          className="bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-white h-12 px-8 rounded-full text-base font-medium"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Landing;
