import { Logger } from '@astroneer/common';
import { Astroneer } from '@astroneer/core';
import { createServer, Server } from 'http';
import { parse } from 'url';

/**
 * Customize it to your needs, just make sure to prepare the app before starting launching rockets around the galaxy!
 */
export default async function startServer(): Promise<Server> {
  const port = process.env.PORT || 3000;
  const hostname = process.env.HOST || 'localhost';
  const app = await Astroneer.prepare();
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);
    app.handle(req, res, parsedUrl);
  });

  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(Number(port), hostname, () => {
    Logger.log(`> Listening on http://${hostname}:${port}`);
  });

  return server;
}
