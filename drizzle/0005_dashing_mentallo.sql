ALTER TABLE "reservations" ADD COLUMN "invite_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_invite_code_unique" UNIQUE("invite_code");