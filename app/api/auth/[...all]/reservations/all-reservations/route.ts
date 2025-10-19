import { db } from "@/lib/db";
import { reservations, rooms, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select({
        id: reservations.id,
        userId: reservations.userId,
        roomNumber: rooms.roomNumber,
        building: rooms.building,
        startTime: reservations.startTime,
        endTime: reservations.endTime,
      })
      .from(reservations)
      .leftJoin(rooms, eq(reservations.roomId, rooms.id));

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
