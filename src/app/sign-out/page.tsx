import { signOut } from "@/app/sign-out/actions";

export default function Page() {
    return (
        <form action={signOut}>
            <button>Sign out</button>
        </form>
    );
}
