import { and, eq, gte, lt, or } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reservations, rooms } from "@/lib/db/schema";


export async function POST(req: Request) {
  try {
    // Verify user Better-Auth
    const session = await auth.api.getSession(req);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { roomId, startTime, endTime } = body;

    if (!roomId || !startTime || !endTime) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return new Response(JSON.stringify({ error: "Invalid date format" }), {
        status: 400,
      });
    }

    const [roomExists] = await db.select().from(rooms).where(eq(rooms.id, roomId));
    if (!roomExists) {
      return new Response(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }

    const overlapping = await db
      .select()
      .from(reservations)
      .where(
        and(
          eq(reservations.roomId, roomId),
          or(
            and(gte(reservations.startTime, start), lt(reservations.startTime, end)),
            and(gte(reservations.endTime, start), lt(reservations.endTime, end))
          )
        )
      );

    if (overlapping.length > 0) {
      return new Response(
        JSON.stringify({ error: "Room already booked during this time range" }),
        { status: 409 }
      );
    }

    // Create the reservation
    const [newReservation] = await db
      .insert(reservations)
      .values({
        userId,
        roomId,
        startTime: start,
        endTime: end,
      })
      .returning();

    return new Response(JSON.stringify(newReservation), { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
