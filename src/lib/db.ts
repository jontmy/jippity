import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/env";
import { mysqlTableCreator } from "drizzle-orm/mysql-core";

const connection = connect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);

export const mysqlTable = mysqlTableCreator((name) => `jippity_${name}`);
