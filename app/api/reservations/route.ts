import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reservations, rooms } from "@/lib/db/schema";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const data = await db
    .select({
      reservationId: reservations.id,
      roomNumber: rooms.roomNumber,
      building: rooms.building,
      startTime: reservations.startTime,
      endTime: reservations.endTime,
    })
    .from(reservations)
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .where(eq(reservations.userId, session.user.id))
    .orderBy(reservations.startTime);

  return Response.json(data);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
