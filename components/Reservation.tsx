import type { Building, Room } from "@/lib/db/schema";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FooterButtonProps {
	readonly: boolean;
	step: BookingStep;
	onClick: () => void;
}

interface ReservationProps {
	readonly?: boolean;
	building: Building;
	room: Room;
	onSelect?: () => void;
	onConfirm?: () => void;
	onCancel?: () => void;
}

function FooterButton({ readonly, step, onClick }: FooterButtonProps) {
	if (readonly) {
		return (
			<Button className="w-full" variant="destructive" onClick={onClick}>
				Cancel
			</Button>
		);
	}

	if (step === "location") {
		return (
			<Button className="w-full" onClick={onClick}>
				Select
			</Button>
		);
	}

	if (step === "confirmation") {
		return (
			<Button className="w-full" onClick={onClick}>
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
	onSelect,
	onConfirm,
	onCancel,
}: ReservationProps) {
	const { step, title, description, start, end } = useBooking();

	const hasContent = title || description || start || end;
	const inviteLink = `${location.origin}?invite=`;

	async function copyInvite() {
		await navigator.clipboard.writeText(inviteLink);
		toast.success("Copied to clipboard", { richColors: true });
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

			<CardHeader className="pb-3">
				<div className="text-muted-foreground flex items-center text-sm">
					<MapPin className="mr-1 size-3.5" />
					<span>{building.name}</span>
				</div>

				<CardTitle>Room {room.number}</CardTitle>

				<CardDescription className="mt-1">
					<ul>
						<li className="flex items-center">
							<UsersRound className="mr-1 size-4" />
							Accompanies up to {room.capacity} people
						</li>
					</ul>
				</CardDescription>
			</CardHeader>

			{hasContent && (
				<CardContent>
					{title && (
						<span className="mb-1 inline-block font-semibold">
							{title}
						</span>
					)}

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

					{/*inviteCode && (
						<div className="mt-6">
							<span className="mb-1 inline-block text-sm font-medium">
								Invite Link
							</span>

							<Input
								value={inviteLink}
								readOnly
								onClick={copyInvite}
							/>
						</div>
					)*/}
				</CardContent>
			)}

			<CardFooter>
				<FooterButton
					readonly={readonly}
					step={step}
					onClick={onSelect ?? onConfirm ?? onCancel ?? (() => {})}
				/>
			</CardFooter>
		</Card>
	);
}
