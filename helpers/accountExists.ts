import { sql } from "@/app/postgresql/server";

export async function accountExists(externalID: number): Promise<boolean> {
    const query = await sql`SELECT * FROM users WHERE "githubID"=${externalID}`;

    if (query.length > 0) {
        return true;
    }

    return false;
}