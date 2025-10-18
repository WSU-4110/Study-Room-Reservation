import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Calendar, ChevronLeft, Filter, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FindRoom = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Mock data - will be replaced with real data from backend
  const availableRooms = [
    {
      id: 1,
      name: "Study Room 1104",
      building: "Undergraduate Library",
      capacity: 4,
      timeSlot: "10:00am - 12:00pm",
      date: "September 16, 2025",
      available: true,
    },
    {
      id: 2,
      name: "Study Room 1105",
      building: "Undergraduate Library",
      capacity: 6,
      timeSlot: "12:30pm - 2:30pm",
      date: "September 16, 2025",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-soft sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-primary-foreground">Find Booking</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>Refine your search</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Building</label>
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergrad">Undergraduate Library</SelectItem>
                  <SelectItem value="grad">Graduate Library</SelectItem>
                  <SelectItem value="science">Science Library</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Room Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-4 people)</SelectItem>
                  <SelectItem value="medium">Medium (5-8 people)</SelectItem>
                  <SelectItem value="large">Large (9+ people)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Available Rooms */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Rooms</h2>
          {availableRooms.map((room) => (
            <Card key={room.id} className="shadow-medium hover:shadow-large transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Building className="h-4 w-4" />
                      {room.building}
                    </CardDescription>
                  </div>
                  <Badge className="bg-success text-success-foreground">Available</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {room.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Capacity: {room.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <MapPin className="h-4 w-4" />
                    {room.timeSlot}
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/confirm-booking/${room.id}`)}
                  className="w-full"
                >
                  More Info
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FindRoom;
