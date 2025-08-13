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
    const fieldOne = await body["fieldOne"];
    const fieldTwo = await body["fieldTwo"];
    const fieldThree = await body["fieldThree"];
    const fieldFour = await body["fieldFour"];
    const metaData = await body["metaData"];

    if (!fieldOne) {
        return NextResponse.json(
            {
                error: "fieldOne is null"
            },
            { status: 400 }
        );
    };

    if (fieldOne.trim() === "") {
        return NextResponse.json(
            {
                error: "fieldOne is empty"
            },
            { status: 400 }
        );
    };

    if (!fieldTwo) {
        return NextResponse.json(
            {
                error: "fieldTwo is null"
            },
            { status: 400 }
        );
    };

    if (fieldTwo.trim() === "") {
        return NextResponse.json(
            {
                error: "fieldTwo is empty"
            },
            { status: 400 }
        );
    };

    if (!fieldThree) {
        return NextResponse.json(
            {
                error: "fieldThree is null"
            },
            { status: 400 }
        );
    };

    if (fieldThree.trim() === "") {
        return NextResponse.json(
            {
                error: "fieldThree is empty"
            },
            { status: 400 }
        );
    };

    if (!fieldFour) {
        return NextResponse.json(
            {
                error: "fieldFour is null"
            },
            { status: 400 }
        );
    };

    if (fieldFour.trim() === "") {
        return NextResponse.json(
            {
                error: "fieldFour is empty"
            },
            { status: 400 }
        );
    };

    const time = Math.floor(Date.now() / 1000);

    const query = await sql`INSERT INTO journal ("themeId", "githubId", "dateTime", "fieldOne", "fieldTwo", "fieldThree", "filedFour", "metaData") VALUES (${activeThemeId}, ${githubID}, ${time}, ${fieldOne}, ${fieldTwo}, ${fieldThree}, ${fieldFour}, ${metaData});`;

    return NextResponse.json(
        { status: 200 }
    );
};