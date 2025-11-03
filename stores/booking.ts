import type { Building, Room } from "@/lib/db/schema";
import { create } from "zustand";

export type BookingStep = "location" | "details" | "confirmation";

export interface BookingState {
	step: BookingStep;
	building: Building | null;
	room: Room | null;
	start: Date | null;
	end: Date | null;
	name: string | null;
	description: string | null;
	inviteCode: string | null;
}

export interface BookingActions {
	setStep: (step: BookingStep) => void;
	setLocation: (building: Building, room: Room) => void;
	setStart: (start: Date) => void;
	setEnd: (end: Date) => void;
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setInviteCode: (code: string) => void;
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
	inviteCode: null,
};

class BookingStoreClass {
	public constructor(
		private readonly set: (partial: Partial<BookingStore>) => void,
		private readonly get: () => BookingStore,
	) {}

	public getInitialState() {
		return { ...defaultState };
	}

	public setStep(step: BookingStep) {
		this.set({ step });
	}

	public setLocation(building: Building, room: Room) {
		this.set({ building, room });
	}

	public setStart(start: Date) {
		this.set({ start });
	}

	public setEnd(end: Date) {
		const start = this.get().start;

		if (!start) {
			throw new Error("Start date must be set before setting end date.");
		}

		if (end.getTime() < start.getTime()) {
			throw new Error("End date cannot be before start date.");
		}

		this.set({ end });
	}

	public setName(name: string) {
		this.set({ name });
	}

	public setDescription(description: string) {
		this.set({ description });
	}

	public setInviteCode(code: string) {
		this.set({ inviteCode: code });
	}

	public reset() {
		this.set({ ...defaultState });
	}
}

export const useBooking = create<BookingStore>((set, get) => {
	const store = new BookingStoreClass(set, get);

	return {
		...store.getInitialState(),
		setStep: (step) => store.setStep(step),
		setLocation: (building, room) => store.setLocation(building, room),
		setStart: (start) => store.setStart(start),
		setEnd: (end) => store.setEnd(end),
		setName: (name) => store.setName(name),
		setDescription: (description) => store.setDescription(description),
		setInviteCode: (code) => store.setInviteCode(code),
		reset: () => store.reset(),
	};
});
