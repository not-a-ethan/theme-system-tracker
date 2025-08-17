import { sql } from "@/app/postgresql/server";

export async function deCompleteHabit(githubID: number, habitId: number, date: string) {
    const habitOwner = await sql`SELECT * FROM habits WHERE habits."id"=${habitId} AND habits."ownerGithubId"=${githubID};`;

    if (habitOwner.length === 0) {
        return [
            {
                "error": "You do not own that habit"
            },
            { status: 403 }
        ];
    };

    const query = await sql`DELETE FROM "habitHistory" WHERE "habitId"=${habitId} AND "date"=${date};`

    return [
        {
            status: 200
        }
    ];
};