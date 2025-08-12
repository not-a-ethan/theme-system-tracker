import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";

export async function PUT(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json(
            {
                "message": "Not authenticated"
            },
            { status: 403 }
        );
    };

    const githubID: number = Number(token.sub);

    const body = await req.json();
    const habitId = body["id"];
    const newText = body["newText"];

    if (!habitId) {
        return NextResponse.json(
            {
                "error": "habitId is null"
            },
            { status: 400 }
        );
    };

    if (!newText) {
        return NextResponse.json(
            {
                "error": "Habit text is null"
            },
            { status: 400 }
        );
    };

    const ownerQuery = await sql`SELECT * FROM habits WHERE habits."ownerGithubId"=${githubID} AND id=${habitId};`

    if (ownerQuery.length == 0) {
        return NextResponse.json(
            {
                "error": "You cant edit somebody elses project"
            },
            { status: 403 }
        );
    };

    const query = await sql`UPDATE habits SET text=${newText} WHERE id=${habitId};`;

    return NextResponse.json(
        { status: 200 }
    );
}