import { sql } from "@/app/postgresql/server";

export async function completedHabits(date: string, ghId: number, activeThemeId: number) {
    const results = await sql`SELECT * FROM "habitHistory" WHERE date=${date} AND "habitHistory"."habitId" IN (SELECT id FROM habits WHERE habits."ownerGithubId"=${ghId} AND habits."parentTheme"=${activeThemeId})`;

    const habitId: number[] = [];

    for (let i = 0; i < results.length; i++) {
        habitId.push(results[i]["habitId"]);
    }

    return habitId;
};