import { sql } from "@/app/postgresql/server";
import { accountExists } from "./accountExists";

export async function createAccount(externalID: number): Promise<boolean> {
    if (await accountExists(externalID)) {
        return false;
    }

    const query = await sql`INSERT INTO users ("githubID") VALUES (${externalID});`;

    return await accountExists(externalID);
}