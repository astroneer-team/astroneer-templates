import { RouteHandler } from '@astroneer/core';

/**
 * In Astroneer, you can define your routes in separate files.
 * This is a simple example of a route that responds with a greeting.
 *
 * To handle methods other than GET, you can export functions named after the HTTP method. (UPPERCASE only, okay?)
 *
 * You can also export a middlewares array to apply middleware to the route.
 * Please refer to the https://astroneer.dev/docs/route-handlers#middlewares documentation for more information.
 */
export const GET: RouteHandler = async (_, res) => {
  res.send('Hello, from Astroneer! 🚀');
};
