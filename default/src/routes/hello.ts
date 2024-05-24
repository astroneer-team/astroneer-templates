import { Request, Response } from '@astroneer/core';

export function GET(_: Request, res: Response) {
  res.send('Hello, from Astroneer! 🚀');
}

export async function POST(req: Request, res: Response) {
  const { name } = await req.body<{ name: string }>();
  res.send(`Hello, ${name}! 🚀`);
}
