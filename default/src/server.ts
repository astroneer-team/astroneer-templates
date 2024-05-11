import { Logger } from '@astroneer/common';
import { Astroneer } from '@astroneer/core';
import { createServer } from 'http';
import { parse } from 'url';

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

Astroneer.prepare().then((app) => {
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
});
