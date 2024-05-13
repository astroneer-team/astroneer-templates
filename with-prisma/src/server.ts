import { Logger } from '@astroneer/common';
import { Astroneer } from '@astroneer/core';
import { createServer, Server } from 'http';
import { parse } from 'url';

export default async function startServer(): Promise<Server> {
  const port = process.env.PORT || 3000;
  const hostname = process.env.HOST || 'localhost';
  const app = await Astroneer.prepare();
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || '', true);
      await app.handle(req, res, parsedUrl);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
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
