import { ModeToggle } from "@/components/mode-toggle";

export default function Default() {
    return (
        <>
            <p className="text-2xl font-black tracking-tight text-white">Jippity.</p>
            <p className="text-sm text-zinc-50">Chat history coming soon!</p>
            <div className="grow" />
            <ModeToggle className="border-zinc-700 bg-zinc-800 text-zinc-50" />
        </>
    );
}
