The database is a PostgreSQL databse. Use the following statments to create the tables:

```sql
CREATE TABLE "users" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq"),
  "githubID" integer NOT NULL UNIQUE
);

CREATE TABLE "themes" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "themes_id_seq"),
  "names" text[],
  "description" text[],
  "owner" integer
);
```