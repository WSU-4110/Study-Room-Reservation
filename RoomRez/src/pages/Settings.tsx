import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Moon, Bell, ChevronRight, Users, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Home, Search, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [groups, setGroups] = useState<Array<{ id: string; name: string; members: string[] }>>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [currentGroupMembers, setCurrentGroupMembers] = useState<string[]>([]);
  const userEmail = localStorage.getItem("userEmail") || "john.doe@wayne.edu";

  const handleAddMember = () => {
    if (newMemberEmail && newMemberEmail.includes("@")) {
      setCurrentGroupMembers([...currentGroupMembers, newMemberEmail]);
      setNewMemberEmail("");
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = (email: string) => {
    setCurrentGroupMembers(currentGroupMembers.filter(m => m !== email));
  };

  const handleCreateGroup = () => {
    if (newGroupName && currentGroupMembers.length > 0) {
      const newGroup = {
        id: Date.now().toString(),
        name: newGroupName,
        members: currentGroupMembers,
      };
      setGroups([...groups, newGroup]);
      setNewGroupName("");
      setCurrentGroupMembers([]);
      setShowCreateGroup(false);
      toast({
        title: "Group Created",
        description: `${newGroupName} has been created successfully.`,
      });
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please add a group name and at least one member.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(g => g.id !== groupId));
    toast({
      title: "Group Deleted",
      description: "The group has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>

          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
            Settings
          </h1>

          {/* Profile Card */}
          <Card className="p-6 bg-accent text-white mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-4">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm opacity-90">{userEmail}</p>
              </div>
            </div>
          </Card>

          {/* Account Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Account
            </h3>
            
            <Card className="divide-y">
              <div className="p-4 flex items-center gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Email Address</p>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
              </div>

              <button 
                className="p-4 flex items-center gap-4 w-full hover:bg-muted/50 transition-colors"
                onClick={() => {}}
              >
                <div className="bg-muted rounded-lg p-3">
                  <Lock className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your password</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Groups Section */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Groups
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateGroup(!showCreateGroup)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Create Group
              </Button>
            </div>

            {showCreateGroup && (
              <Card className="p-4 space-y-4">
                <Input
                  placeholder="Group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Member email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                    />
                    <Button onClick={handleAddMember} size="sm">
                      Add
                    </Button>
                  </div>

                  {currentGroupMembers.length > 0 && (
                    <div className="space-y-1">
                      {currentGroupMembers.map((email, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded">
                          <span className="text-sm">{email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(email)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreateGroup} className="flex-1">
                    Create Group
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateGroup(false);
                      setNewGroupName("");
                      setCurrentGroupMembers([]);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {groups.length > 0 && (
              <div className="space-y-2">
                {groups.map((group) => (
                  <Card key={group.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-accent/10 rounded-lg p-2">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{group.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="pl-11 space-y-1">
                      {group.members.map((member, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {member}
                        </p>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Preferences Section */}
          <div className="space-y-4 pb-24">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Preferences
            </h3>
            
            <Card className="divide-y">
              <div className="p-4 flex items-center gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <Moon className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle dark appearance</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="p-4 flex items-center gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <Bell className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Notifications</p>
                  <p className="text-sm text-muted-foreground">Booking reminders & updates</p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
            </Card>
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
          <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Settings;
