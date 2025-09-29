import { create } from "zustand";

export type BookingStep = "location" | "details" | "confirmation";

export interface BookingState {
	step: BookingStep;
	building: string | null;
	room: string | null;
	start: Date | null;
	end: Date | null;
	name: string | null;
	description: string | null;
}

export interface BookingActions {
	setStep: (step: BookingStep) => void;
	setLocation: (building: string, room: string) => void;
	setStart: (start: Date) => void;
	setEnd: (end: Date) => void;
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	reset: () => void;
}

export type BookingStore = BookingState & BookingActions;

const defaultState: BookingState = {
	step: "location",
	building: null,
	room: null,
	start: null,
	end: null,
	name: null,
	description: null,
};

export const useBooking = create<BookingStore>((set) => ({
	...defaultState,
	setStep: (step) => set({ step }),
	setLocation: (building, room) => set({ building, room }),
	setStart: (start) => set({ start }),
	setEnd: (end) => set({ end }),
	setName: (name) => set({ name }),
	setDescription: (description) => set({ description }),
	reset: () => set(defaultState),
}));
