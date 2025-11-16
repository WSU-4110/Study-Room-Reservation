CREATE TABLE "reservations_to_attendees" (
	"reservation_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "reservations_to_attendees_reservation_id_user_id_pk" PRIMARY KEY("reservation_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "reservations_to_attendees" ADD CONSTRAINT "reservations_to_attendees_reservation_id_reservations_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations_to_attendees" ADD CONSTRAINT "reservations_to_attendees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;