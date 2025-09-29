import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<section className="relative flex h-full items-center justify-center">
			<div className="bg-muted absolute inset-2 rounded-4xl ring-1 ring-black/5"></div>

			<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-foreground text-5xl font-bold tracking-tight text-balance sm:text-7xl">
						Find Your Perfect
						<span className="block">Study Space</span>
					</h1>

					<p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg/7">
						Reserve quiet study rooms, collaborative spaces, and
						private booths across campus. Book instantly, study
						efficiently, and never worry about finding a place to
						focus again.
					</p>

					<div className="mt-10 flex items-center justify-center gap-4">
						<Button className="gap-2" size="lg" asChild>
							<Link href="/book">
								Book a Room
								<ArrowRight className="size-4" />
							</Link>
						</Button>

						<Button size="lg" variant="outline" asChild>
							<Link href="/buildings">View Buildings</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
