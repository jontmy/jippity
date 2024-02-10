import type { PropsWithChildren } from "react";
import { BackButton } from "@/components/shell/back-button";

export function Main(props: PropsWithChildren) {
    return (
        <main className="fixed left-0 top-0 flex h-screen w-screen flex-col items-start overflow-auto p-6 pt-[80px] dark:bg-zinc-800 sm:left-72 sm:w-[calc(100vw-theme(width.72))] sm:p-8 sm:pt-[88px] xl:items-center">
            <BackButton />
            {props.children}
        </main>
    );
}
