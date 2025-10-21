import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

const Home = () => {
  const navigate = useNavigate();

  const currentBookings = [
    {
      id: 1,
      roomName: "Study Room 1104",
      building: "Undergraduate Library",
      date: "September 10, 2025",
      time: "10:00am-12:00pm",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
    },
  ];

  const historyBookings = [
    {
      id: 2,
      roomName: "Study Room 2201",
      building: "Main Library",
      date: "September 5, 2025",
      time: "2:00pm-4:00pm",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop"
    },
  ];

  const canceledBookings = [];

  const renderBookingCard = (booking: any) => (
    <Card key={booking.id} className="overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="text-sm text-muted-foreground">
          {booking.date} {booking.time}
        </div>
        <div className="flex gap-3">
          <img 
            src={booking.image} 
            alt={booking.roomName}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              {booking.roomName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {booking.building}
            </p>
          </div>
        </div>
        <Button 
          className="w-full bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-white rounded-lg h-11 font-medium"
        >
          More Info
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="My Bookings" subtitle="Manage your reservations" />
      <div className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4 pb-24">
              {currentBookings.length > 0 ? (
                currentBookings.map(renderBookingCard)
              ) : (
                <Card className="p-12 text-center">
                  <div className="space-y-4">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground" />
                    <h3 className="text-xl font-semibold">No Current Bookings</h3>
                    <p className="text-muted-foreground text-sm">
                      You don't have any upcoming reservations.
                    </p>
                    <Button 
                      onClick={() => navigate("/dashboard")}
                      className="bg-secondary hover:bg-secondary/90 text-white"
                    >
                      Find a Room
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4 pb-24">
              {historyBookings.length > 0 ? (
                historyBookings.map(renderBookingCard)
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No booking history</p>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="canceled" className="space-y-4 pb-24">
              {canceledBookings.length > 0 ? (
                canceledBookings.map(renderBookingCard)
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No canceled bookings</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center py-4 max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-primary">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button onClick={() => navigate("/find-room")} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>
          <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Bookings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
