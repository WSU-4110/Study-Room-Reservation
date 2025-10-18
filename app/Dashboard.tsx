import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calendar, Clock, UserCircle, MapPin, Filter, Users, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // Mock data - will be replaced with real data from backend
  const currentBookings = [
    {
      id: 1,
      roomName: "Study Room 1104",
      building: "Undergraduate Library",
      date: "September 16, 2025",
      time: "10:00am - 12:00pm",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
  ];

  const availableRooms = [
    {
      id: 2,
      name: "Study Room 1105",
      building: "Undergraduate Library",
      capacity: 6,
      timeSlot: "12:30pm - 2:30pm",
      date: "September 16, 2025",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Study Room 2201",
      building: "Graduate Library",
      capacity: 4,
      timeSlot: "2:00pm - 4:00pm",
      date: "September 16, 2025",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop",
    },
  ];

  const freeRooms = [
    {
      id: 4,
      name: "Study Room 3102",
      building: "Science Library",
      capacity: 8,
      timeSlot: "Available Now",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Study Room 1103",
      building: "Undergraduate Library",
      capacity: 4,
      timeSlot: "Available Now",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-soft sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-foreground">StudyRez</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <UserCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="dashboard" className="py-3">My Dashboard</TabsTrigger>
            <TabsTrigger value="search" className="py-3">Search Rooms</TabsTrigger>
            <TabsTrigger value="free" className="py-3">Free Rooms</TabsTrigger>
          </TabsList>

          {/* My Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Tabs defaultValue="current" className="space-y-4">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4">
                <h2 className="text-2xl font-semibold">My Bookings</h2>
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <Card key={booking.id} className="shadow-medium hover:shadow-large transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <img
                            src={booking.image}
                            alt={booking.roomName}
                            className="w-full md:w-48 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                          />
                          <div className="p-6 flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold">{booking.roomName}</h3>
                                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                  <Building className="h-4 w-4" />
                                  {booking.building}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {booking.date}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {booking.time}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => navigate(`/booking/${booking.id}`)}
                                className="flex-1"
                              >
                                More Info
                              </Button>
                              <Button variant="destructive" className="flex-1">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="shadow-soft">
                    <CardContent className="py-12 text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No current bookings</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h2 className="text-2xl font-semibold">Previous Bookings</h2>
                <Card className="shadow-soft">
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No previous bookings</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Search Rooms Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
                <CardDescription>Find your perfect study space</CardDescription>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8am-12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                      <SelectItem value="evening">Evening (5pm-10pm)</SelectItem>
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
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full md:w-48 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                      />
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{room.name}</h3>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                              <Building className="h-4 w-4" />
                              {room.building}
                            </p>
                          </div>
                          <Badge className="bg-success text-success-foreground">Available</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {room.date}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            Capacity: {room.capacity}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                            <Clock className="h-4 w-4" />
                            {room.timeSlot}
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate(`/confirm-booking/${room.id}`)}
                          className="w-full"
                        >
                          Reserve Room
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Free Rooms Tab */}
          <TabsContent value="free" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-success" />
              <h2 className="text-2xl font-semibold">Available Now</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              These rooms are available for immediate booking
            </p>
            {freeRooms.map((room) => (
              <Card key={room.id} className="shadow-medium hover:shadow-large transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full md:w-48 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    />
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{room.name}</h3>
                          <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            <Building className="h-4 w-4" />
                            {room.building}
                          </p>
                        </div>
                        <Badge className="bg-success text-success-foreground animate-pulse">
                          {room.timeSlot}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Users className="h-4 w-4" />
                        Capacity: {room.capacity} people
                      </div>
                      <Button
                        onClick={() => navigate(`/confirm-booking/${room.id}`)}
                        className="w-full"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
