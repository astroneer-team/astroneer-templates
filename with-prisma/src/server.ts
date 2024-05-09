import { logRequest } from '@astroneer/common';
import { Astroneer } from '@astroneer/core';
import { createServer } from 'http';
import { parse } from 'url';

export default async function server(
  port: number,
  hostname: string,
  devmode: boolean,
) {
  const app = await Astroneer.prepare();
  return createServer(async (req, res) => {
    if (devmode) logRequest(req, res);

    try {
      const parsedUrl = parse(req.url || '', true);
      await app.handle(req, res, parsedUrl);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
    }
  });
}
