"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>Not logged in</p>;
    }

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/sign-in");
    };

    return (
        <div>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}