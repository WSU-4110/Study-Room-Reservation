import type { User } from "better-auth";
import type { FullReservation } from "@/lib/db/schema";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
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
	const searchParams = useSearchParams();
	const code = searchParams.get("invite");

	const { data, isLoading } = useSWR<FullReservation & { user: User }>(
		code ? `/api/reservations?invite=${code}` : null,
		fetcher,
	);

	if (isLoading) return;

	if (!data || "message" in data) {
		toast.error("Invalid invite code.", { richColors: true });
		return;
	}

	return (
		<AlertDialog open>
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
						<AlertDialogAction>Accept</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
