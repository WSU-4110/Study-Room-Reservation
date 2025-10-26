"use client";

import type { Reservation } from "@/lib/db/schema";
import { CalendarX2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { fetcher } from "@/lib/utils";

export default function ReservationsPage() {
	const { data: reservations, isLoading } = useSWR<Reservation[]>(
		"/api/reservations",
		fetcher,
	);

	if (isLoading) {
		return <Loading />;
	}

	if (!reservations?.length) {
		return (
			<div className="flex h-full items-center justify-center">
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<CalendarX2 />
						</EmptyMedia>

						<EmptyTitle>No Reservations</EmptyTitle>

						<EmptyDescription>
							You haven't booked any reservations yet. Get started
							by creating your first reservation.
						</EmptyDescription>
					</EmptyHeader>

					<EmptyContent>
						<Button asChild>
							<Link href="/book">Book a Reservation</Link>
						</Button>
					</EmptyContent>
				</Empty>
			</div>
		);
	}
}
