import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";

export async function getActiveThemeID(githubID: number) {
    const activeQuery = await sql`SELECT * FROM users WHERE users."githubID"=${githubID}`;

    const themeID: number|null = activeQuery[0]["active_theme_id"];

    return themeID;
}

export async function GET(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json(
            {
                "message": "Not authenticated"
            },
            { status: 403 }
        );
    };

    const githubID = Number(token.sub);

    const themeID: number|null = await getActiveThemeID(githubID);

    if (themeID != null) {
        return NextResponse.json(
            {
                "activeTheme": themeID
            },
            { status: 200 }
        );
    }
    
    return NextResponse.json(
        {
            "activeTheme": -1
        },
        { status: 200 }
    );
};