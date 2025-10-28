import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { buildings, rooms } from "@/lib/db/schema";

export async function GET() {
	const rows = await db
		.select({
			id: rooms.id,
			number: rooms.number,
			capacity: rooms.capacity,
			buildingId: rooms.buildingId,
			building: buildings,
		})
		.from(rooms)
		.leftJoin(buildings, eq(rooms.buildingId, buildings.id));

	return Response.json(rows);
}
