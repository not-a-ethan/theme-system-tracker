import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";
import { getActiveThemeID } from "../account/themes/getActiveTheme";

export async function POST(req: NextRequest) {
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
    const activeThemeId = await getActiveThemeID(githubID);

    const body = await req.json();
    const text = await body["text"];

    if (!text) {
        return NextResponse.json(
            {
                "error": "No habit text included"
            },
            { status: 400 }
        );
    };

    const query = await sql`INSERT INTO habits ("ownerGithubId", "parentTheme", "text") VALUES (${githubID}, ${activeThemeId}, ${text});`;

    return NextResponse.json(
        { status: 200 }
    );
};