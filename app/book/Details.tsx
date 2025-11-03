"use client";

import { useBooking } from "@/stores/booking";

export default function Details() {
	const booking = useBooking();

	return (
		<div className="mx-auto max-w-md space-y-6 bg-white p-6 rounded-lg">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Booking Summary
				</h2>
				<p className="text-gray-600">
					Please review your booking details
				</p>
			</div>

			<div className="space-y-4">
				{/* Date */}
				<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
					<span className="font-medium text-gray-700">Date</span>
					<span className="text-gray-900">{booking.date || "Not selected"}</span>
				</div>

				{/* Time Slot */}
				<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
					<span className="font-medium text-gray-700">Time Slot</span>
					<span className="text-gray-900">{booking.timeSlot || "Not selected"}</span>
				</div>

				{/* People */}
				<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
					<span className="font-medium text-gray-700">Number of People</span>
					<span className="text-gray-900">{booking.people ? `${booking.people} ${parseInt(booking.people) === 1 ? 'person' : 'people'}` : "Not selected"}</span>
				</div>

				{/* Room */}
				<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
					<span className="font-medium text-gray-700">Room</span>
					<span className="text-gray-900">{booking.roomNo ? `Room ${booking.roomNo}` : "Not selected"}</span>
				</div>

				{/* Building */}
				{booking.building && (
					<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
						<span className="font-medium text-gray-700">Building</span>
						<span className="text-gray-900">{booking.building}</span>
					</div>
				)}
			</div>
		</div>
	);
}
