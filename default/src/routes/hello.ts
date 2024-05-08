import { Request, Response } from '@astroneer/core';

export function GET(_: Request, res: Response) {
  res.send('Hello, from Astroneer! 🚀');
}
