import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex h-full w-full max-w-prose flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-16" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    );
}
