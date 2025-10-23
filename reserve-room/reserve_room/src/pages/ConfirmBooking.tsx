import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const roomDetails: Record<string, { name: string; building: string; time: string; date: string; capacity: number }> = {
    "1": { name: "Study Room 1104", building: "Undergraduate Library", time: "10:00 AM - 12:00 PM", date: "September 14, 2025", capacity: 4 },
    "2": { name: "Study Room 1105", building: "Undergraduate Library", time: "12:30 PM - 2:30 PM", date: "September 14, 2025", capacity: 6 },
    "3": { name: "Study Room 2201", building: "Main Library", time: "2:00 PM - 4:00 PM", date: "September 15, 2025", capacity: 8 },
    "4": { name: "Study Room 3105", building: "Science Library", time: "3:00 PM - 5:00 PM", date: "September 15, 2025", capacity: 4 },
  };

  const room = id && roomDetails[id] ? roomDetails[id] : {
    name: `Study Room ${id}`,
    building: "Campus Library",
    time: "TBD",
    date: "TBD",
    capacity: 4
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full overflow-hidden">
        <div className="bg-accent text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Confirm Booking</h1>
          <p className="text-white/90 text-sm">Review your reservation details</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">{room.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{room.building}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Date</p>
                    <p className="text-sm text-muted-foreground">{room.date}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Time Slot</p>
                    <p className="text-sm text-muted-foreground">{room.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Capacity</p>
                    <p className="text-sm text-muted-foreground">{room.capacity} people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg h-12 text-base font-semibold"
              onClick={() => navigate("/dashboard")}
            >
              Confirm Booking
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg h-12 text-base font-semibold"
              onClick={() => navigate("/find-room")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmBooking;
