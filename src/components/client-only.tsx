"use client";
import { useIsClient } from "usehooks-ts";
import { type ReactNode } from "react";

type ClientOnlyProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

export function ClientOnly(props: ClientOnlyProps) {
    const isClient = useIsClient();
    return isClient ? <>{props.children}</> : props.fallback ?? null;
}
