import { useNavigate } from "react-router-dom";
import { Users, Clock, Search, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState<string>("all");
  const [selectedTime, setSelectedTime] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("today");

  const rooms = [
    {
      id: 1,
      name: "Study Room 1104",
      building: "UGL (Undergraduate Library)",
      capacity: 4,
      time: "10:00 AM",
      date: "September 14, 2025",
      available: true,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Study Room 1105",
      building: "UGL (Undergraduate Library)",
      capacity: 6,
      time: "12:30 PM",
      date: "September 14, 2025",
      available: true,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Study Room 2201",
      building: "State Hall",
      capacity: 8,
      time: "2:00 PM",
      date: "September 15, 2025",
      available: true,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Study Room 3105",
      building: "STEM Building",
      capacity: 4,
      time: "3:00 PM",
      date: "September 15, 2025",
      available: true,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Study Room 4201",
      building: "State Hall",
      capacity: 10,
      time: "9:00 AM",
      date: "September 16, 2025",
      available: true,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop"
    },
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesBuilding = selectedBuilding === "all" || room.building === selectedBuilding;
    const matchesTime = selectedTime === "all" || room.time.startsWith(selectedTime);
    
    // Filter by day - only show today or tomorrow
    const roomDate = new Date(room.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = roomDate.toDateString() === today.toDateString();
    const isTomorrow = roomDate.toDateString() === tomorrow.toDateString();
    
    const matchesDay = 
      selectedDay === "today" ? isToday : 
      selectedDay === "tomorrow" ? isTomorrow : 
      true;
    
    return matchesBuilding && matchesTime && matchesDay;
  });


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Available Rooms" subtitle="Browse and book study spaces" />
      <div className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-3 mb-6">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-3">
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  <SelectItem value="State Hall">State Hall</SelectItem>
                  <SelectItem value="UGL (Undergraduate Library)">UGL (Undergraduate Library)</SelectItem>
                  <SelectItem value="STEM Building">STEM Building</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Times</SelectItem>
                  <SelectItem value="8:00">8:00 AM</SelectItem>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="1:00">1:00 PM</SelectItem>
                  <SelectItem value="2:00">2:00 PM</SelectItem>
                  <SelectItem value="3:00">3:00 PM</SelectItem>
                  <SelectItem value="4:00">4:00 PM</SelectItem>
                  <SelectItem value="5:00">5:00 PM</SelectItem>
                  <SelectItem value="6:00">6:00 PM</SelectItem>
                  <SelectItem value="7:00">7:00 PM</SelectItem>
                  <SelectItem value="8:00">8:00 PM</SelectItem>
                  <SelectItem value="9:00">9:00 PM</SelectItem>
                  <SelectItem value="10:00">10:00 PM</SelectItem>
                  <SelectItem value="11:00">11:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pb-24">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex gap-4 p-4">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {room.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {room.building}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{room.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-lg h-11 font-semibold"
                    onClick={() => navigate(`/confirm-booking/${room.id}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
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
