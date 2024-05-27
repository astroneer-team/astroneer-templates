import { drizzle } from '@/database/drizzle';
import { $dogs } from '@/database/schema/dogs.schema';
import { dogValidator } from '@/validators/dog.validator';
import { HttpError } from '@astroneer/common';
import { Request, Response, RouteHandler } from '@astroneer/core';

export const GET: RouteHandler = async (_, res) => {
  const dogs = await drizzle.select().from($dogs);
  res.json(dogs);
};

export const POST: RouteHandler = async (req, res) => {
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
};
