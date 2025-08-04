import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";

export async function DELETE(req: NextRequest) {
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
    
    const id: number = Number(body["themeID"]);

    if (!id || id <= 0) {
        return NextResponse.json(
            { 
                "error": "You need a valid theme ID number"
            },
            { status: 400 }
        );
    };

    const ownerQuery = await sql`SELECT * FROM themes WHERE owner=${githubID} AND id=${id};`

    if (ownerQuery.length == 0) {
        return NextResponse.json(
            {
                "error": "You cant delete somebody elses project"
            },
            { status: 403 }
        );
    };

    const query = await sql`DELETE FROM themes WHERE id=${id};`;

    return NextResponse.json(
        { status: 200 }
    );
}