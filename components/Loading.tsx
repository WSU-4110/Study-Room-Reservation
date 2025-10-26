import { LoaderCircle } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex h-full grow flex-col items-center justify-center py-20">
			<LoaderCircle className="size-12 animate-spin" />
			<span className="mt-2 text-2xl font-semibold">Loading...</span>
		</div>
	);
}
