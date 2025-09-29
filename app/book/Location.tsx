import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/stores/booking";

interface Room {
	id: number;
	number: number;
	building: string;
	banner: string;
}

export default function Location() {
	const [query, setQuery] = useState("");
	const [rooms, setRooms] = useState<Room[]>([]);
	const booking = useBooking();

	// Temp for mocking
	useEffect(() => {
		const rooms = Array.from({ length: 20 }).map((_, i) => {
			const randIdx = Math.floor(Math.random() * 3);

			return {
				id: i,
				number: Math.floor(Math.random() * 3000),
				building: [
					"Undergraduate Library",
					"State Hall",
					"STEM Center",
				][randIdx],
				banner: [
					"/ugl-ext.jpg",
					"/state-hall-ext.jpg",
					"/stem-ext.jpg",
				][randIdx],
			};
		});

		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setRooms(rooms);
	}, []);

	function selectRoom(room: Room) {
		booking.setLocation(room.building, room.number);
		booking.setStep("details");
	}

	return (
		<div className="space-y-8">
			<hgroup>
				<h2 className="text-3xl font-semibold">Location</h2>

				<p className="text-muted-foreground mt-1 max-w-prose text-sm">
					Qui pariatur pariatur non anim ipsum laborum quis minim sint
					Lorem ullamco qui. Voluptate esse eiusmod velit qui minim.
					Ut aute voluptate cupidatat ipsum ut pariatur laboris
					consequat occaecat aliqua ullamco dolor.
				</p>
			</hgroup>

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
				{rooms.map((room) => {
					return (
						<Card className="overflow-hidden pt-0" key={room.id}>
							<Image
								className="aspect-video max-h-28 border-b object-cover"
								src={room.banner}
								alt={room.building}
								width={640}
								height={360}
							/>

							<CardHeader className="pb-3">
								<div className="text-muted-foreground flex items-center text-sm">
									<MapPin className="mr-1 size-3.5" />
									<span>{room.building}</span>
								</div>

								<CardTitle className="mt-1">
									Room {room.number}
								</CardTitle>

								<CardDescription>
									Anim deserunt quis laborum Lorem nisi sunt
									non laborum tempor proident.
								</CardDescription>
							</CardHeader>

							<CardContent></CardContent>

							<CardFooter>
								<Button
									className="w-full"
									type="button"
									onClick={() => selectRoom(room)}
								>
									Select
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
