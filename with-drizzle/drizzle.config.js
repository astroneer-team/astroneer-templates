/**
 * Hi, astroneer! 👋
 *
 * This is a Drizzle config file. You can use it to configure Drizzle.
 *
 * Drizzle is a headless, lightweight and top-notch performance TypeScript ORM for Node.js.
 * You can learn more about Drizzle at https://orm.drizzle.team/
 *
 * In this file, you can define your Drizzle configuration, such as database connection, out and schema directories, and more.
 *
 * We have already created a basic configuration for you. You can customize it according to your needs.
 * Just make sure to keep the drizzle schemas inside your src directory.
 */
import { defineConfig } from 'drizzle-kit';

module.exports = defineConfig({
  dialect: 'postgresql',
  out: 'drizzle',
  schema: 'src/database/schema',
  dbCredentials: {
    /**
     * You can define your database credentials here.
     * Note that you can also use environment variables in a `.env` file.
     *
     * After defining your credentials and schemas, you can run the following command to generate your models:
     * -  npx drizzle-kit push
     */
  },
  verbose: true,
  strict: true,
});
