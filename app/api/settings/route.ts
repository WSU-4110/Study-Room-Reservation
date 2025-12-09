import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Notifier, NotificationSettings } from "@/lib/notifer";

const DEFAULT_SETTINGS: NotificationSettings = {
  reminderMinutes: [60, 15],
  urgentThreshold: 15,
  enabled: true,
};

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const rows = await db.select().from(users).where(eq(users.id, userId));

  if (!rows || rows.length === 0) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const user = rows[0] as any;
  const prefs = (user.preferences as NotificationSettings) ?? DEFAULT_SETTINGS;

  return Response.json(prefs);
}

export async function PUT(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  let body: any;
  try {
    body = await request.json();
  } catch (e) {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const notifier = new Notifier();

  const candidate: NotificationSettings = {
    reminderMinutes: body.reminderMinutes ?? DEFAULT_SETTINGS.reminderMinutes,
    urgentThreshold: body.urgentThreshold ?? DEFAULT_SETTINGS.urgentThreshold,
    enabled: typeof body.enabled === "boolean" ? body.enabled : DEFAULT_SETTINGS.enabled,
  };

  const validation = notifier.validateNotificationSettings(candidate);
  if (!validation.isValid) {
    return Response.json({ message: "Invalid settings", errors: validation.errors }, { status: 400 });
  }

  const updated = await db.update(users).set({ preferences: candidate }).where(eq(users.id, userId)).returning();

  return Response.json({ preferences: candidate, updated }, { status: 200 });
}
