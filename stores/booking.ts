import { create } from "zustand";

export type BookingStep = "location" | "date-time" | "details" | "confirmation";

export interface BookingState {
	step: BookingStep;
	building: string | null;
	room: string | null;
	start: Date | null;
	end: Date | null;
	title: string | null;
	description: string | null;
	attendees: string[];
}

export interface BookingActions {
	setStep: (step: BookingStep) => void;
	setLocation: (building: string, room: string) => void;
	setTime: (start: Date, end: Date) => void;
	setDetails: (
		title: string,
		description: string,
		attendees: string[],
	) => void;
	reset: () => void;
}

export type BookingStore = BookingState & BookingActions;

const defaultState: BookingState = {
	step: "location",
	building: null,
	room: null,
	start: null,
	end: null,
	title: null,
	description: null,
	attendees: [],
};

export const useBooking = create<BookingStore>((set) => ({
	...defaultState,
	setStep: (step) => set({ step }),
	setLocation: (building, room) => set({ building, room }),
	setTime: (start, end) => set({ start, end }),
	setDetails: (title, description, attendees) =>
		set({ title, description, attendees }),
	reset: () => set(defaultState),
}));
