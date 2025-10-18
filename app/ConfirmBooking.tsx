import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Calendar, ChevronLeft, Clock, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Mock data - will be replaced with real data from backend
  const room = {
    id: roomId,
    name: "Study Room 1104",
    building: "Undergraduate Library",
    capacity: 4,
    timeSlot: "10:00 AM - 12:00 PM",
    date: "September 16, 2025",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  };

  const handleReserve = () => {
    setShowConfirmDialog(true);
  };

  const confirmReservation = () => {
    // TODO: Connect to backend
    toast({
      title: "Room reserved successfully!",
      description: `${room.name} has been added to your bookings`,
    });
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="hover:bg-accent"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Confirm Booking</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Room Card with Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={room.image}
                alt={room.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold">{room.name}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {room.building}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Booking Details
          </h3>

          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{room.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p className="font-medium">{room.timeSlot}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of People</p>
                    <p className="font-medium">{room.timeSlot}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Warning Note */}
        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-100">
                <strong>Please Note:</strong> Maximum of 2 active bookings allowed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reserve Button */}
        <Button 
          onClick={handleReserve} 
          size="lg" 
          className="w-full h-12 text-base bg-[hsl(0,70%,60%)] hover:bg-[hsl(0,70%,55%)] text-white"
        >
          Reserve Room
        </Button>
      </main>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reserve {room.name} for {room.timeSlot} on {room.date}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReservation}>Confirm Reservation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmBooking;
