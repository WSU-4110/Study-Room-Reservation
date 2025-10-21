import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check university email domain
    const selectedUniversity = localStorage.getItem("selectedUniversity");
    if (selectedUniversity === "Wayne State University" && !email.endsWith("@wayne.edu")) {
      toast({
        title: "Invalid Email",
        description: "Please use your Wayne State University email (@wayne.edu)",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("userEmail", email);
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">N</span>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in with your credentials
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-white h-12 rounded-lg text-base font-medium"
          >
            Sign In
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => toast({ title: "Feature coming soon!" })}
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
