import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { reservations, rooms, users } from "@/lib/db/schema";

export async function GET() {
  try {
    const data = await db
    .select({
      reservationId: reservations.id,
      userId: users.id,
      userName: users.name,
      userEmail: users.email,
      roomNumber: rooms.roomNumber,
      building: rooms.building,
      startTime: reservations.startTime,
      endTime: reservations.endTime,
      createdAt: reservations.createdAt,
    })
    .from(reservations)
    .leftJoin(users, eq(reservations.userId, users.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .orderBy(reservations.startTime);

  return Response.json(data);
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
