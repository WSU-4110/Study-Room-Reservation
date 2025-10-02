import dayjs from "dayjs";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	MiniCalendar,
	MiniCalendarDay,
	MiniCalendarDays,
} from "@/components/ui/kibo-ui/mini-calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBooking } from "@/stores/booking";

export default function Details() {
	const now = new Date();

	const booking = useBooking();
	const [selectedDate, setSelectedDate] = useState(now);
	const [error, setError] = useState<string | null>(null);

	function setStart(value: string) {
		const now = new Date();

		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, "0");
		const day = now.getDate().toString().padStart(2, "0");

		const start = new Date(`${year}-${month}-${day}T${value}`);

		booking.setStart(start);
	}

	function setEnd(value: string) {
		const now = new Date();

		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, "0");
		const day = now.getDate().toString().padStart(2, "0");

		const end = new Date(`${year}-${month}-${day}T${value}`);
		const diff = dayjs(end).diff(dayjs(booking.start), "seconds");

		if (diff > 7200) {
			setError("Reservation cannot be longer than 2 hours.");
			return;
		}

		setError(null);
		booking.setEnd(end);
	}

	return (
		<div className="space-y-8">
			<hgroup>
				<h2 className="text-3xl font-semibold">Details</h2>

				<p className="text-muted-foreground mt-1 max-w-prose text-sm">
					Qui pariatur pariatur non anim ipsum laborum quis minim sint
					Lorem ullamco qui. Voluptate esse eiusmod velit qui minim.
					Ut aute voluptate cupidatat ipsum ut pariatur laboris
					consequat occaecat aliqua ullamco dolor.
				</p>
			</hgroup>

			<div className="flex flex-col gap-6 sm:flex-row">
				<div className="w-full">
					<Card className="w-full overflow-hidden pt-0">
						<Image
							className="aspect-video max-h-28 border-b object-cover"
							src="/stem-ext.jpg"
							alt=""
							width={640}
							height={360}
						/>

						<CardHeader className="pb-3">
							<div className="text-muted-foreground flex items-center text-sm">
								<MapPin className="mr-1 size-3.5" />
								<span>{booking.building}</span>
							</div>

							<CardTitle className="mt-1">
								Room {booking.room}
							</CardTitle>

							<CardDescription>
								Anim deserunt quis laborum Lorem nisi sunt non
								laborum tempor proident.
							</CardDescription>
						</CardHeader>

						<CardContent>
							{booking.name && (
								<span className="mb-1 inline-block font-semibold">
									{booking.name}
								</span>
							)}

							<p className="text-sm">
								{dayjs(selectedDate).format("MMMM D")}{" "}
								{booking.start && (
									<>
										from{" "}
										{dayjs(booking.start).format("h:mm A")}
									</>
								)}
								{booking.end && (
									<>
										{" "}
										to {dayjs(booking.end).format("h:mm A")}
									</>
								)}
							</p>

							{booking.description && (
								<p className="text-muted-foreground mt-2 text-sm">
									{booking.description}
								</p>
							)}
						</CardContent>
					</Card>
				</div>

				<div className="w-full">
					<div className="grid w-full grid-cols-10 gap-4">
						<div className="col-span-full max-w-min">
							<span className="mb-2 inline-block text-sm/none font-medium">
								Date
							</span>

							<MiniCalendar
								className="dark:bg-input/30 bg-transparent"
								days={7}
								value={selectedDate}
								onValueChange={(value) => {
									setSelectedDate(value ?? now);
								}}
							>
								<MiniCalendarDays>
									{(date) => (
										<MiniCalendarDay
											key={date.toISOString()}
											date={date}
										/>
									)}
								</MiniCalendarDays>
							</MiniCalendar>
						</div>

						<div className="col-span-full flex flex-col gap-2">
							<div className="flex gap-4">
								<div>
									<Label
										className="mb-2"
										htmlFor="time-start"
									>
										From
									</Label>

									<Input
										id="time-start"
										className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
										type="time"
										step="1800"
										disabled={!selectedDate}
										onChange={(e) =>
											setStart(e.target.value)
										}
									/>
								</div>

								<div>
									<Label className="mb-2" htmlFor="time-end">
										To
									</Label>

									<Input
										id="time-end"
										className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
										type="time"
										step="1800"
										disabled={!booking.start}
										onChange={(e) => setEnd(e.target.value)}
									/>
								</div>
							</div>

							{error && (
								<p className="text-destructive text-sm">
									{error}
								</p>
							)}
						</div>

						<div className="col-span-8 col-start-1">
							<Label className="mb-2" htmlFor="name">
								Name
							</Label>

							<Input
								id="name"
								type="text"
								required
								onChange={(e) => {
									booking.setName(e.target.value);
								}}
							/>
						</div>

						<div className="col-span-8 col-start-1">
							<Label className="mb-2" htmlFor="description">
								Description{" "}
								<span className="text-muted-foreground text-xs">
									(optional)
								</span>
							</Label>

							<Textarea
								id="description"
								onChange={(e) => {
									booking.setDescription(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
