'use client';

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function DashBoard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <p>Loading...</p>
        );
    };

    if (status === "unauthenticated") {
        router.replace("/api/auth/signin");
        return (
            <p>403 | Login in to see this page</p>
        );
    };

    return (
        <>
            <h1>Dashboard <p>Current Theme: [THIS IS THE THEME]</p></h1>
        </>
    );
};