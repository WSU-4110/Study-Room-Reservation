
import { useState } from "react";
import { useBooking } from "@/stores/booking";

export default function DateTime() {
	const booking = useBooking();

	const [date, setDate] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [people, setPeople] = useState("");
	const [showRoomList, setShowRoomList] = useState(false);
	const [roomNo, setRoomNo] = useState("");

	const roomOptions = ["1001", "1002", "1003"];

	const setRoomFn = (roomNumber: string) => {
		setRoomNo(roomNumber);
		booking.setReservation(date, timeSlot, people, roomNumber);
	};

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-6">
			<div className="mx-auto max-w-md">
				{/* Header */}
				<h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">
					Make a Reservation
				</h1>

				{/* Form Fields */}
				<div className="space-y-6">
					{/* Date Field */}
					<div>
						<label className="mb-3 block text-lg font-medium text-gray-900">
							Date
						</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-base text-gray-900 focus:border-gray-500 focus:ring-0 focus:outline-none"
						/>
					</div>

					{/* Time Slot Field */}
					<div>
						<label className="mb-3 block text-lg font-medium text-gray-900">
							Time Slot
						</label>
						<div className="relative">
							<select
								value={timeSlot}
								onChange={(e) => setTimeSlot(e.target.value)}
								className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 pr-8 text-base text-gray-900 focus:border-gray-500 focus:ring-0 focus:outline-none"
							>
							<option value="">Select a time slot</option>
							<option value="9:00am-11:00am">
								9:00am - 11:00am
							</option>
							<option value="11:00am-1:00pm">
								11:00am - 1:00pm
							</option>
							<option value="1:00pm-3:00pm">
								1:00pm - 3:00pm
							</option>
							<option value="3:00pm-5:00pm">
								3:00pm - 5:00pm
							</option>
							<option value="5:00pm-7:00pm">
								5:00pm - 7:00pm
							</option>
							<option value="7:00pm-9:00pm">
								7:00pm - 9:00pm
							</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
							<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
					</div>

					{/* People Field */}
					<div>
						<label className="mb-3 block text-lg font-medium text-gray-900">
							People
						</label>
						<div className="relative">
							<select
								value={people}
								onChange={(e) => setPeople(e.target.value)}
								className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 pr-8 text-base text-gray-900 focus:border-gray-500 focus:ring-0 focus:outline-none"
							>
							<option value="">Select number of people</option>
							<option value="1">1 person</option>
							<option value="2">2 people</option>
							<option value="3">3 people</option>
							<option value="4">4 people</option>
							<option value="5">5 people</option>
							<option value="6">6 people</option>
							<option value="7">7 people</option>
							<option value="8">8 people</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
							<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
					</div>
				</div>

				{/* Find Room Button */}
				<div className="mt-12 pb-6">
					<button
						onClick={() => {
							if (date && timeSlot && people) {
								setShowRoomList(true);
							}
						}}
						disabled={!date || !timeSlot || !people}
						className={`w-full rounded-full py-4 text-lg font-medium text-white transition-colors ${
							date && timeSlot && people
								? 'bg-gray-800 hover:bg-gray-700'
								: 'bg-gray-400 cursor-not-allowed'
						}`}
					>
						Find Room
					</button>
				</div>

				{/* Room List */}
				{showRoomList && (
					<div className="mt-5">
						<h2 className="mb-4 text-lg font-medium text-gray-900">
							Select a Room
						</h2>
						<div className="space-y-3">
							{roomOptions.map((roomNumber) => (
								<label
									key={roomNumber}
									className="flex items-center rounded-lg border border-gray-300 bg-white p-4 cursor-pointer hover:bg-gray-50"
								>
									<input
										type="radio"
										name="room"
										value={roomNumber}
										checked={roomNo === roomNumber}
										onChange={(e) => setRoomFn(e.target.value)}
										className="mr-3 h-4 w-4 text-gray-800 focus:ring-gray-500"
									/>
									<span className="text-base text-gray-900">
										Room {roomNumber}
									</span>
								</label>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
