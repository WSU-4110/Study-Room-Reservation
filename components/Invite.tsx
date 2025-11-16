"use client";

import type { User } from "better-auth";
import type { FullReservation } from "@/lib/db/schema";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { authClient } from "@/lib/auth/client";
import { fetcher } from "@/lib/utils";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "./ui/alert-dialog";

export default function Invite() {
	const [dialogOpen, setDialogOpen] = useState(true);
	const { data: auth } = authClient.useSession();

	const searchParams = useSearchParams();
	const code = searchParams.get("invite");

	const { data, isLoading } = useSWR<FullReservation & { user: User }>(
		code ? `/api/reservations?invite=${code}` : null,
		fetcher,
	);

	const { trigger } = useSWRMutation(
		`/api/reservations/${data?.id}`,
		async (url: string, { arg }: { arg: { attendee: string } }) => {
			const res = await fetch(url, {
				method: "PATCH",
				body: JSON.stringify(arg),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message);
			}
		},
	);

	if (isLoading || !data) return;

	if ((code && !data) || (data && "message" in data)) {
		toast.error("Invalid invite code");
		return;
	}

	if (data?.status === "cancelled") {
		toast.error("This reservation was cancelled");
		return;
	}

	async function acceptInvite() {
		if (!auth) {
			toast.error("You must be logged in to accept an invite");
			return;
		}

		if (data?.user.id === auth.user.id) {
			toast.error("You are the owner of this reservation");
			return;
		}

		if (data?.attendees.some((a) => a.user.id === auth.user.id)) {
			toast.error("You have already accepted this invite");
			return;
		}

		try {
			await trigger({ attendee: auth.user.id });
			toast.success("Invite accepted");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	return (
		<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Accept invite?</AlertDialogTitle>

					<AlertDialogDescription>
						{data.user.name} has invited you to join {data.name} on{" "}
						{dayjs(data.startTime).format("MMMM D")} from{" "}
						{dayjs(data.startTime).format("h:mm A")} to{" "}
						{dayjs(data.endTime).format("h:mm A")}. Do you want to
						accept?
					</AlertDialogDescription>

					<AlertDialogFooter>
						<AlertDialogCancel>Decline</AlertDialogCancel>
						<AlertDialogAction onClick={acceptInvite}>
							Accept
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
