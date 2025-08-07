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

    const githubID = Number(token.sub);

    const themes = await sql`SELECT * FROM themes WHERE owner=${githubID};`;

    const activeThemeId = await getActiveThemeID(githubID);

    return NextResponse.json(
        {
            "themes": themes,
            "activeTheme": activeThemeId
        },
        { status: 200 }
    );
};