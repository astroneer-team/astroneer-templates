import { drizzle } from '@/database/drizzle';
import { $dogs } from '@/database/schema/dogs.schema';
import { dogValidator } from '@/validators/dog.validator';
import { HttpError, Request, Response } from '@astroneer/core';

export async function GET(_: Request, res: Response) {
  const dogs = await drizzle.select().from($dogs);
  res.json(dogs);
}

export async function POST(req: Request, res: Response) {
  const { name, age, breed } = await req.body<{
    name: string;
    age: number;
    breed: string;
  }>();

  const validation = dogValidator.safeParse({ name, age, breed });

  if (!validation.success) {
    throw new HttpError(400, 'Invalid dog data', validation.error);
  }

  const dog = await drizzle.insert($dogs).values({
    name,
    age,
    breed,
  });

  res.status(201).json(dog);
}
