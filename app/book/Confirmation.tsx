"use client";

import { useBooking } from "@/stores/booking";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Clock, Users, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Confirmation() {
	const booking = useBooking();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);

	const handleConfirm = async () => {
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setIsConfirmed(true);
			// Reset booking after confirmation
			setTimeout(() => {
				booking.reset();
				// Redirect to /reservations page
				router.push("/reservations");
			}, 2000);
		}, 1500);
	};

	if (isConfirmed) {
		return (
			<div className="mx-auto max-w-md text-center space-y-6">
				<div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
					<Check className="w-8 h-8 text-green-600" />
				</div>
				<div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						Booking Confirmed!
					</h2>
					<p className="text-gray-600">
						Your study room has been successfully reserved.
					</p>
				</div>
				<div className="text-sm text-gray-500">
					Redirecting to reservations page...
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-md space-y-6 bg-white p-6 rounded-lg">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Confirm Your Booking
				</h2>
				<p className="text-gray-600">
					Please review and confirm your reservation
				</p>
			</div>

			{/* Booking Details Card */}
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
				<div className="flex items-center space-x-3">
					<Calendar className="w-5 h-5 text-gray-400" />
					<div>
						<span className="font-medium text-gray-700">Date: </span>
						<span className="text-gray-900">{booking.date}</span>
					</div>
				</div>

				<div className="flex items-center space-x-3">
					<Clock className="w-5 h-5 text-gray-400" />
					<div>
						<span className="font-medium text-gray-700">Time: </span>
						<span className="text-gray-900">{booking.timeSlot}</span>
					</div>
				</div>

				<div className="flex items-center space-x-3">
					<Users className="w-5 h-5 text-gray-400" />
					<div>
						<span className="font-medium text-gray-700">People: </span>
						<span className="text-gray-900">
							{booking.people} {parseInt(booking.people || "0") === 1 ? 'person' : 'people'}
						</span>
					</div>
				</div>

				<div className="flex items-center space-x-3">
					<MapPin className="w-5 h-5 text-gray-400" />
					<div>
						<span className="font-medium text-gray-700">Room: </span>
						<span className="text-gray-900">Room {booking.roomNo}</span>
					</div>
				</div>
			</div>

			{/* Confirmation Button */}
			<Button
				onClick={handleConfirm}
				disabled={isSubmitting}
				className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3"
			>
				{isSubmitting ? (
					<div className="flex items-center space-x-2">
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
						<span>Confirming...</span>
					</div>
				) : (
					"Confirm Booking"
				)}
			</Button>

			{/* Terms */}
			<p className="text-xs text-gray-500 text-center">
				By confirming, you agree to our terms and conditions for room reservations.
			</p>
		</div>
	);
}
