import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<string>("individual");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [duration, setDuration] = useState<string>("1");

  // Mock groups - in production, fetch from user's groups
  const userGroups = [
    { id: "1", name: "Study Group A", members: 3 },
    { id: "2", name: "Project Team", members: 5 },
  ];

  const roomDetails: Record<string, { name: string; building: string; capacity: number; date: string; time: string; image: string }> = {
    "1": { 
      name: "Study Room 1104", 
      building: "UGL (Undergraduate Library)", 
      capacity: 4, 
      date: "September 16, 2025", 
      time: "10:00 AM",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
    },
    "2": { 
      name: "Study Room 1105", 
      building: "UGL (Undergraduate Library)", 
      capacity: 6, 
      date: "September 14, 2025", 
      time: "12:30 PM",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop"
    },
    "3": { 
      name: "Study Room 2201", 
      building: "State Hall", 
      capacity: 8, 
      date: "September 15, 2025", 
      time: "2:00 PM",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop"
    },
    "4": { 
      name: "Study Room 3105", 
      building: "STEM Building", 
      capacity: 4, 
      date: "September 15, 2025", 
      time: "3:00 PM",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    },
    "5": { 
      name: "Study Room 4201", 
      building: "State Hall", 
      capacity: 10, 
      date: "September 16, 2025", 
      time: "9:00 AM",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop"
    },
  };

  const room = id ? roomDetails[id] : null;

  const handleReserve = () => {
    const bookingTypeText = bookingType === "group" ? `for ${selectedGroup}` : "as individual";
    toast({
      title: "Room Reserved!",
      description: `${room?.name} has been booked ${bookingTypeText} for ${duration} hour(s).`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/find-room")}
          className="mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </Button>

        <h1 className="text-2xl font-bold text-foreground mb-6">
          Confirm Booking
        </h1>

        {room ? (
          <div className="space-y-6">
            {/* Room Card */}
            <Card className="p-4 bg-accent/10 border-accent/20">
              <div className="flex gap-4 items-center">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {room.name}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{room.building}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Booking Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Booking Details
              </h3>
              
              <Card className="p-4 flex items-center gap-4 bg-muted/30">
                <div className="bg-background rounded-lg p-3">
                  <Calendar className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">{room.date}</p>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 bg-muted/30">
                <div className="bg-background rounded-lg p-3">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="font-semibold text-foreground">{room.time}</p>
                </div>
              </Card>

              <Card className="p-4 bg-muted/30">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-background rounded-lg p-3">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration (max 2 hours)</p>
                  </div>
                </div>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 flex items-center gap-4 bg-muted/30">
                <div className="bg-background rounded-lg p-3">
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Room Capacity</p>
                  <p className="font-semibold text-foreground">{room.capacity} people</p>
                </div>
              </Card>
            </div>

            {/* Booking Type Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Book As
              </h3>
              
              <Card className="p-4">
                <RadioGroup value={bookingType} onValueChange={setBookingType}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="font-normal cursor-pointer">
                      Individual Booking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="group" id="group" />
                    <Label htmlFor="group" className="font-normal cursor-pointer">
                      Group Booking
                    </Label>
                  </div>
                </RadioGroup>

                {bookingType === "group" && (
                  <div className="mt-4">
                    <Label className="text-sm text-muted-foreground mb-2">Select Group</Label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Choose a group" />
                      </SelectTrigger>
                      <SelectContent>
                        {userGroups.map((group) => (
                          <SelectItem key={group.id} value={group.name}>
                            {group.name} ({group.members} members)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </Card>
            </div>

            {/* Warning Alert */}
            <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900">
              <AlertDescription className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">Please Note:</span> You can only book rooms up to 1 day in advance, with a maximum duration of 2 hours per booking.
              </AlertDescription>
            </Alert>

            {/* Reserve Button */}
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 text-base font-semibold rounded-lg"
              onClick={handleReserve}
              disabled={bookingType === "group" && !selectedGroup}
            >
              Reserve Room
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Room not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmBooking;
