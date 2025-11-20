import * as React from "react"
import { cn } from "@/lib/utils";

export function IconWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-md bg-[#0BB5A7] dark:bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}

