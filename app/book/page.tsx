"use client";

import type { BookingStep } from "@/stores/booking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/stores/booking";
import Confirmation from "./Confirmation";
import DateTime from "./DateTime";
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
		title: "Date and Time",
		value: "date-time",
		component: <DateTime />,
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
	const booking = useBooking();

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

		if (step === "date-time") {
			return booking.start !== null && booking.end !== null;
		}

		if (step === "details") {
			return booking.title !== null && booking.description !== null;
		}

		return false;
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
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
											i > 0 && !canGoNext(step.value)
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
