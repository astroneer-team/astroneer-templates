/**
 * For this example, we are using `postgres` as the database driver.
 * Please refer to the https://orm.drizzle.team/docs to see the list of supported database drivers and how to use them.
 */

import { Logger } from '@astroneer/common';
import { drizzle as drizzleORM } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres({
  // Please replace the following with your database connection string or use the environment variable
});

export const drizzle = drizzleORM(queryClient, {
  logger: {
    logQuery(query, params) {
      // This is useful for debugging purposes, will only log when using "astroneer dev"
      process.env.NODE_ENV === 'development' &&
        Logger.debug(`${query} ${JSON.stringify(params, null, 2)}`);
    },
  },
});
