"use client";
import { useIsClient } from "usehooks-ts";
import { type ReactNode } from "react";

type ClientOnlyProps = {
    children: ReactNode;
};

export function ClientOnly({ children }: ClientOnlyProps) {
    const isClient = useIsClient();
    return isClient ? <>{children}</> : null;
}
