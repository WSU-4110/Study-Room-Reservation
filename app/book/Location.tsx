import type { Building, Room } from "@/lib/db/schema";
import { Search } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/Loading";
import Reservation from "@/components/Reservation";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/utils";
import { useBooking } from "@/stores/booking";

interface FullRoom extends Room {
	building: Building;
}

function Intro() {
	return (
		<hgroup>
			<h2 className="text-3xl font-semibold">Location</h2>

			<p className="text-muted-foreground mt-1 max-w-prose text-sm">
				Qui pariatur pariatur non anim ipsum laborum quis minim sint
				Lorem ullamco qui. Voluptate esse eiusmod velit qui minim. Ut
				aute voluptate cupidatat ipsum ut pariatur laboris consequat
				occaecat aliqua ullamco dolor.
			</p>
		</hgroup>
	);
}

export default function Location() {
	const [query, setQuery] = useState("");
	const booking = useBooking();

	const { data: rooms = [], isLoading } = useSWR<FullRoom[]>(
		"/api/rooms",
		fetcher,
	);

	function selectRoom(room: FullRoom) {
		booking.setLocation(room.building, {
			...room,
			buildingId: room.building.id,
		});

		booking.setStep("details");
	}

	if (isLoading) {
		return (
			<>
				<Intro />
				<Loading />
			</>
		);
	}

	return (
		<div className="space-y-8">
			<Intro />

			<div className="flex flex-col gap-2 sm:flex-row">
				<div className="relative w-full">
					<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />

					<Input
						className="pl-9"
						value={query}
						placeholder="Search rooms..."
						onChange={(event) => setQuery(event.target.value)}
					/>
				</div>

				<Select>
					<SelectTrigger className="w-full sm:w-auto">
						<SelectValue placeholder="Filter building" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="all">All buildings</SelectItem>
						<SelectItem value="ugl">
							Undergraduate Library
						</SelectItem>
						<SelectItem value="state-hall">State Hall</SelectItem>
						<SelectItem value="stem">STEM Center</SelectItem>
					</SelectContent>
				</Select>

				<Select>
					<SelectTrigger className="w-full sm:w-auto">
						<SelectValue placeholder="Filter size" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="all">All sizes</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid-auto grid gap-4">
				{rooms.map((room) => (
					<Reservation
						key={room.id}
						view="selection"
						building={room.building}
						room={room}
						onSelect={() => selectRoom(room)}
					/>
				))}
			</div>
		</div>
	);
}
