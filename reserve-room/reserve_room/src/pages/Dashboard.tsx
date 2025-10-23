import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();

  const bookings = [
    {
      id: 1,
      roomName: "Study Room 1104",
      building: "Undergraduate Library",
      date: "September 14, 2025",
      time: "10:00 AM - 12:00 PM",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      roomName: "Study Room 2201",
      building: "Main Library",
      date: "October 22, 2025",
      time: "2:00 PM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="My Bookings" subtitle="View your reservations" />
      <div className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6">

          {bookings.length > 0 ? (
            <div className="space-y-4 pb-24">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex gap-4 p-4">
                    <img 
                      src={booking.image} 
                      alt={booking.roomName}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {booking.roomName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {booking.building}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Button 
                      className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-lg h-11 font-semibold"
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">No Bookings Yet</h3>
                <p className="text-muted-foreground text-sm">
                  You haven't reserved any study rooms yet. Start by finding an available room!
                </p>
                <Button 
                  onClick={() => navigate("/find-room")}
                  className="bg-secondary hover:bg-secondary/90 text-white"
                >
                  Find a Room
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center py-4 max-w-md mx-auto">
          <button onClick={() => navigate("/")} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button onClick={() => navigate("/find-room")} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Bookings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
