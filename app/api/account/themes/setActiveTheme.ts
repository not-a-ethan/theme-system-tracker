import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";

export async function setActiveTheme(githubID: number, id: number) {
    if (!id || id <= 0) {
        return [
            { 
                "error": "You need a valid theme ID number"
            },
            { status: 400 }
        ];
    };

    const ownerQuery = await sql`SELECT * FROM themes WHERE owner=${githubID} AND id=${id};`

    if (ownerQuery.length == 0) {
        return [
            {
                "error": "You cant delete somebody elses project"
            },
            { status: 403 }
        ];
    };

    const activeQuery = await sql`UPDATE users SET active_theme_id=${id} WHERE users."githubID"=${githubID};`;

    return [{}, 200]
}

export async function PUT(req: NextRequest) {
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

    const id = body["themeID"];

    const res = await setActiveTheme(id, githubID);

    return NextResponse.json(
        res[0],
        res[1]
    );
};