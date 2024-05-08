import { logRequest } from '@astroneer/common';
import { Astroneer } from '@astroneer/core';
import { createServer, Server } from 'http';
import { parse } from 'url';

export default async function server(
  port: number,
  host: string,
  devmode: boolean,
): Promise<Server> {
  const app = new Astroneer();
  const server = createServer(async (req, res) => {
    if (devmode) logRequest(req, res);

    try {
      const parsedUrl = parse(req.url || '', true);
      await app.handle(req, res, parsedUrl);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
    }
  });

  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.log(`> Server listening on http://${host}:${port}`);
  });

  return server;
}
