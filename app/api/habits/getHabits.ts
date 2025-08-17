import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";
import { getActiveThemeID } from "../account/themes/getActiveTheme";
import { completedHabits } from "./completedHabits";

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
    const activeThemeId: number = Number(await getActiveThemeID(githubID));

    const habits = await sql`SELECT * FROM habits WHERE habits."ownerGithubId"=${githubID} AND habits."parentTheme"=${activeThemeId}`;

    const searchParams = req.nextUrl.searchParams;
    const date: string | null = searchParams.get("date");

    if (date) {
        const completedHabitIds = await completedHabits(date, githubID, activeThemeId);

        return NextResponse.json(
            {
                "habits": habits,
                "completed": completedHabitIds
            },
            { status: 200 }
        )
    }

    return NextResponse.json(
        {
            "habits": habits,
        },
        { status: 200 }
    )
}