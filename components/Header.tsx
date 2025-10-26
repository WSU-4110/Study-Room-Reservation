"use client";

import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth/client";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
	const headerRef = useRef<HTMLElement>(null);
	const { data } = authClient.useSession();

	useEffect(() => {
		function handleScroll() {
			if (!headerRef.current) return;

			if (window.scrollY > 300) {
				headerRef.current.classList.add("scrolled");
			} else {
				headerRef.current.classList.remove("scrolled");
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="fixed inset-x-0 top-3 z-50 px-4" ref={headerRef}>
			<div className="bg-card mx-auto max-w-5xl rounded-2xl border p-3 shadow-xs">
				<div className="flex items-center justify-between">
					<Link className="flex items-center gap-x-2" href="/">
						<div className="bg-primary flex size-8 items-center justify-center rounded-md">
							<BookOpen className="text-primary-foreground size-4" />
						</div>

						<h1 className="text-foreground text-xl font-semibold">
							Book-a-Nook
						</h1>
					</Link>

					<div className="flex items-center gap-x-2">
						{data?.user ? (
							<DropdownMenu>
								<DropdownMenuTrigger className="group flex items-center">
									<span className="text-sm font-medium">
										{data.user.name}
									</span>
									<ChevronRight className="ml-1 size-4 transition-[rotate] group-data-[state=open]:rotate-90" />
								</DropdownMenuTrigger>

								<DropdownMenuContent>
									<DropdownMenuLabel>
										{data.user.email}
									</DropdownMenuLabel>

									<DropdownMenuItem>
										<Link href="/reservations">
											My Reservations
										</Link>
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									<DropdownMenuItem
										onClick={() => authClient.signOut()}
									>
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button
								onClick={() => {
									authClient.signIn.social({
										provider: "microsoft",
									});
								}}
							>
								Sign In
							</Button>
						)}

						<div className="bg-border h-6 w-px"></div>

						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	);
}
