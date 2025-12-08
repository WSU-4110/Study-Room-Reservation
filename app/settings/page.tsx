"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, Plus, Bell, User, ChevronRight, Moon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (typeof data.enabled === "boolean") setNotifications(!!data.enabled);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoaded(true);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8">
      <header className="px-4">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </header>

      <section className="px-4">
        <div className="rounded-xl overflow-hidden bg-rose-400 text-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-white/90" />
            </div>

            <div>
              <div className="font-semibold">John Doe</div>
              <div className="text-sm opacity-90">handiandj@wayne.edu</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 space-y-4">
        <h2 className="text-sm font-medium text-slate-500">ACCOUNT</h2>

        <div className="grid gap-3">
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col divide-y">
                <Link href="#" className="block p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-slate-100/70 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-700" />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">Email Address</div>
                    <div className="text-sm text-muted-foreground">handiandj@wayne.edu</div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>

                <Link href="#" className="block p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-slate-100/70 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-slate-700" />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">Change Password</div>
                    <div className="text-sm text-muted-foreground">Update your password</div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-500">GROUPS</h2>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Create Group
          </Button>
        </div>
      </section>

      <section className="px-4">
        <h2 className="text-sm font-medium text-slate-500">PREFERENCES</h2>

        <Card>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y">
              <div className="p-4 flex items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md bg-slate-100/70 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-slate-700" />
                  </div>

                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm text-muted-foreground">Toggle dark appearance</div>
                  </div>
                </div>

                <div>
                  <ThemeToggle />
                </div>
              </div>

              <div className="p-4 flex items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md bg-slate-100/70 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-slate-700" />
                  </div>

                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className="text-sm text-muted-foreground">Booking reminders & updates</div>
                  </div>
                </div>

                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications}
                      onChange={async () => {
                        const next = !notifications;
                        setNotifications(next);
                        try {
                          await fetch("/api/settings", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ enabled: next }),
                          });
                        } catch (e) {
                          // revert on failure
                          setNotifications((s) => !s);
                        }
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-rose-400 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
