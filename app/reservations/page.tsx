"use client";

import type { Building, Reservation, Room } from "@/lib/db/schema";
import dayjs from "dayjs";
import { CalendarX2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { fetcher } from "@/lib/utils";

interface FullReservation extends Reservation {
	room: Omit<Room, "buildingId"> & { building: Building };
}

export default function ReservationsPage() {
	const { data: auth, isPending } = authClient.useSession();
	const { data: reservations, isLoading } = useSWR<FullReservation[]>(
		`/api/reservations?userId=${auth?.user.id}`,
		fetcher,
	);

	if (isPending || isLoading) {
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

	async function copyInvite(link: string) {
		await navigator.clipboard.writeText(link);
		toast.success("Copied to clipboard", { richColors: true });
	}

	return (
		<div className="mx-auto max-w-screen-sm px-4 pt-28">
			<h2 className="mb-8 text-3xl font-semibold">Your Reservations</h2>

			<div className="space-y-4">
				{reservations.map((reservation) => {
					const inviteLink = `${location.origin}?invite=${reservation.inviteCode}`;

					return (
						<Card
							className="overflow-hidden pt-0"
							key={reservation.id}
						>
							<Image
								className="aspect-video max-h-28 border-b object-cover"
								src={reservation.room.building.image}
								alt=""
								width={640}
								height={360}
							/>

							<CardHeader className="pb-3">
								<div className="text-muted-foreground flex items-center text-sm">
									<MapPin className="mr-1 size-3.5" />
									<span>
										{reservation.room.building.name}
									</span>
								</div>

								<CardTitle className="mt-1">
									Room {reservation.room.number}
								</CardTitle>

								<CardDescription>
									Anim deserunt quis laborum Lorem nisi sunt
									non laborum tempor proident.
								</CardDescription>
							</CardHeader>

							<CardContent>
								<span className="mb-1 inline-block font-semibold">
									{reservation.name}
								</span>

								<p className="text-sm">
									{dayjs(reservation.startTime).format(
										"MMMM D",
									)}{" "}
									from{" "}
									{dayjs(reservation.startTime).format(
										"h:mm A",
									)}{" "}
									to{" "}
									{dayjs(reservation.endTime).format(
										"h:mm A",
									)}
								</p>

								{reservation.description && (
									<p className="text-muted-foreground mt-2 text-sm">
										{reservation.description}
									</p>
								)}
							</CardContent>

							<CardFooter className="flex-col items-start">
								<span className="mb-1 inline-block text-sm font-medium">
									Invite Link
								</span>

								<Input
									value={inviteLink}
									readOnly
									onClick={() => copyInvite(inviteLink)}
								/>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
