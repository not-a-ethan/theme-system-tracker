import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";
import { getActiveThemeID } from "../account/themes/getActiveTheme";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json(
            {
                "message": "Not authenticated"
            },
            { status: 403 }
        )
    }

    const githubID: number = Number(token.sub);
    const activeThemeId = await getActiveThemeID(githubID);

    const habits = await sql`SELECT * FROM habits WHERE habits."ownerGithubId"=${githubID} AND habits."parentTheme"=${activeThemeId}`;

    return NextResponse.json(
        {
            "habits": habits
        },
        { status: 200 }
    )
}