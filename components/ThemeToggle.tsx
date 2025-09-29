import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setMounted(true);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [resolvedTheme, setTheme]);

	return mounted ? (
		<Button size="icon" onClick={toggleTheme}>
			{resolvedTheme === "dark" ? <Moon /> : <Sun />}
		</Button>
	) : null;
}
