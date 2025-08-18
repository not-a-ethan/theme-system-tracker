import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { sql } from "@/app/postgresql/server";

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

    const githubID: number = Number(token.sub);

    const searchParams = req.nextUrl.searchParams;
    const dateInput = new Date(searchParams.get("date"));

    const results = await sql`SELECT * FROM journal WHERE journal."githubId" = ${githubID}`;

    let formatted = `${dateInput.getFullYear()}-${dateInput.getMonth() + 1}-${dateInput.getDate()}`.split("-");

    if (formatted[1].length === 1) {
        formatted[1] = `0${formatted[1]}`;
    };

    if (formatted[2].length === 1) {
        formatted[2] = `0${formatted[2]}`;
    };

    formatted = formatted.join("-");

    for (let i = 0; i < results.length; i++) {
        const unixEpoch = results[i]["dateTime"];
        const date = new Date(unixEpoch * 1000);
        let formattedDbDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`.split("-");

        if (formattedDbDate[1].length === 1) {
            formattedDbDate[1] = `0${formattedDbDate[1]}`;
        };

        if (formattedDbDate[2].length === 1) {
            formattedDbDate[2] = `0${formattedDbDate[2]}`;
        };

        formattedDbDate = formattedDbDate.join("-");
        
        if (formatted == formattedDbDate) {
            return NextResponse.json(
                {
                    data: results[i]
                },
                { status: 200 }
            );
        };
    };

    return NextResponse.json(
        {
            "error": "Journal entry not found for that day"
        },
        { status: 404 }
    );
};