import dayjs from "dayjs";
import { MapPin } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/stores/booking";

export default function Confirmation() {
	const booking = useBooking();

	const id = nanoid(16);
	const inviteLink = `https://book-a-nook.vercel.app?invite=${id}`;

	return (
		<div className="flex gap-6">
			<div className="flex flex-col gap-8">
				<hgroup>
					<h2 className="text-3xl font-semibold">Confirmation</h2>

					<p className="text-muted-foreground mt-1 max-w-prose text-sm">
						Qui pariatur pariatur non anim ipsum laborum quis minim
						sint Lorem ullamco qui. Voluptate esse eiusmod velit qui
						minim. Ut aute voluptate cupidatat ipsum ut pariatur
						laboris consequat occaecat aliqua ullamco dolor.
					</p>
				</hgroup>

				<div>
					<Label className="mb-2" htmlFor="invite-link">
						Invite Link
					</Label>

					<Input
						id="invite-link"
						type="text"
						readOnly
						value={inviteLink}
						onClick={async () => {
							await navigator.clipboard.writeText(inviteLink);
							toast("Copied to clipboard");
						}}
					/>

					<p className="text-muted-foreground mt-1 text-sm">
						Use this unique link to invite others to your
						reservation. This link will expire at the start of your
						reservation.
					</p>
				</div>
			</div>

			<div className="max-w-lg">
				<Card className="overflow-hidden pt-0">
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
						<span className="mb-1 inline-block font-semibold">
							{booking.name}
						</span>

						<p className="text-sm">
							{dayjs(booking.start).format("MMMM D")} from{" "}
							{dayjs(booking.start).format("h:mm A")} to{" "}
							{dayjs(booking.end).format("h:mm A")}
						</p>

						{booking.description && (
							<p className="text-muted-foreground mt-2 text-sm">
								{booking.description}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
