import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";
import { GET, getThemes } from "./get";
import { getActiveThemeID } from "../account/themes/getActiveTheme";
import { setActiveTheme } from "../account/themes/setActiveTheme";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    
    const name: string = body["name"];
    const descirption: string = body["description"];

    if (!name || name.trim() == "") {
        return NextResponse.json(
            {
                "error": "Themes need a name"
            },
            { status: 400 }
        )
    }

    if (!descirption || descirption.trim() == "") {
        return NextResponse.json(
            {
                "error": "Themes need a description"
            },
            { status: 400 }
        )
    }

    const query = await sql`INSERT INTO themes (names, description, owner) VALUES (${name}, ${descirption}, ${githubID});`;

    const activeTheme = await getActiveThemeID(githubID);

    
    if (activeTheme == null) {
        const themes = await getThemes(githubID);

        const themeId = themes[0][0].id;

        await setActiveTheme(githubID, themeId);
    }

    return NextResponse.json(
        { status: 200 }
    )
}