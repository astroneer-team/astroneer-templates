import { Request, Response } from '@astroneer/core';

export function GET(req: Request, res: Response) {
  res.send('Hello, from Astroneer! 🚀');
}
