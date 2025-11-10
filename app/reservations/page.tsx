"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type BookingStatus = "current" | "history" | "canceled";

interface Booking {
	id: number;
	roomNumber: string;
	location: string;
	startTime: string;
	endTime: string;
	status: BookingStatus;
}

function formatDateTimeRange(start: string, end: string) {
	const startDate = new Date(start);
	const endDate = new Date(end);

	const dateStr = startDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const timeStr = `${startDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
	})} - ${endDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
	})}`;

	return { dateStr, timeStr };
}

export default function MyBookingsPage() {
	const [activeTab, setActiveTab] = useState<BookingStatus>("current");
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadBookings() {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch("/api/reservations", { cache: "no-store" });

				if (!res.ok) {
					if (res.status === 401) {
						setError("You must be logged in to view your bookings.");
					} else {
						setError("Failed to load bookings.");
					}
					setLoading(false);
					return;
				}

				const data = await res.json();

				const formatted = data.map((r: any) => ({
					id: r.id,
					roomNumber: r.name || "Unknown Room",
					location: r.description || "Unknown Location",
					startTime: r.startTime,
					endTime: r.endTime,
					status: r.status === "cancelled" ? "canceled" : "current",
				}));

				setBookings(formatted);
			} catch (err) {
				setError("Error loading bookings.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		loadBookings();
	}, []);

	const now = new Date();
	const filteredBookings = bookings.filter((b) => {
		const end = new Date(b.endTime);
		if (activeTab === "current") return end >= now && b.status === "current";
		if (activeTab === "history") return end < now && b.status === "current";
		if (activeTab === "canceled") return b.status === "canceled";
		return false;
	});

	const tabs = [
		{ key: "current" as BookingStatus, label: "Current" },
		{ key: "history" as BookingStatus, label: "History" },
		{ key: "canceled" as BookingStatus, label: "Canceled" },
	];

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-6">
			<div className="mx-auto max-w-md">
				{/* Header */}
				<h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">
					My Bookings
				</h1>

				{/* Tabs */}
				<div className="mb-6 flex">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							onClick={() => setActiveTab(tab.key)}
							className={`flex-1 pb-3 text-center text-base font-medium transition-colors ${
								activeTab === tab.key
									? "border-b-2 border-gray-900 text-gray-900"
									: "text-gray-500"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Booking Cards */}
				<div className="space-y-4 pb-20">
					{filteredBookings.length === 0 ? (
						<div className="py-12 text-center text-gray-500">
							No {activeTab} bookings
						</div>
					) : (
						filteredBookings.map((booking) => (
							<div
								key={booking.id}
								className="overflow-hidden rounded-xl bg-white shadow-sm"
							>
								<div className="p-4">
									{/* Date and Time */}
									{(() => {
	                                    const { dateStr, timeStr } = formatDateTimeRange(
											booking.startTime,
											booking.endTime
										);
											return (
												<div className="mb-4 text-lg font-medium text-gray-900">
													{dateStr} {timeStr}
												</div>
										);
									})()}

									{/* Divider */}
									<div className="border-t border-gray-200 mb-4"></div>

									{/* Room Info */}
									<div className="flex items-center space-x-4">
										{/* Room Image */}
										<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
											<div className="flex h-full w-full items-center justify-center bg-blue-100">
												<div className="text-xs text-blue-600">
													Room Image
												</div>
											</div>
										</div>

										{/* Room Details */}
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900">
												{booking.roomNumber}
											</h3>
											<div className="flex items-center text-gray-600">
												<svg
													className="mr-1 h-4 w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
												{booking.location}
											</div>
										</div>
									</div>

									{/* Divider */}
									<div className="border-t border-gray-200 mt-4 mb-4"></div>

									{/* More Info Button */}
									<button className="w-full rounded-full bg-gray-800 py-3 font-medium text-white transition-colors hover:bg-gray-700">
										More info
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{/* Bottom Navigation */}
			<div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white">
				<div className="flex justify-around py-2">
					{/* Home Icon */}
					<button className="flex flex-col items-center p-2">
						<div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F5F8]">
							<Image
								src="/home.svg"
								alt="Home"
								width={24}
								height={24}
							/>
						</div>
					</button>

					{/* Vector/Library Icon */}
					<button className="flex flex-col items-center p-2">
						<div className="mb-1 flex h-8 w-8 items-center justify-center">
							<Image
								src="/Vector.svg"
								alt="Library"
								width={20}
								height={20}
							/>
						</div>
					</button>

					{/* Appointment/Calendar Icon */}
					<button className="flex flex-col items-center p-2">
						<div className="mb-1 flex h-8 w-8 items-center justify-center">
							<Image
								src="/Appointment.svg"
								alt="Appointment"
								width={24}
								height={24}
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
