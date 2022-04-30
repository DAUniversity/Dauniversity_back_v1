/* eslint-disable @typescript-eslint/no-namespace */
import parseDbUrl from "parse-database-url";
import dotenv from "dotenv";

dotenv.config();

export namespace Database {
  export const schema = "public";
  export const url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  export const config = parseDbUrl(url);
  export const {
    database,
    user,
    name,
    username,
    password,
    hostname,
    host,
    port,
  } = config;
  export const poolMin = Number(process.env.DB_POOL_MIN || "0");
  export const poolMax = Number(process.env.DB_POOL_MAX || "10");
  export const poolIdle = Number(process.env.DB_POOL_IDLE || "10000");
}

export namespace Server {
  export const port = Number(process.env.PORT || "8000");
  export const bodyLimit = "100kb";
  export const corsHeaders = ["Link"];
  export const isDev = process.env.NODE_ENV === "development";
}

export namespace Knex {
  export const config = {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || Database.host,
      database: process.env.DB_NAME || Database.database,
      user: process.env.DB_USER || Database.user,
      password: process.env.DB_PASSWORD || Database.password,
      port: process.env.DB_PORT || Database.port,
    },
    pool: {
      min: process.env.DB_POOL_MIN,
      max: process.env.DB_POOL_MAX,
      idle: process.env.DB_POOL_IDLE,
    },
    migrations: {
      tableName: "KnexMigrations",
    },
  };
}

export namespace Redis {
  export const url = process.env.REDIS_URL;
}

export namespace JwtConfig {
  export const secret = process.env.JWT_SECRET;
  export const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN;
  export const tokenLife = process.env.JWT_TOKEN_LIFE;
  export const refreshTokenLife = process.env.JWT_REFRESH_TOKEN_LIFE;
}

export default { Database, Server, Knex, Redis, JwtConfig };
