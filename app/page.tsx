"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Invite from "@/components/Invite";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { authClient } from "@/lib/auth/client";

export default function Home() {
	const { data } = authClient.useSession();

	return (
		<section className="relative flex h-full items-center justify-center">
			<Invite />

			<div className="bg-muted absolute inset-2 rounded-4xl ring-1 ring-black/5"></div>

			<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<div className="flex justify-center mb-6">
						<BookOpenIcon className="size-20 text-brand dark:text-white drop-shadow-sm" />
					</div>

					<h1 className="text-foreground text-5xl font-bold tracking-tight text-balance sm:text-6xl">
						Find Your Perfect
						<span className="block">Study Space</span>
					</h1>

					<p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg/7">
						Reserve quiet study rooms, collaborative spaces, and
						private booths across campus. Book instantly, study
						efficiently, and never worry about finding a place to
						focus again.
					</p>

					<div className="mt-10 flex items-center justify-center gap-6">
						{data ? (
							<Button size="lg" asChild className="rounded-full px-8 py-6 bg-brand text-white hover:bg-brand/90 shadow-sm">
								<Link href="/book">
									Book a Room
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						) : (
							<Button
								size="lg"
								className="rounded-full px-8 py-6 bg-brand text-white hover:bg-brand/90 shadow-sm"
								onClick={() => {
									authClient.signIn.social({
										provider: "microsoft",
										callbackURL: `${location.origin}/book`,
									});
								}}
							>
								Book a Room
								<ArrowRight className="size-4" />
							</Button>
						)}

						<Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6 border-gray-300 bg-white/80 text-foreground hover:bg-white">
							<Link href="/buildings">View Buildings</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
