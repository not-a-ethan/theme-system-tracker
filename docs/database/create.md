The database is a PostgreSQL databse. Use the following statments to create the tables:

```sql
CREATE TABLE "users" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq"),
  "githubID" integer NOT NULL UNIQUE
);
ALTER TABLE "users" ADD COLUMN "active_theme_id" integer

CREATE TABLE "themes" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "themes_id_seq"),
  "names" text[],
  "description" text[],
  "owner" integer
);

CREATE TABLE "habits" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "habits_id_seq"),
  "ownerGithubId" integer NOT NULL,
  "parentTheme" integer NOT NULL,
  "text" varchar NOT NULL
);

CREATE TABLE "journal" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "journal_id_seq"),
  "themeId" integer NOT NULL,
  "githubId" integer NOT NULL,
  "dateTime" bigint NOT NULL,
  "fieldOne" text NOT NULL,
  "fieldTwo" text NOT NULL,
  "fieldThree" text NOT NULL,
  "filedFour" text NOT NULL,
  "metaData" text,
);
```