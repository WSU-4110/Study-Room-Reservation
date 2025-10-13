import { db } from "../db";
import { rooms, reservations } from "../db/schema";
import { eq, and, lt, gt } from "drizzle-orm";


export abstract class ReservationHandler {
  next: ReservationHandler | null = null;

  setNext(handler: ReservationHandler) {
    this.next = handler;
    return handler;
  }

  async handle(request: any) {
    if (this.next) return this.next.handle(request);
    return { success: true };
  }
}


export class RoomExistsHandler extends ReservationHandler {
  async handle(request: any) {
    const room = await db.query.rooms.findFirst({
      where: eq(rooms.id, request.roomId),
    });
    if (!room) return { success: false, error: "Room not found" };
    return super.handle(request);
  }
}


export class AvailabilityHandler extends ReservationHandler {
  async handle(request: any) {
    const overlap = await db.query.reservations.findFirst({
      where: and(
        eq(reservations.roomId, request.roomId),
        lt(reservations.startTime, request.endTime),
        gt(reservations.endTime, request.startTime)
      ),
    });
    if (overlap) return { success: false, error: "Room already reserved" };
    return super.handle(request);
  }
}


export class WeeklyLimitHandler extends ReservationHandler {
  async handle(request: any) {
    const userReservations = await db.query.reservations.findMany({
      where: eq(reservations.userId, request.userId),
    });
    if (userReservations.length >= 2)
      return { success: false, error: "Weekly limit reached" };
    return super.handle(request);
  }
}
