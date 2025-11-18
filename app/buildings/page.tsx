import Image from "next/image";
import stemExt from "@/public/stem-ext.jpg";
import uglExt from "@/public/ugl-ext.jpg";

export default function BuildingsPage() {
	return (
		<div className="mx-auto grid max-w-7xl gap-12 px-4 pt-28 pb-14 md:gap-16">
			<section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
				<div className="order-2 md:order-1">
					<Image
						src={stemExt}
						alt="STEM Center Exterior"
						className="aspect-video size-full rounded-lg object-cover shadow-md"
					/>
				</div>

				<div className="order-1 md:order-2">
					<h2 className="mt-3 mb-2 text-4xl font-bold text-balance md:text-5xl">
						STEM Center
					</h2>

					<span className="text-muted-foreground mb-4 inline-block">
						5048 Gullen Mall, Detroit, MI 48202
					</span>

					<p className="text-lg leading-relaxed">
						The newly renovated STEM Innovation Learning Center
						features nearly 100,000 square feet of flexible
						classrooms, instructional labs, a maker space, and a 3D
						printing lab, as well as space that serves as a hub for
						K-12 outreach programming.
					</p>
				</div>
			</section>

			<section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
				<div className="order-1">
					<h2 className="mt-3 mb-2 text-4xl font-bold text-balance md:text-5xl">
						Undergraduate Library
					</h2>

					<span className="text-muted-foreground mb-4 inline-block">
						5150 Anthony Wayne, Detroit, MI 48202
					</span>

					<p className="text-lg leading-relaxed">
						The David Adamany Undergraduate Library (UGL) provides
						access to hundreds of computers, wireless internet,
						spaces for collaborative or silent study and course and
						textbook reserves. The library is also home to the
						Warrior Writing, Research and technology (WRT) Zone, the
						Honors College, the Office of Community Engagement, the
						Academic Success Center, Advising, Student Disability
						Services and the Office of Military and Veterans
						Academic Excellence.
					</p>
				</div>

				<div className="order-2">
					<Image
						src={uglExt}
						alt="Undergraduate Library Exterior"
						className="aspect-video size-full rounded-lg object-cover shadow-md"
					/>
				</div>
			</section>
		</div>
	);
}
