export interface Booking {
	building: string;
	room: number;
	start: Date;
	end: Date;
	name: string | null;
	description: string | null;
}

export class BookingBuilder {
	#building: string | null;
	#room: number | null;
	#start: Date | null;
	#end: Date | null;
	#name: string | null;
	#description: string | null;

	public constructor() {
		this.#building = null;
		this.#room = null;
		this.#start = null;
		this.#end = null;
		this.#name = null;
		this.#description = null;
	}

	public setBuilding(building: string): this {
		this.#building = building;
		return this;
	}

	public setRoom(room: number): this {
		this.#room = room;
		return this;
	}

	public setStart(start: Date): this {
		this.#start = start;
		return this;
	}

	public setEnd(end: Date): this {
		if (this.#start && end < this.#start) {
			throw new Error("End date cannot be before start date");
		}

		this.#end = end;
		return this;
	}

	public setName(name: string): this {
		this.#name = name;
		return this;
	}

	public setDescription(description: string): this {
		this.#description = description;
		return this;
	}

	public build(): Booking {
		if (!this.#building) {
			throw new Error("Building is required");
		}

		if (!this.#room) {
			throw new Error("Room is required");
		}

		if (!this.#start) {
			throw new Error("Start date is required");
		}

		if (!this.#end) {
			throw new Error("End date is required");
		}

		return {
			building: this.#building,
			room: this.#room,
			start: this.#start,
			end: this.#end,
			name: this.#name,
			description: this.#description,
		};
	}
}
