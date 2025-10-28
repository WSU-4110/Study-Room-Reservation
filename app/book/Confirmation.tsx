import { nanoid } from "nanoid";
import { useEffect } from "react";
import Reservation from "@/components/Reservation";
import { useBooking } from "@/stores/booking";

export default function Confirmation() {
	const booking = useBooking();
	const code = nanoid(16);

	useEffect(() => {
		booking.setInviteCode(code);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex justify-center">
			<div className="flex flex-col gap-6">
				<hgroup className="flex max-w-md flex-col">
					<h2 className="text-3xl font-semibold">Confirmation</h2>

					<p className="text-muted-foreground mt-1 text-sm">
						Qui pariatur pariatur non anim ipsum laborum quis minim
						sint Lorem ullamco qui. Use the unique link to invite
						others to your reservation. The link will expire at the
						start of your reservation.
					</p>
				</hgroup>

				<div className="max-w-lg">
					{booking.building && booking.room && (
						<Reservation
							view="editing"
							building={booking.building}
							room={booking.room}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
