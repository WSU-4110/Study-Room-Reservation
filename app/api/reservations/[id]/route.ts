import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";

export async function DELETE(
	request: NextRequest,
	ctx: RouteContext<"/api/reservations/[id]">,
) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { id } = await ctx.params;

	try {
		await db.delete(reservations).where(eq(reservations.id, Number(id)));

		return new Response(null, { status: 204 });
	} catch {
		return Response.json(
			{ message: "Failed to delete reservation" },
			{ status: 500 },
		);
	}
}
