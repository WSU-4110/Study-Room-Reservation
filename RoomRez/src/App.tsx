import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SelectUniversity from "./pages/SelectUniversity";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import FindRoom from "./pages/FindRoom";
import Dashboard from "./pages/Dashboard";
import ConfirmBooking from "./pages/ConfirmBooking";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/select-university" element={<SelectUniversity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/find-room" element={<FindRoom />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/confirm-booking/:id" element={<ConfirmBooking />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
