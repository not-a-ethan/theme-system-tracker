import { type NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { accountExists } from "@/helpers/accountExists";
import { createAccount } from "@/helpers/createAccount";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			const externalID = Number(account?.providerAccountId);

			if (await accountExists(externalID)) {
				return true;
			}
			
			return createAccount(externalID)
		},
	}
}