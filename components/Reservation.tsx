import type { Building, FullReservation, Room } from "@/lib/db/schema";
import type { BookingStep } from "@/stores/booking";
import dayjs from "dayjs";
import { MapPin, UsersRound } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBooking } from "@/stores/booking";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface FooterButtonProps {
	readonly: boolean;
	step: BookingStep;
	onClick: () => void;
}

interface ReservationProps {
	readonly?: boolean;
	building: Building;
	room: Room;
	reservation?: FullReservation;
	onSelect?: () => void;
	onConfirm?: () => void;
	onCancel?: () => void;
}

function FooterButton({ readonly, step, onClick }: FooterButtonProps) {
	if (readonly) {
		return (
			<Button className="w-full rounded-full hover:text-danger hover:bg-white hover:border-danger
			 dark:text-white dark:hover:text-danger dark:hover:bg-white " variant="destructive" onClick={onClick}>
				Cancel
			</Button>
		);
	}

	if (step === "location") {
		return (
			<Button className="w-full rounded-full border-brand/40 text-white hover:bg-brand/10 hover:text-brand shadow-sm
			dark:border-brand/60 dark:bg-white dark:text-black
    		dark:hover:bg-brand/40 dark:hover:text-white" onClick={onClick}>
				Select
			</Button>
		);
	}

	if (step === "confirmation") {
		return (
			<Button className="w-full bg-danger rounded-full border-brand/40 text-white hover:bg-brand/10 hover:text-brand shadow-sm
			dark:border-brand/60 dark:bg-white dark:text-black
    		dark:hover:bg-danger/40 dark:hover:text-white" onClick={onClick}>
				Confirm
			</Button>
		);
	}

	return null;
}

export default function Reservation({
	readonly = false,
	building,
	room,
	reservation,
	onSelect,
	onConfirm,
	onCancel,
}: ReservationProps) {
	let { step, name, description, inviteCode, start, end } = useBooking();

	if (readonly && reservation) {
		name = reservation.name;
		description = reservation.description;
		inviteCode = reservation.inviteCode;
		start = reservation.startTime;
		end = reservation.endTime;
	}

	const hasContent = name || description || inviteCode || start || end;
	const inviteLink = `${location.origin}?invite=${inviteCode}`;

	async function copyInvite() {
		await navigator.clipboard.writeText(inviteLink);
		toast.success("Copied to clipboard");
	}

	return (
		<Card className="overflow-hidden pt-0">
			<Image
				className="aspect-video max-h-32 border-b object-cover"
				src={building.image ?? "https://placehold.co/640x360/png"}
				alt={`Exterior view of ${building.name}`}
				width={640}
				height={320}
			/>

			<CardHeader>
				<div className="text-muted-foreground flex items-center text-sm">
					<MapPin className="mr-1 size-3.5" />
					<span>{building.name}</span>
				</div>

				<CardTitle>Room {room.number}</CardTitle>

				<CardDescription className="mt-2">
					<ul>
						{room.capacity && (
							<li className="flex items-center">
								<UsersRound className="mr-1 size-4" />
								Accompanies up to {room.capacity} people
							</li>
						)}
					</ul>
				</CardDescription>
			</CardHeader>

			{hasContent && (
				<CardContent>
					<div className="mb-1 flex items-center gap-2">
						{name && <span className="font-semibold">{name}</span>}

						{reservation?.status === "cancelled" && (
							<Badge className="outline-destructive bg-destructive/40 rounded-full border-0 text-red-700 outline dark:text-red-400">
								Cancelled
							</Badge>
						)}
					</div>

					<p className="text-sm">
						{start && dayjs(start).format("MMMM D")}
						{start && <> from {dayjs(start).format("h:mm A")}</>}
						{end && <> to {dayjs(end).format("h:mm A")}</>}
					</p>

					{description && (
						<p className="text-muted-foreground mt-2 text-sm">
							{description}
						</p>
					)}

					{reservation?.attendees &&
						reservation.attendees.length > 0 && (
							<div className="mt-4">
								<span className="mb-1 inline-block text-sm font-medium">
									Attendees
								</span>

								<div className="flex items-center space-x-2">
									{reservation.attendees.map(({ user }) => (
										<Tooltip key={user.id}>
											<TooltipTrigger>
												<Image
													src={user.image ?? ""}
													alt={user.name}
													width={24}
													height={24}
													className="rounded-full"
												/>
											</TooltipTrigger>
											<TooltipContent>
												{user.name}
											</TooltipContent>
										</Tooltip>
									))}
								</div>
							</div>
						)}

					{inviteCode && (
						<div className="mt-4">
							<span className="mb-1 inline-block text-sm font-medium">
								Invite Link
							</span>

							<Input
								value={inviteLink}
								readOnly
								onClick={copyInvite}
							/>
						</div>
					)}
				</CardContent>
			)}

			{reservation?.status !== "cancelled" && (
				<CardFooter>
					<FooterButton
						readonly={readonly}
						step={step}
						onClick={
							onSelect ?? onConfirm ?? onCancel ?? (() => {})
						}
					/>
				</CardFooter>
			)}
		</Card>
	);
}
