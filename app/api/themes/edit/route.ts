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
        )
    }

    const githubID = Number(token.sub);
    const body = await req.json();
    
    const id: number = Number(body["themeID"]);
    const name: string = body["name"];
    const descirption: string = body["description"];

    if (!id || id <= 0) {
        return NextResponse.json(
            { 
                "error": "You need a valid theme ID number"
            },
            { status: 400 }
        );
    };

    if (!name || name.trim() == "") {
        return NextResponse.json(
            {
                "error": "Themes need a name"
            },
            { status: 400 }
        );
    };

    if (!descirption || descirption.trim() == "") {
        return NextResponse.json(
            {
                "error": "Themes need a description"
            },
            { status: 400 }
        );
    };

    const ownerQuery = await sql`SELECT * FROM themes WHERE owner=${githubID} AND id=${id};`

    if (ownerQuery.length == 0) {
        return NextResponse.json(
            {
                "error": "You cant edit somebody elses project"
            },
            { status: 403 }
        );
    };

    const query = await sql`UPDATE themes SET names=${name}, description=${descirption} WHERE id=${id};`;

    return NextResponse.json(
        { status: 200 }
    );
}