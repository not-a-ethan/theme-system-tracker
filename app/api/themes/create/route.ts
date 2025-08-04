import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";

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

    console.log(query)

    return NextResponse.json(
        { status: 200 }
    )
}