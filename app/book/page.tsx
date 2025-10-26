"use client";

import type { BookingStep } from "@/stores/booking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { useBooking } from "@/stores/booking";
import Confirmation from "./Confirmation";
import Details from "./Details";
import Location from "./Location";

interface Step {
	title: string;
	value: BookingStep;
	component: React.ReactNode;
}

const steps: Step[] = [
	{
		title: "Location",
		value: "location",
		component: <Location />,
	},
	{
		title: "Details",
		value: "details",
		component: <Details />,
	},
	{
		title: "Confirmation",
		value: "confirmation",
		component: <Confirmation />,
	},
];

export default function Book() {
	const router = useRouter();
	const booking = useBooking();
	const { trigger } = useSWRMutation("/api/reservations", reserve);
	const { data: auth } = authClient.useSession();

	function isComplete(step: BookingStep) {
		const currentIdx = steps.findIndex((s) => s.value === booking.step);
		const targetIdx = steps.findIndex((s) => s.value === step);

		return currentIdx > targetIdx;
	}

	function getVariant(step: BookingStep) {
		if (step === booking.step || isComplete(step)) {
			return "default";
		}

		return "outline";
	}

	function canGoNext(step: BookingStep) {
		if (step === "location") {
			return booking.building !== null && booking.room !== null;
		}

		if (step === "details") {
			return (
				booking.start !== null &&
				booking.end !== null &&
				booking.name !== null
			);
		}

		return false;
	}

	async function reserve(url: string) {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userId: auth?.user.id,
				roomId: booking.room?.id,
				name: booking.name,
				description: booking.description,
				startTime: booking.start,
				endTime: booking.end,
			}),
		});

		return response.json();
	}

	async function submit() {
		await trigger();
		// TODO: Redirect to /reservations page once implemented
		router.push("/");
		booking.reset();

		toast("Reservation created");
	}

	return (
		<div className="mx-auto max-w-7xl px-4 pt-28 pb-12">
			<Tabs
				value={booking.step}
				onValueChange={(value) => booking.setStep(value as BookingStep)}
			>
				<TabsList
					className="flex w-full items-center justify-between"
					loop={false}
				>
					{steps.map((step, i) => (
						<Fragment key={step.value}>
							{i > 0 && (
								<div className="bg-border h-px grow"></div>
							)}

							<div className="flex items-center">
								<TabsTrigger value={step.value} asChild>
									<Button
										type="button"
										size="icon"
										disabled={
											!isComplete(step.value) &&
											step.value !== booking.step
										}
										variant={getVariant(step.value)}
									>
										{isComplete(step.value) ? (
											<Check className="size-4" />
										) : (
											i + 1
										)}
									</Button>
								</TabsTrigger>

								<span className="bg-background px-2 font-medium">
									{step.title}
								</span>
							</div>
						</Fragment>
					))}
				</TabsList>

				{steps.map((step, i) => (
					<TabsContent
						className="mt-10"
						key={step.value}
						value={step.value}
					>
						{step.component}

						<div className="mt-12 flex w-full items-center justify-end gap-2">
							{i > 0 && (
								<Button
									className="w-16"
									type="button"
									variant="outline"
									aria-label="Previous step"
									onClick={() => {
										booking.setStep(steps[i - 1].value);
									}}
								>
									<MoveLeft />
								</Button>
							)}

							{i < steps.length - 1 ? (
								<Button
									className="w-16"
									type="button"
									variant="outline"
									disabled={!canGoNext(step.value)}
									aria-label="Next step"
									onClick={() => {
										booking.setStep(steps[i + 1].value);
									}}
								>
									<MoveRight />
								</Button>
							) : (
								<Button
									className="w-16"
									type="submit"
									aria-label="Submit"
									onClick={submit}
								>
									<Check />
								</Button>
							)}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
