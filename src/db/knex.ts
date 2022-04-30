/* tslint:disable await-promise */
import Knex from "knex";
import Debug from "debug";
const debug = Debug("backend:db:knex");

import { Database } from "../config";

/**
 * Initialize a new Postgres provider
 */
const connection = null;
async function create() {
  const knex = Knex({
    client: "pg",
    connection: {
      user: Database.user,
      password: Database.password,
      host: Database.host,
      port: Database.port,
      database: Database.database,
    },
    pool: {
      min: Database.poolMin,
      max: Database.poolMax,
      idleTimeoutMillis: Database.poolIdle,
    },
    acquireConnectionTimeout: 2000,
  });

  // Verify the connection before proceeding
  try {
    await knex.raw("SELECT now()");
    this.connection = knex;
    return knex;
  } catch (error) {
    debug("error---POSTGRES---KNEX-->");
    debug(error);
    throw new Error(
      "Unable to connect to Postgres via Knex. Ensure a valid connection."
    );
  }
}

export default { connection, create };
