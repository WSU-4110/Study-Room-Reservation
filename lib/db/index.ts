import process from "node:process";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// 如果没有数据库URL，创建一个空的mock连接用于构建
const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db';

const sql = postgres(databaseUrl);
export const db = drizzle(sql);
