import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"

import { completeHabit } from "./completeHabit";
import { deCompleteHabit } from "./deCompleteHabit";

export async function PUT(req: NextRequest) {
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

    const body = await req.json();
    const addHistory: boolean = await body["addHistory"];
    const habitId: number = await body["habitId"];
    const date: string = await body["date"];

    if (addHistory) {
        const res: object[] = await completeHabit(githubID, habitId, date);

        if (res.length === 1) {
            return NextResponse.json(
                res[0]
            );
        }

        return NextResponse.json(
            res[0],
            res[1]
        );
    } else {
        const res: object[] = await deCompleteHabit(githubID, habitId, date);

        if (res.length === 1) {
            return NextResponse.json(
                res[0]
            );
        }

        return NextResponse.json(
            res[0],
            res[1]
        );
    };
}